import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contact', function() {
    this.route('detail',{path: ':id'});
  });
});

export default Router;
