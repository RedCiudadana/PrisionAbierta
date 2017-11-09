import Ember from 'ember';

export default Ember.Route.extend({
  // TODO: Ver cómo hacer funcionar esta onda otra vez
  breadCrumb: null,

  spreadsheets: Ember.inject.service(),

  model() {
    const spreadsheet = this.get('spreadsheets');

    let perfilConfigObject = this.modelFor('perfil');

    return Ember.RSVP.hash({
      perfilConfigObject: perfilConfigObject,
      factCheckingGroupedItemsList: spreadsheet.fetch('fact-checking-data')
        // Filtrar por perfil
        .then((factCheckingData) => {
          return Ember.A(factCheckingData).filter((data) => {
            return data.perfil === perfilConfigObject.perfil.get('id');
          });
        })
        // Agrupar por sección
        .then((factCheckingData) => {
          let groupedData = {};

          Ember.A(factCheckingData).forEach((item, index) => {
            if (Ember.isNone(groupedData[item.section])) {
              groupedData[item.section] = {};
            }

            groupedData[item.section][index] = {
              title: item.title,
              quote: item.quote,
              fact: item.fact,
              source: item.source
            };
          });

          return groupedData;
        }),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set(
      'factCheckingFuncionalidad',
      model
        .perfilConfigObject
        .config
        .perfilFuncionalidades
        .findBy('route', 'perfil.fact-checking')
    );

    controller.set(
      'factCheckingGroupedItemsList',
      model.factCheckingGroupedItemsList
    );

    controller.set('perfil', model.perfilConfigObject.perfil);
  },

  actions: {
  }
});
