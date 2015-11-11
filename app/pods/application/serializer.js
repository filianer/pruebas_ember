import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',
	serializeId: function(id) {
	  return id.toString();
	},
	// keyForAttribute: function(attr, method) {
	// 	por si queremos transformar los atributos que nos vienen para adaptarlos a nuestro modelo
	// 	return Ember.String.underscore(attr).toUpperCase();
	// }
});
