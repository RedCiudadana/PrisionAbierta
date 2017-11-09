import Ember from 'ember';

export function getHtmlSafe([object, propertyName, ...rest]) {
  if (Ember.isNone(object)) {
    return '';
  }

  let frenteAFrente = Ember.get(object, 'frenteAFrente');

  if (Ember.isNone(frenteAFrente)) {
    return '';
  }

  return Ember.String.htmlSafe(Ember.get(frenteAFrente, propertyName));
}

export default Ember.Helper.helper(getHtmlSafe);
