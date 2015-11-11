import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	namespace:'api',
	host:'http://a2s.a2system.net:4500'
});
