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

	setup: on('init', function() {
		this._setupColumns();
	}),

	_setupColumns () {
		//con this.get('modelo') tenemos un RecordArray
		//RecordArray tiene la propiedad type que nos devuelve un DS.Model con el que podemos sacar las propiedades
		var modelo = this.get('modelo').type;
		var self = this;
		modelo.eachAttribute(function(name, meta) {
			//según el tipo de dato establecemos type para los input de la tabla
			var type = (meta.type == 'number') ? 'number':'text';
			let c = O.create({'title':name, 'type':type});
			self.processedColumns.addObject(c);
		});
	}
});
