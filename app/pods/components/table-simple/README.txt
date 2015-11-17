Llamada:
{{table-simple modelo=model properties=properties actionDel="delete" actionNew="new" route-edit="contact.detail"}}

model: datos del modelo para pintar en la tabla

properties:[
	{
		name: 		nombre del campo en el modelo
		title:		nombre del campo para mostrar en la tabla
		type:		tipo de dato (quizás no haga falta cuando se quiten los edit text)
		show:		booleano, false si no queremos mostrar el campo y true o no se manda si queremos mostrarlo
		filter:		booleano, false si no queremos filtrar por ese campo y true o no se manda si queremos filtrar
	}
]

actionDel: acción que se llamará para borrar las entradas de la tabla (Opcional, si no se pasa no se pinta el botón de borrado)

actionNew: acción llamada para crear nuevas entradas en la tabla (Opcional, si no se pasa  no se permite añadir nuevos campos)

*******************EDITAR*******************
route-edit: nombre de la ruta donde se editarán las entradas (Opcional, si no se pasa no se pinta el botón edit)
Para editar los campos en el template que tengamos en route-edit podemos llamar al componente table-simple/table-detail
	{{table-simple/table-detail model=model actionDel="delete" actionUp="update" title="Edición"}}
	- model: modelo para la acción
	- actionDel: Acción para borrar elemento (Opcional, si no se pasa no se mete el botón delete) 
	- actionUp: Acción para actualizar elemento (Opcional, si no se pasa no se pinta el botón save)
	- title: titulo del modal (Opcional, si no se pasa se pone por defecto "Edit")

	habrá que usarlo como un bloque y pasar dentro todos los campos de nuestro modelo, ej:
	{{#table-simple/table-detail model=model actionDel="delete" actionUp="update" title="Edición"}}
		<div>{{input type="text" value=model.firstName placeholder="first name"}}</div>
		<div>{{input type="text" value=model.lastName placeholder="last name"}}</div>
		<div>{{input type="number" value=model.age placeholder="age"}}</div>
	{{/table-simple/table-detail}}

o bien podemos crearnos nuestro propio template
********************************************

*Para que coja los estilos dentro del componente hay que tener instalado: ember install ember-component-css

TODOS:
- Mandar tamaño de paginación por defecto
- Mandar tamaños de posibles paginaciones
- Mandar booleano para mostrar filtro
- Mandar booleano para ignorar mayúsculas en el filtro
- Controlar campo show para no mostrarlos
- Template para cada una de las propiedades
- className para cada una de las propiedades 
- añadir method-edit para editar inline o con modal
- cuando editas en el modal como está bindeado se van cambiando los datos en la tabla también, si se cancela el modal,
los datos se quedan cambiados en la tabla aunque no se hayan guardado y se quedan así hasta que refrescas