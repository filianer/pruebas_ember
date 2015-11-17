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

- pagination:{
	default: 10, 			//valor predeterminado para paginación, si no se pasa por defecto coge 10
	range:[5,10,25,50]		//valor del rango para cambiar paginación, si no se pasa por defecto es 10,25,50
}

- showGlobalFilter: boobleano, true si queremos mostrar el filtro global y false o no se pasa si no queremos mostrarlo

- filteringIgnoreCase: booleano, true si queremos que ingnore mayúsculas o false o no se pasa si no

- actionDel: acción que se llamará para borrar las entradas de la tabla (Opcional, si no se pasa no se pinta el botón de borrado)

- actionNew: acción llamada para crear nuevas entradas en la tabla (Opcional, si no se pasa  no se permite añadir nuevos campos)

*******************EDITAR*******************
- route-edit: nombre de la ruta donde se editarán las entradas (Opcional, si no se pasa no se pinta el botón edit)
	Para editar los campos en el template que tengamos en route-edit podemos llamar al componente table-simple/table-detail
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

	o bien podemos crearnos nuestro propio template
********************************************

*Para que coja los estilos dentro del componente hay que tener instalado: ember install ember-component-css

TODOS:
- Template para cada una de las propiedades
- className para cada una de las propiedades 
- añadir method-edit para editar inline o con modal
