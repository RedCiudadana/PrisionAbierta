import Ember from 'ember';

export function isNumeric([value]/*, hash*/) {
  return !isNaN(value);
}

export default Ember.Helper.helper(isNumeric);
