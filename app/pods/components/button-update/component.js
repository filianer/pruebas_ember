import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		update:function(modelo){
			this.sendAction('update', modelo);
		}
	}
});