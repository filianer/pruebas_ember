import Ember from 'ember';

/*
	Componente para manejar value en los input
*/
export default Ember.Component.extend({
	tagName:'spam',
	prop: null, // passed in
	model: null,   // passed in
	value: null,    // local

	onValue: Ember.observer('value', function() {
		var model = this.get('model');
		var prop = this.get('prop');
		var value = this.get('value');
		model.set(prop,value);
	})
});