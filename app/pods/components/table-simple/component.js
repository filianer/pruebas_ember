import Ember from 'ember';

const {
	on,
	A,
	computed,
	getProperties,
	observer,
	get,
	set,
} = Ember;

const O = Ember.Object;

export default Ember.Component.extend({

	// Determina si se muestra el filtro de búsqueda
	showGlobalFilter: true,
	// Determina si se muestra el footer de la tabla (paginación)
	showTableFooter: true,
	// Determina si se muestra el header de la tabla
	showTableHeader:true,
	// Determina si se muestra botón para añadir nuevo elemento
	showActionNew:true,
	// Determina si el filtrado ignora (mayúsculas/minúsculas)
	filteringIgnoreCase: false,
	// Tamaño de paginación por defecto
	pageSize: 10, 
	// Página actual para paginación
  	currentPageNumber: 1,
  	// Posibles tamaños para paginación
	pageSizeValues: A([10, 25, 50]),
	// Cadena para filtrar
	filterString: '',
	// Array donde se guardarán nuestros objetos
	datos: A([]),
	// Propiedades de nuestra tabla
	properties: [],
	// Propiedades para la ordenación de las filas
	sortProps: [],
	//variable para almacenar la fila que se está editando
	rowEditNow: [],
	//clase por defecto para mostrar la fila de creación
	showCreateRow:"hidden",
	//clase por defecto para el botón de nuevo elemento
	newElementDisabled:false,
	// Booleano que indica si se muestra la columan de acciones
	actionsColumn: true,
	//indice del select de tamaño de paginación seleccionado
	selectedValue: 1,

	setup: on('init', function() {
		this._setupConfig();
	}),

	//Establece la configuración inicial
	_setupConfig () {
		//con this.get('modelo') tenemos un RecordArray
		//RecordArray tiene la propiedad type que nos devuelve un DS.Model con el que podemos sacar las propiedades
		//var modelo = this.get('modelo').type;
		//var self = this;
		// modelo.eachAttribute(function(name, meta) {
		// 	//según el tipo de dato establecemos type para los input de la tabla
		// 	var type = (meta.type == 'number') ? 'number':'text';
		// 	let c = O.create({'title':name, 'type':type});
		// 	self.processedColumns.addObject(c);
		// });
		this.properties = this.get('properties'); //propiedades de las columnas
		this.datos = this.get('modelo');
		var existsId = false; //para pintar ordenamiento por defecto
		var orderKey = null; //ordenamiento por esta key, si no viene ordenaremos por el primer campo
		var order = "desc";

		//si no viene la acción de borrado ni route-edit ponemos actionsColumn a false para no pintar la columna de acciones
		if (!this.get('actionDel') && !this.get('route-edit') && !this.get('createInline') ) {
			set(this, 'actionsColumn', false);
		}

		//recorremos las propiedades para ponerles el atributo de visible, si no viene o si viene como true serán visibles
		this.properties.forEach(function(entry){
			var isVisible = ( typeof(entry['hidden']) === 'undefined' || !entry['hidden'] ) ? true : false;
			set(entry, 'isVisible', isVisible);
			if ( !existsId ) {
				if ( entry['name'] == "id" ) {
					orderKey = "id";
					existsId = true;
				} else if ( orderKey == null ) {
					orderKey = entry['name'];
				}
			}
		});

		//filtro para ignorar mayúsculas
		if ( this.get('filteringIgnoreCase') ) {
			set(this, 'filteringIgnoreCase', this.get('filteringIgnoreCase'));
		}

		if ( this.get('showActionNew') ) {
			set(this, 'showActionNew', this.get('showActionNew'));
		}

		if ( this.get('showTableFooter') ) {
			set(this, 'showTableFooter', this.get('showTableFooter'));
		}

		if ( this.get('showTableHeader') ) {
			set(this, 'showTableHeader', this.get('showTableHeader'));
		}

		//comprobamos si nos pasan paginación
		if ( this.get('pagination') ) {
			if ( this.get('pagination.default') ) {
				set(this,'pageSize', this.get('pagination.default'));
			}
			if ( this.get('pagination.range') ) {
				//hay que tener cuidado de que el range contenga al default, si no lo contiene se lo añadimos
				var range = this.get('pagination.range');
				var pSize = this.get('pageSize');
				if ( range.indexOf(pSize) == -1 ) {
					range.push(pSize);
					range.sort(function(a, b){return a-b});//ordenamos array
				}
				set(this,'pageSizeValues', A(range));
			}
			//Establecemos el select con el tamaño de la página actual
			set(this,'selectedValue',pSize);
		}

		//Comprobamos si nos pasan ordenamiento inicial y si no ordenamos por orderKey en orden descenente
		if ( this.get('initOrder') ) {
			var initOrder = this.get('initOrder');
			if ( initOrder['key'] ) {
				orderKey = initOrder['key'];
			}
			if ( initOrder['order'] ) {
				order = initOrder['order'];
			}
		}
		this.set('sortProps', [orderKey + ':' + order]);
		
	},

	//Obsevador para cuando se escribe en el filtro
	changedFilter: observer('filterString', function(){
		this.get('filteredContent')
	}),

	//Función de filtrado
	filteredContent: computed('filterString', 'datos.[]', function() {

		var filteringIgnoreCase = this.filteringIgnoreCase;
		var data = this.datos;
		var properties = this.properties; //propiedades de las columnas
		var filterString = get(this, 'filterString');

		if (!data) {
			return A([]);
		}

		// global search, filtra por cualquier campo que tenga declarado filter=true o no tenga filter
		var globalSearch = data.filter(function (row) {
			var show = properties.any(c => {
				//comprobamos si la propiedad es filtrable y si está visible
				var filter = get(c, 'filter');
				var isVisible = get(c, 'isVisible');
				if( (typeof(filter) === 'undefined' || filter) && (typeof(isVisible) === 'undefined' || isVisible) ) {
					const propertyName = get(c, 'name');
					if (propertyName) {
						var cellValue = '' + get(row, propertyName);
						if (filteringIgnoreCase) {
							cellValue = cellValue.toLowerCase();
							filterString = filterString.toLowerCase();
						}
						return -1 !== cellValue.indexOf(filterString);
					}
				}
				return false;
			});
			var visibility = show ? 'show_row':'hidden';
			set(row,'visibility',visibility);
			return show;
		});
		return A(globalSearch);
	}),

	//ordenación de filas
	sortedContent: Ember.computed.sort('filteredContent.[]', 'sortProps'),

	//Contenido visible según filtrado, este es el contenido que se mostrará en nuestra tabla
	visibleContent: computed('sortedContent.[]', 'pageSize', 'currentPageNumber', function () {
		var sortedContent = this.get('sortedContent');
		var pageSize = this.get('pageSize');
		var currentPageNumber = this.get('currentPageNumber');
		
		//comprobamos si nos quedan datos en la página o nos camibamos de página
		//por ej si el pageSize=10 y tenemos 11 elementos y estamos en la pag2 y borramos, deberíamos ir a la pag1
		if ( sortedContent.length <= pageSize ) {
			currentPageNumber = currentPageNumber == 1 ? 1 : currentPageNumber - 1;
			set(this, 'currentPageNumber', currentPageNumber);
		}
		
		const startIndex = pageSize * (currentPageNumber - 1);
		if (get(sortedContent, 'length') < pageSize) {
			return sortedContent;
		}
		return A(sortedContent.slice(startIndex, startIndex + pageSize));
	}),

	//número de páginas
	pagesCount: computed('filteredContent.[]', 'pageSize', function () {
		const pagesCount = get(this, 'filteredContent.length') / get(this, 'pageSize');
		return (0 === pagesCount % 1) ? pagesCount : (Math.floor(pagesCount) + 1);
	}),

	//botones "Back" y "First" activados
	gotoBackEnabled: computed.gt('currentPageNumber', 1),

	//botones "Next" y "Last" activados, también vale para saber si es la última página
	gotoForwardEnabled: computed('currentPageNumber', 'pagesCount', function () {
		return get(this, 'currentPageNumber') < get(this, 'pagesCount');
	}),

	// Resumen paginación tabla
	summary: computed('pageSize', 'currentPageNumber', 'filteredContent', function () {
		const {
			currentPageNumber,
			pageSize
		} = getProperties(this, 'currentPageNumber', 'pageSize');
		const length = get(this, 'filteredContent.length');
		const isLastPage = !get(this, 'gotoForwardEnabled');
		const firstIndex = 0 === length ? 0 : pageSize * (currentPageNumber - 1) + 1;
		const lastIndex = isLastPage ? length : currentPageNumber * pageSize;
		return "Mostrando "+firstIndex+" - "+lastIndex+" de "+length;
	}),

	//paginación con números
	visiblePageNumbers: computed('filteredContent', 'pagesCount', 'currentPageNumber', function () {
		const {
			pagesCount,
			currentPageNumber
		} = getProperties(this, 'pagesCount', 'currentPageNumber');
		const notLinkLabel = '...';
		var groups = []; // array of 8 numbers
		var labels = A([]);
		groups[0] = 1;
		groups[1] = Math.min(1, pagesCount);
		groups[6] = Math.max(1, pagesCount);
		groups[7] = pagesCount;
		groups[3] = Math.max(groups[1] + 1, currentPageNumber - 1);
		groups[4] = Math.min(groups[6] - 1, currentPageNumber + 1);
		groups[2] = Math.floor((groups[1] + groups[3]) / 2);
		groups[5] = Math.floor((groups[4] + groups[6]) / 2);

		for (let n = groups[0]; n <= groups[1]; n++) {
			labels[n] = n;
		}
		const userGroup2 = groups[4] >= groups[3] && ((groups[3] - groups[1]) > 1);
		if (userGroup2) {
			labels[groups[2]] = notLinkLabel;
		}
		for (let i = groups[3]; i <= groups[4]; i++) {
			labels[i] = i;
		}
		const userGroup5 = groups[4] >= groups[3] && ((groups[6] - groups[4]) > 1);
		if (userGroup5) {
			labels[groups[5]] = notLinkLabel;
		}
		for (let i = groups[6]; i <= groups[7]; i++) {
			labels[i] = i;
		}
		return A(labels.compact().map(label => { return {
			label: label,
			isLink: label !== notLinkLabel,
			isActive: label === currentPageNumber};
		}));
	}),

	handleVisibility(hidden){
		if ( hidden ) {
			set(this,'actionsColumn', false);
			set(this,'showTableFooter', false);
			set(this,'showGlobalFilter', false);
			set(this, 'showActionNew', false);
		} else {
			set(this,'actionsColumn', true);
			set(this,'showTableFooter', true);
			set(this,'showGlobalFilter', true);
			set(this, 'showActionNew', true);
		}
	},

	actions: {
		delete:function(modelo){
			if (confirm('¿Seguro que deseas borrar?')) {
		      this.sendAction('actionDel', modelo);
		    }
		},
		new:function(){
			//creamos nuevo objeto
			var newObject = {};
			var okValue = false;
			this.properties.forEach(function(entry){
				if ( entry.value && (entry.value).length > 0){
					okValue = true;
				}
				newObject[entry.name] = entry.value;
				//reseteamos propiedad
				Ember.set(entry,'value','');
			});

			//comprobamos que el elemento no esté vacío
			//TODO: se podría mandar un validate para cada propiedad
			if ( okValue || confirm('Elemento vacío, ¿seguro que deseas guardar?') ) {
				this.sendAction('actionNew', newObject);
				if ( this.get('createInline') ) {
					set(this, 'showCreateRow', 'hidden');
					set(this, 'newElementDisabled', false);
				}
			}
		},
	    
	    //va a una página específica
	    gotoCustomPage (pageNumber) { 
	      set(this, 'currentPageNumber', pageNumber);
	    },

	    //cambia el tamaño de la paginación
	    changePageSize () { 
	      const selectedIndex = this.$('.changePageSize')[0].selectedIndex;
	      const pageSizeValues = get(this, 'pageSizeValues');
	      const selectedValue = pageSizeValues[selectedIndex];
	      set(this, 'pageSize', selectedValue);
	    },

	    //ordenación de las filas
		sort(direction, key) {
			this.set('sortProps', [key + ':' + direction]);
		},

		//ir a la primera página
		gotoFirst () {
			if (!get(this, 'gotoBackEnabled')) {
				return;
			}
			set(this, 'currentPageNumber', 1);
	    },

	    //ir a la página anterior
		gotoPrev () {
			if (!get(this, 'gotoBackEnabled')) {
				return;
			}
			if (get(this, 'currentPageNumber') > 1) {
				this.decrementProperty('currentPageNumber');
			}
		},

		//ir a la página siguiente
		gotoNext () {
			if (!get(this, 'gotoForwardEnabled')) {
				return;
			}
			var currentPageNumber = get(this, 'currentPageNumber');
			var pageSize = get(this, 'pageSize');
			var arrangedContentLength = get(this, 'filteredContent.length');
			if (arrangedContentLength > pageSize * (currentPageNumber - 1)) {
				this.incrementProperty('currentPageNumber');
			}
		},

		//ir a la última página
		gotoLast () {
			if (!get(this, 'gotoForwardEnabled')) {
				return;
			}
			var pageSize = get(this, 'pageSize');
			var arrangedContentLength = get(this, 'filteredContent.length');
			var pageNumber = arrangedContentLength / pageSize;
			pageNumber = (0 === pageNumber % 1) ? pageNumber : (Math.floor(pageNumber) + 1);
			set(this, 'currentPageNumber', pageNumber);
		},

		//acción disparada cuando se hace click en el botón New Element
		showCreate(){
			//resaltamos fila con un color
			set(this, 'showCreateRow', 'show_row color-new-elem');
			//deshabilitamos botón NewElement
			set(this, 'newElementDisabled', true);
			//ponemos el foco en el primer input de inputNewRow
			this.$('.inputNewRow')[0].autofocus = true;
		},

		//acción disparada cuando se hace click en el botón de cancelar nuevo elemento
		cancelNew(){
			//ocultamos fila de nuevo elemento
			set(this, 'showCreateRow', 'hidden');
			//restablecemos el botón de nuevo elemento
			set(this, 'newElementDisabled', false);
		},

		//manejador para la edición inline
		editInline(doc){ 
			//reseteamos las demás filas para que solo 1 se pueda estar editando a la vez
			this.rowEditNow.forEach(function(row){
				set(row, 'visibilityEdit', false);
				set(row,'visibility', 'show_row');
			});
			set(this.rowEditNow,'length',0); //limpiamos array
		
			set(doc, 'visibilityEdit', true); //mostramos edición inline
			set(doc, 'visibility', 'hidden'); //ocultamos row normal
			this.rowEditNow.push(doc); //añadimos a filas en edición
		},

		//cambia la propiedad visible de las columnas
		toggleHidden (prop) {
			var isVisible = true;
			if ( typeof(prop['isVisible']) !== 'undefined' ) {
				isVisible = prop['isVisible'];
			}
			set(prop,'isVisible', isVisible?false:true);
			//comprobamos si queda alguna columna como visible, si no ocultamos acciones
			var visible = false;
			visible = this.properties.some(function(entry){
				if ( entry['isVisible'] ) {
					return true;
				}
			});
			visible?this.handleVisibility(false):this.handleVisibility(true);
		},

		//pone todas las columnas como visibles, si están marcadas como mayBeHidden
		showAllColumns(){
			this.properties.forEach(function(entry){
				if ( entry['mayBeHidden'] ) {
					set(entry,'isVisible',true);
				}
			});
			this.handleVisibility(false);
		},

		//pone todas las columnas como no visibles
		hideAllColumns(){
			this.properties.forEach(function(entry){
				set(entry,'isVisible',false);
			});
			this.handleVisibility(true);
		}
	}
});
