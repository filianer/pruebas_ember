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

	/**
	* Determina si se muestra el filtro de búsqueda
	* @type {boolean}
	*/
	showGlobalFilter: true,
	/**
	* Determina si el filtrado ignora (mayúsculas/minúsculas)
	* @type {boolean}
	*/
	filteringIgnoreCase: false,

	filterString: '',
	datos: A([]),
	/**
	* @type {Ember.Object[]}
	*/
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
		// this.datos.forEach(function(m){
		// 	self.processedColumns[''].addObject(m);
		// });
		
	},

	/*
		Función de filtrado
	*/
	onFilter: observer('filterString', function() {

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
		return A(globalSearch);
	}),

	// filteredContent: computed('filterString', 'data.[]', 'processedColumns.@each.filterString', function () {
	// 	console.log("ENTRA EN FILTRADO");
		
	// }),

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
		}
	}
});
