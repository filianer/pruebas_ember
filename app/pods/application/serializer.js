import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',
	serializeId: function(id) {
	  return id.toString();
	},
	serializeIntoHash: function(data, type, record, options) {
		var root = Ember.String.decamelize(type.modelName);
		var serData = this.serialize(record, options);
		$.each(serData, function(key, value){
			if ( Ember.isEmpty(value) ) {
				delete serData[key];
			}
		});
		data[root] = serData;
	}
});
