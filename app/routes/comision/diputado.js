import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const diputado = this.store.peekRecord('diputado-comision', params.id);

    return Ember.RSVP.hash({
      diputado
    });
  },

  afterModel(model) {
    if (!Ember.isNone(model.diputado.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.diputado.get('nombre')
      });
    }
  },
});
