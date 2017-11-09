import Ember from 'ember';

const { computed, isNone } = Ember;

export default Ember.Controller.extend({
  /*
   * @string
   */
  currentPais: null,

  paises: computed('model.perfiles', function() {
    return this.get('model.perfiles')
      .mapBy('direccion')
      .uniq();
  }),

  activePerfiles: computed('model.perfiles', 'currentPais', function() {
    if (isNone(this.get('currentPais'))) {
      return this.get('model.perfiles');
    }

    return this
      .get('model.perfiles')
      .filterBy('direccion', this.get('currentPais'));
  }),

  actions: {
    selectPais(newPais) {
      this.set('currentPais', newPais);
    }
  }
});
