import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
		newContact:function(){
			var newC = {};
			if ( this.get('firstName') ) {
				newC.firstName = this.get('firstName');
			}
			if ( this.get('lastName') ) {
				newC.lastName = this.get('lastName');
			}
			if ( this.get('age') ) {
				newC.age = this.get('age');
			}

			console.log("NEW CONTACT: "+JSON.stringify(newC));
			var contact = this.store.createRecord('contact',newC);
			contact.save();

			//reseteamos campos
			this.set('firstName', '');
			this.set('lastName', '');
			this.set('age', '');
		}
	},
	properties:[
		{
			name:"id",
			title:"ID",
			type:"text",
			hidden:true,
			filter:false,
			mayBeHidden:true
		},
		{
			name:"firstName",
			title:"First Name",
			type:"text",
			mayBeHidden:true,
			className:'table-simple-cell'
		},
		{
			name:"lastName",
			title:"Last Name",
			type:"text",
			mayBeHidden:true
		},
		{
			name:"age",
			title:"Age",
			type:"number",
			filter:false, //para que no filtre por edad (por ejemplo)
			mayBeHidden:true
		}
	],
	pagination:{
		default:5,
		range:[10,25,50]
	},
	initOrder:{
		key:"id",
		order:"desc"
	},
	customMessages:{
		'new-element':'Nuevo Elemento',
		'searchLabel': 'Buscar',
		'searchLabelColumn': 'Filtrar',
		'columns-title': 'Columnas',
		'columns-showAll': 'Mostrar Todo',
		'columns-hideAll': 'Ocultar Todo',
		'columns-restoreDefaults': 'Restablecer',
		'button-save':'Guardar',
		'button-cancel':'Cancelar',
		'tableSummary': 'Mostrando %@ - %@ de %@',
		'allColumnsAreHidden': 'Todas las columnas están ocultas. Usa el botón <strong>Columnas</strong> para mostrar algunas',
		'noDataToShow': 'No hay resultados',
		'confirmDelete': '¿Seguro que desas borrar el elemento?',
		'confirmEmptySave': 'Elemento vacío, ¿seguro que deseas guardarlo?',
		'button-filter-phone': 'Filtros',
	}
	
});
