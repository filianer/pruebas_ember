import Ember from 'ember';

/*
	Componente para manejar value en los input
*/
export default Ember.Component.extend({
	tagName:'spam',
	prop: null, // passed in
	obj: null,   // passed in
	value: null,    // local

	onValue: function() {
		var obj = this.get('obj');
		var prop = this.get('prop');
		var value = this.get('value');
		Ember.set(obj, prop, value);
	}.observes('value'),
});
