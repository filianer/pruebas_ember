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
	// Determina si el filtrado ignora (mayúsculas/minúsculas)
	filteringIgnoreCase: false,
	// Tamaño de paginación por defecto
	pageSize: 10,
	// Página actual para paginación
  	currentPageNumber: 1,

	dataLength:0,

	pageSizeValues: A([10, 25, 50]),

	filterString: '',
	datos: A([]),
	processedColumns: A([]),
	properties: [],

	setup: on('init', function() {
		this._setupColumns();
	}),

	_setupColumns () {
		//con this.get('modelo') tenemos un RecordArray
		//RecordArray tiene la propiedad type que nos devuelve un DS.Model con el que podemos sacar las propiedades
		//var modelo = this.get('modelo').type;
		this.properties = this.get('properties'); //propiedades de las columnas
		var self = this;
		// modelo.eachAttribute(function(name, meta) {
		// 	//según el tipo de dato establecemos type para los input de la tabla
		// 	var type = (meta.type == 'number') ? 'number':'text';
		// 	let c = O.create({'title':name, 'type':type});
		// 	self.processedColumns.addObject(c);
		// });
		this.datos = this.get('modelo');
	},

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
				//comprobamos si la propiedad es filtrable
				var filter = get(c, 'filter');
				if( filter || typeof(filter) === 'undefined' ) {
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
			var visivility = show ? 'show_row':'hidden';
			set(row,'visivility',visivility);
			return show;
		});

		console.log("globalSearch: "+JSON.stringify(globalSearch));
		// set(this, 'dataLength', globalSearch.length);
		return A(globalSearch);
	}),

	//Contenido visible según filtrado
	visibleContent: computed('filteredContent.[]', 'pageSize', 'currentPageNumber', function () {
		var filteredContent = this.get('filteredContent');
		var pageSize = this.get('pageSize');
		var currentPageNumber = this.get('currentPageNumber');
		const startIndex = pageSize * (currentPageNumber - 1);
		if (get(filteredContent, 'length') < pageSize) {
			return filteredContent;
		}
		return A(filteredContent.slice(startIndex, startIndex + pageSize));
	}),

	//número de páginas
	pagesCount: computed('filteredContent.[]', 'pageSize', function () {
		const pagesCount = get(this, 'filteredContent.length') / get(this, 'pageSize');
		return (0 === pagesCount % 1) ? pagesCount : (Math.floor(pagesCount) + 1);
	}),

	//botones "Back" y "First" activados
	gotoBackEnabled: computed.gt('currentPageNumber', 1),
	//botones "Next" y "Last" activados
	gotoForwardEnabled: computed('currentPageNumber', 'pagesCount', function () {
		return get(this, 'currentPageNumber') < get(this, 'pagesCount');
	}),
	/*
		Resumen paginación tabla
	*/
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

	actions: {
		update:function(object){
			console.log("Update table: "+JSON.stringify(object));
			//this.sendAction('actionUp', modelo);
		},
		delete:function(modelo){
			console.log("MODELO EN TABLE: "+JSON.stringify(modelo));
			if (confirm('¿Seguro que deseas borrar?')) {
		      this.sendAction('actionDel', modelo);
		    }
		},
		new:function(){
			//creamos nuevo objeto
			var newObject = {};
			this.properties.forEach(function(entry){
				newObject[entry.name] = entry.value;
				Ember.set(entry,'value','');
			});
			this.sendAction('actionNew', newObject);
		},
	    
	    gotoCustomPage (pageNumber) { //va a una página específica
	      set(this, 'currentPageNumber', pageNumber);
	    },

	    changePageSize () { //cambia el tamaño de la paginación
	      const selectedIndex = this.$('.changePageSize')[0].selectedIndex;
	      const pageSizeValues = get(this, 'pageSizeValues');
	      const selectedValue = pageSizeValues[selectedIndex];
	      set(this, 'pageSize', selectedValue);
	    },
	}
});
