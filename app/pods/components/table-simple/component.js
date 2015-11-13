import Ember from 'ember';

const {
	on,
	A,
} = Ember;

const O = Ember.Object;

export default Ember.Component.extend({

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
		var modelo = this.get('modelo').type;
		this.properties = this.get('properties'); //propiedades de las columnas
		var self = this;
		modelo.eachAttribute(function(name, meta) {
			//según el tipo de dato establecemos type para los input de la tabla
			var type = (meta.type == 'number') ? 'number':'text';
			let c = O.create({'title':name, 'type':type});
			self.processedColumns.addObject(c);
		});

		console.log("PROPIEDADES: "+JSON.stringify(this.properties));
	},

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
