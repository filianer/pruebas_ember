import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		updateContact:function(model){
			model.save();
		}
	}
});
