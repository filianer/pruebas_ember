import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		delete:function(model){
			console.log("DELETE DE COMPONENT BUTTON-DELETE model: "+JSON.stringify(model));
			this.sendAction('delete', model);
		}
	}

});