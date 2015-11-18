Llamada:
{{table-simple modelo=model properties=properties actionDel="delete" actionNew="new" route-edit="contact.detail"}}

- model: datos del modelo para pintar en la tabla

- properties:[
	{
		name: 		nombre del campo en el modelo
		title:		nombre del campo para mostrar en la tabla
		type:		tipo de dato (quizás no haga falta cuando se quiten los edit text)
		hidden:		booleano, true si no queremos mostrar el campo y false o no se manda si queremos mostrarlo
		filter:		booleano, false si no queremos filtrar por ese campo y true o no se manda si queremos filtrar
	}
]

- editInline: booleano, true para editar elementos en línea dentro de la table o false o no se pasa para editarlos con modal
- createInline: booleano, true para crear nuevos elementos en línea dentro de la tabla o false o no se pasa para crearlos fuera 

- pagination:{
	default: 10, 			//valor predeterminado para paginación, si no se pasa por defecto coge 10
	range:[5,10,25,50]		//valor del rango para cambiar paginación, si no se pasa por defecto es 10,25,50
}

- initOrder:{ 		//ordenamiento inicial por algún campo, si no se pasa se ordena por id o por el primer campo
	key:"firstName",
	order:"asc" 	//asc o desc
}

- showGlobalFilter: boobleano, true si queremos mostrar el filtro global y false o no se pasa si no queremos mostrarlo

- filteringIgnoreCase: booleano, true si queremos que ingnore mayúsculas o false o no se pasa si no

- actionDel: acción que se llamará para borrar las entradas de la tabla (Opcional, si no se pasa no se pinta el botón de borrado)

- actionNew: acción llamada para crear nuevas entradas en la tabla (Opcional, si no se pasa  no se permite añadir nuevos campos)

*******************EDITAR*******************
- route-edit: nombre de la ruta donde se editarán las entradas (Opcional, si no se pasa no se pinta el botón edit)
	* Para editar los campos en el template que tengamos en route-edit podemos llamar al componente table-simple/table-detail
		{{table-simple/table-detail model=model actionDel="delete" actionUp="update" title="Edición" transition="transition"}}
		- model: modelo para la acción
		- actionDel: Acción para borrar elemento (Opcional, si no se pasa no se mete el botón delete) 
		- actionUp: Acción para actualizar elemento (Opcional, si no se pasa no se pinta el botón save)
		- title: titulo del modal (Opcional, si no se pasa se pone por defecto "Edit")
		- transition: si queremos que cuando se cancele el model vuelva a la ruta del padre deberemos definir en el route una acción para que vaya a la ruta que queramos ej:
			transition:function(){
				this.transitionTo('contact');
			}

		habrá que usarlo como un bloque y pasar dentro todos los campos de nuestro modelo, ej:
		{{#table-simple/table-detail model=model actionDel="delete" actionUp="update" title="Edición"}}
			<div>{{input type="text" value=model.firstName placeholder="first name"}}</div>
			<div>{{input type="text" value=model.lastName placeholder="last name"}}</div>
			<div>{{input type="number" value=model.age placeholder="age"}}</div>
		{{/table-simple/table-detail}}

		*Será obligatorio pasar la propiedad id para poder editar

	* IMPORTANTE: si usamos editInline = true habrá que usar el componente table-simple/table-detail-inline
		{{#table-simple/table-detail-inline model=model actionUp="update" transition="transition"}}
			<td class="text-center">{{input type="text" value=model.firstName placeholder="first name"}}</td>
			<td class="text-center">{{input type="text" value=model.lastName placeholder="last name"}}</td>
			<td class="text-center">{{input type="number" value=model.age placeholder="age"}}</td>
		{{/table-simple/table-detail-inline}}

	* o bien podemos crearnos nuestro propio template
********************************************

*Para que coja los estilos dentro del componente hay que tener instalado: ember install ember-component-css

TODOS:
- Template para cada una de las propiedades
- className para cada una de las propiedades 
- filtrar por alguna determinada columna
- mostrar u ocultar columnas
- si añadimos nueva entrada se añade según la ordenación y es posible que no nos demos cuenta de que se ha insertado
averiguar como solucionar esto, podríamos irnos a la página donde se ha insertado y resaltarlo por ej.
- Añadir soporte para pasar mensajes para mostrar advertencias según quiera el usuario
- Añadir validate para cada propiedad

