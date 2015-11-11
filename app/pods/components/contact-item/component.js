import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		deleteContact:function(model){
			this.sendAction('actionDel', model);
		}
	}
});
