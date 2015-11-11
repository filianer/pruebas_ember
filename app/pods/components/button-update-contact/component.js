import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		updateContact:function(contact){
			this.sendAction('actionUp', contact);
		}
	}
});
