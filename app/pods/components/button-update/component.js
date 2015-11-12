import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		update:function(model){
			model.save();
		}
	}
});
