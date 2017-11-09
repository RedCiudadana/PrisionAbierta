import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  paises: computed('model.perfiles', function() {
    return this.get('model.perfiles')
      .mapBy('direccion')
      .uniq();
  }),

  actions: {
    selectPais() {
      console.log('done');
    }
  }
});
