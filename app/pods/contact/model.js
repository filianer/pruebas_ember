import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  age: DS.attr('number'),
  picture: DS.attr('string'),
  video_src: DS.attr('string'),
  video_description: DS.attr('string'),
  fullName: Ember.computed('firstName', 'lastName', function(){
  	var full = null;
  	if ( this.get('firstName') ) {
  		full = this.get('firstName') ;
  		if ( this.get('lastName') ) {
	  		full += ' ' + this.get('lastName');
	  	}
  	}
  	return full;
  })
});
