import Ember from 'ember';

// TODO: Pendiente de completar implementación de pantalla de institución
export default Ember.Route.extend({
  spreadsheets: Ember.inject.service(),
  _routing: Ember.inject.service('-routing'),

  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return Ember.RSVP.hash({
      config: {},
      institucionFuncionalidades: spreadsheet
        .fetch('institucion-funcionalidades')
        .then((links) => {
          return Ember.A(links)
            .filter((link) => {
              if (link.link) {
                return true;
              }

              if (!_routing.hasRoute(link.route)) {
                throw new Error(`Route not recognized: ${link.route}`);
              }

              return true;
            });
        }),
      institucionInformacionGeneralConfiguracion: spreadsheet
        .fetch('institucion-informacion-general-configuracion'),
      institucionData: spreadsheet
        .fetch('institucion-data')
        .then((institucionData) => {
          let institucionDataObject = Ember.Object.create();

          Ember.A(institucionData).forEach((item) => {
            institucionDataObject.set(item.key, item.value);
          });

          return institucionDataObject;
        }),
    });
  },

  afterModel(model) {
    if (!Ember.isNone(model.institucionData.nombre)) {
      this.set('breadCrumb', {
        title: model.institucionData.nombre
      });
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    // TODO: validar que no vengan configurados campos no encontrados en la información
    // de la institución

    model.config.institucionFuncionalidades = model.institucionFuncionalidades;
    model.config.institucionInformacionGeneral = model.institucionInformacionGeneralConfiguracion;

    model.informacionGeneral = {};
    Ember.A(model.config.institucionInformacionGeneral)
      .map((element) => {

        if (Ember.isNone(model.institucionData[element.field])) {
          throw new Error(`Property '${element.field}' of institucion unedfined`);
        }

        model.informacionGeneral[element.field] = {
          label: element.label,
          value: model.institucionData[element.field]
        };
      });
  }
});
