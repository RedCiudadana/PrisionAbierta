import Ember from 'ember';
import config from '../config/environment';
import injectScript from 'ember-inject-script';

export default Ember.Route.extend({
  spreadsheets: Ember.inject.service(),

  _routing: Ember.inject.service('-routing'),

  ajax: Ember.inject.service(),

  breadCrumb: {
    title: 'application breadcrumb'
  },

  init() {
    this._super(...arguments);

    let url = '//my.hellobar.com/8700f679a0f3df81d69a2201bbf5f6740b22a2f9.js';

    injectScript(url);
  },

  /**
   * Setear la URL del spreadhseet y procesar los campos de información general
   * del perfil.
   *
   * TODO: Hacer esto en un lugar más decente, por el amor del Señor
   */
  beforeModel() {
    const spreadsheet = this.get('spreadsheets');

    return this.get('ajax')
      .request(config.APP.spreadsheetUrl, {dataType: 'text'})
      .then((response) => {
        spreadsheet.set('spreadsheet', response);

        return Ember.RSVP.all([
          // Información general de perfil
          spreadsheet
            .fetch('perfil-informacion-general-configuracion')
            .then((configuracionData) => {
              let perfilDataArray = Ember.A([]);

              Ember.A(configuracionData).forEach((item) => {
                perfilDataArray.pushObject({
                  field: item.field,
                  label: item.label
                });
              });

              let prefilSerializer = this.store.serializerFor('perfil');

              prefilSerializer.set('informacionGeneralFields', perfilDataArray);
            }),

          // Información general de diputado
          spreadsheet
            .fetch('diputado-informacion-general-configuracion')
            .then((configuracionData) => {
              let diputadoDataArray = Ember.A([]);

              Ember.A(configuracionData).forEach((item) => {
                diputadoDataArray.pushObject({
                  field: item.field,
                  label: item.label
                });
              });

              let diputadoSerializer = this.store.serializerFor('diputado-comision');

              diputadoSerializer.set('informacionGeneralFields', diputadoDataArray);
              diputadoSerializer.set('frenteAFrenteFields', Ember.A());
            }),

          spreadsheet
            .fetch('perfil-frente-a-frente-configuracion')
            .then((configuracionData) => {
              let perfilFrenteAFrenteDataArray = Ember.A([]);

              Ember.A(configuracionData).forEach((item) => {
                perfilFrenteAFrenteDataArray.pushObject({
                  field: item.field,
                  label: item.label,
                  section: item.section
                });
              });

              let prefilSerializer = this.store.serializerFor('perfil');

              prefilSerializer.set('frenteAFrenteFields', perfilFrenteAFrenteDataArray);
            })
        ]);
      });
  },

  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return Ember.RSVP.hash({
      partidos: this.store.findAll('partido'),
      perfiles: this.store.findAll('perfil'),
      diputados: this.store.findAll('diputado-comision'),
      config: spreadsheet.fetch('configuracion').then((configuracion) => {
        let configObject = Ember.Object.create();

        Ember.A(configuracion).forEach((item) => {
          configObject.set(item.key, item.value);
        });

        return configObject;
      }),
      navbarLinks: spreadsheet.fetch('navbar-links').then((links) => {
        return Ember.A(links).filter((link) => {
          return _routing.hasRoute(link.route);
        });
      }),
      mainPageLinks: spreadsheet.fetch('main-page-links').then((links) => {
        return Ember.A(links).filter((link) => {
          if (link.link) {
            return true;
          }

          return _routing.hasRoute(link.route);
        });
      }),
      mainPageSliderData: spreadsheet.fetch('main-page-slider-data'),
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

  setupController(controller, model) {
    this._super(controller, model);

    model.config.navbarLinks = model.navbarLinks;
    model.config.mainPageLinks = model.mainPageLinks;
    model.config.mainPageSliderData = model.mainPageSliderData;
  },

  actions: {
    selectCandidato(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }
});
