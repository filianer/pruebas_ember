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
			
			// var newC = {};
			// if ( model.get('firstName') ) {
			// 	newC.firstName = model.get('firstName');
			// }
			// if ( model.get('lastName') ) {
			// 	newC.lastName = model.get('lastName');
			// }
			// if ( model.get('age') ) {
			// 	newC.age = model.get('age');
			// }

			console.log("NEW CONTACT: "+JSON.stringify(newObject));
			var contact = this.store.createRecord('contact',newObject);
			contact.save();

			//reseteamos campos
			// model.set('firstName', '');
			// model.set('lastName', '');
			// model.set('age', '');
		},
		transition:function(){
			this.transitionTo('contact');
		}
	}
});


