import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    if (confirm(this.get('text'))) {
      //trigger action on parent component
      this.get('onConfirm')();
    }
  }
});
