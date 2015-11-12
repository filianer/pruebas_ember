import Ember from 'ember';

export function inputHelper(model, attr) {
    return Ember.get(model, attr);
}

export default Ember.Helper.helper(inputHelper);
