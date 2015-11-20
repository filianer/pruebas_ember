import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		delete:function(model){
			this.sendAction('delete', model);
		}
	}

});