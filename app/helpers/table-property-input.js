import Ember from 'ember';

/*
	Devuelve input para una tabla con value y placeholder
	params:
		column: columna con title y type de input
		document: documento
*/
export function tablePropertyInput([doc, prop]) {

	// var result = Ember.String.htmlSafe(`<input type="text">`);
	// if ( document ) {
	// 	var val = document.get(column.title) ? document.get(column.title):'';
	// 	result = Ember.String.htmlSafe(`<input type=${column.type} placeholder="undefined" value=${val}>`);
	// }
	
	// return result;
	return doc[prop];
}

export default Ember.Helper.helper(tablePropertyInput);
