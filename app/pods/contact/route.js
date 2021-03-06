import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		var store = this.store;
		return new Ember.RSVP.Promise(function(resolve, reject) { //para simular un spinner de carga
			var result = store.findAll('contact');
			setTimeout(function() {
		      resolve(result);
		    }, 500);
		});
		
		//return this.store.findAll('contact');
	},
	actions:{
		/*
			En estas acciones entra desde el detalle, el detalle al no tener declaradas estas acciones busca en la ruta de los padres
		*/
		// updateContact:function(model){
		// 	model.save();
		// 	this.transitionTo('contact');
		// },
		// deleteContact:function(model){
		// 	model.deleteRecord();
		// 	model.save();
		// 	this.transitionTo('contact');
		// }
	}   
});
