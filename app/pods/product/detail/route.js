import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		Ember.debug("model Routing "+JSON.stringify(params));
		//Si el id está vacío entobces se inserta
		if (!Ember.isEmpty(params.id)){
			return this.modelFor('product').findBy('id', params.id);
		} else {
			console.log("NO HAY ID");
		}
	}
});
