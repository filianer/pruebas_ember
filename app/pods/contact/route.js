import Ember from 'ember';


export default Ember.Route.extend({
	model: function() {
		var store = this.store;
		return new Ember.RSVP.Promise(function(resolve, reject) { //para simular un spinner de carga
			var result = store.findAll('contact');
			resolve(result);
		});
	},
	actions:{
		/*
			En estas acciones entra desde el detalle, el detalle al no tener declaradas estas acciones busca en la ruta de los padres
		*/
		update:function(model){
			model.save();
			this.transitionTo('contact');
		},
		delete:function(model){
			model.deleteRecord();
			model.save();
			this.transitionTo('contact');
		},
		new:function(newObject){
			var contact = this.store.createRecord('contact',newObject);
			contact.save();
		},
		transition:function(){
			this.transitionTo('contact');
		}
	}
});


