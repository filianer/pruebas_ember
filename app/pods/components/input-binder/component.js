import Ember from 'ember';

/*
	Componente para manejar value en los input
*/
export default Ember.Component.extend({
	tagName:'spam',
	prop: null, // passed in
	model: null,   // passed in
	value: null,    // local

	// onValue: function() {
	// 	var model = this.get('model');
	// 	var prop = this.get('prop');
	// 	var value = this.get('value');
	// 	Ember.set(model, prop, value);
	// }.observes('value'),
	onValue: Ember.observer('value', function() {
		var model = this.get('model');
		var prop = this.get('prop');
		var value = this.get('value');
		Ember.set(model, prop, value);
	})
});
