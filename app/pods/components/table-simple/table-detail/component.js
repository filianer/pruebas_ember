import Ember from 'ember';

export default Ember.Component.extend({

	setup: Ember.on('init', function() {
		console.log("ENTRA EN INIT");
		// $('#modalDetail').modal().on('hide.bs.modal', function (e) {
		// 	console.log("MODAL OCULTADO");
		// });
	
	}),

	actions: {
		update:function(object){
			console.log("Update table: "+JSON.stringify(object));
			this.sendAction('actionUp', object);
			$('#modalDetail').modal('hide');
		},
		delete:function(modelo){
			console.log("MODELO EN TABLE: "+JSON.stringify(modelo));
			if (confirm('¿Seguro que deseas borrar?')) {
		      this.sendAction('actionDel', modelo);
		      $('#modalDetail').modal('hide');
		    }
		}, 
		reset:function(){
			this.get('model').rollbackAttributes();
		}
	}
});