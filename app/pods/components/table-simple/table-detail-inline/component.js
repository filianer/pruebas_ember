import Ember from 'ember';

export default Ember.Component.extend({
	tagName:'',
	actions: {
		update:function(doc){
			this.sendAction('actionUp', doc);
			Ember.set(doc,'visivilityEdit', 'display: hidden');
			Ember.set(doc,'visivility', 'table-row !important');
		},
		reset:function(doc){
			//volvemos a dejar los datos como estaban por si hemos cambiado algo pero no le dimos a save
			this.get('model').rollbackAttributes();
			//para que vuelva a la ruta del padre
			if ( this.get('transition') ) {
				this.sendAction(this.get('transition'));
			}
			//ocultamos fila de edición
			Ember.set(doc,'visivilityEdit', false);
			//mostramos fila normal
			Ember.set(doc,'visivility', 'show_row');
		}
	}
});