import Ember from 'ember';

/*
	Devuelve input para una tabla con value y placeholder
	params:
		column: columna con title y type de input
		document: documento
*/
export function tablePropertyInput([column, document]) {

	var result = Ember.String.htmlSafe(`<input type="text">`);
	if ( document ) {
		var val = document.get(column.title) ? document.get(column.title):'';
		result = Ember.String.htmlSafe(`<input type=${column.type} placeholder="undefined" value=${val}>`);
	} else if (column) {
		result = Ember.String.htmlSafe(`<input type=${column.type} placeholder=${column.title} value=${column.title}>`);
	}
	
	return result;
}

export default Ember.Helper.helper(tablePropertyInput);
