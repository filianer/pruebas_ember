import Ember from 'ember';

export default Ember.Component.extend({
	click: function(){
		var contact = this.get('contact');
		this.sendAction('actionUp', contact);
	}
});
