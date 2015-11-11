import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		deleteContact:function(model){
			model.deleteRecord();
			model.save();
		}
	}
	
});
