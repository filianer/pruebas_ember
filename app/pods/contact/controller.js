import Ember from 'ember';

export default Ember.Controller.extend({
	
	properties:[
		{
			name:"id",
			title:"ID",
			type:"text",
			hidden:true,
			filterColumn:true,
			filter:false,
			mayBeHidden:true,
			orderColumn:true,
		},
		{
			name:"picture",
			title:"Picture",
			type:"text",
			mayBeHidden:true,
			template:'components/img-table',
		},
		{
			name:"firstName",
			title:"First Name",
			type:"text",
			mayBeHidden:true,
			filterColumn:true,
			className:'table-simple-cell',
			orderColumn:true
		},
		{
			name:"lastName",
			title:"Last Name",
			type:"text",
			filterColumn:true,
			mayBeHidden:true,
			orderColumn:true
		},
		{
			name:"age",
			title:"Age",
			type:"number",
			filterColumn:true,
			filter:false, //para que no filtre por edad (por ejemplo)
			mayBeHidden:true,
			orderColumn:true
		},
		{
			name:"video_src",
			title:"Video",
			type:"text",
			mayBeHidden:true,
			template:'components/video-table'
		},
		{
			name:"video_description",
			title:"Video Description",
			type:"text",
			hidden:true
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
		'tableSummary': 'Mostrando %@ - %@ de %@',
		'allColumnsAreHidden': 'Todas las columnas están ocultas. Usa el botón <strong>Columnas</strong> para mostrar algunas',
		'noDataToShow': 'No hay resultados',
		'confirmDelete': '¿Seguro que desas borrar el elemento?',
		'confirmEmptySave': 'Elemento vacío, ¿seguro que deseas guardarlo?',
		'button-filter-phone': 'Filtros',
	}
	
});
