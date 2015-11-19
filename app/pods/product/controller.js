import Ember from 'ember';

export default Ember.Controller.extend({

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
			name:"name",
			title:"Name",
			type:"text",
			mayBeHidden:true,
		},
		{
			name:"price",
			title:"Price",
			type:"number",
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
	}
	
});
