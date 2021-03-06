import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
		newContact:function(){
			var newC = {};
			if ( this.get('firstName') ) {
				newC.firstName = this.get('firstName');
			}
			if ( this.get('lastName') ) {
				newC.lastName = this.get('lastName');
			}
			if ( this.get('age') ) {
				newC.age = this.get('age');
			}

			console.log("NEW CONTACT: "+JSON.stringify(newC));
			var contact = this.store.createRecord('contact',newC);
			contact.save();

			//reseteamos campos
			this.set('firstName', '');
			this.set('lastName', '');
			this.set('age', '');
		}
	}
});
