import Ember from 'ember';
import config from '../config/environment';
import injectScript from 'ember-inject-script';

const { isNone } = Ember;

export default Ember.Route.extend({
  spreadsheets: Ember.inject.service(),

  _routing: Ember.inject.service('-routing'),

  ajax: Ember.inject.service(),

  breadCrumb: {
    title: 'application breadcrumb'
  },

  /**
   * Setear la URL del spreadhseet y procesar los campos de información general
   * del perfil.
   *
   * TODO: Hacer esto en un lugar más decente, por amor al Señor
   */
  beforeModel() {
    const spreadsheet = this.get('spreadsheets');

    return this.get('ajax')
      .request(config.APP.spreadsheetUrl, {dataType: 'text'})
      .then((response) => {
        spreadsheet.set('spreadsheet', response);

        return Ember.RSVP.all([

          /**
           * Setear la información general del perfil mediante la parametrización
           * proveniente de la configuración
           */
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

          /**
           * Setear la información de recuadros del perfil mediante la parametrización
           * proveniente de la configuración
           */
          spreadsheet
            .fetch('perfil-recuadros-configuracion')
            .then((configuracionData) => {
              let perfilRecuadrosDataArray = Ember.A([]);

              Ember.A(configuracionData).forEach((item) => {
                perfilRecuadrosDataArray.pushObject({
                  field: item.field,
                  label: item.label
                });
              });

              let prefilSerializer = this.store.serializerFor('perfil');

              prefilSerializer.set('recuadrosFields', perfilRecuadrosDataArray);
            }),

          // Información general de diputado
          // TODO: Evaluar pertinencia, ya que es una funcionalidad específica de
          // Elección PDH
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

              diputadoSerializer.set('informacionGeneralFields', Ember.A());
              diputadoSerializer.set('frenteAFrenteFields', Ember.A());
            }),

          /**
           * Setear los campos a utilizar en la funcionalidad de frente-a-frente
           */
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
      config: spreadsheet.fetch('configuracion').then((configuracion) => {
        let configObject = Ember.Object.create();

        Ember.A(configuracion).forEach((item) => {
          configObject.set(item.key, item.value);
        });

        /**
         * Inject HelloBar if defined
         */
        if (!isNone(configObject.helloBarUrl)) {
          injectScript(configObject.helloBarUrl);
        }

        return configObject;
      }),

      /**
       * Header links, top right
       */
      navbarLinks: spreadsheet.fetch('navbar-links').then((links) => {
        return Ember.A(links).filter((link) => {
          return _routing.hasRoute(link.route);
        });
      }),

      /**
       * Front page image links.
       *
       * If the row does not include a link property it gets dissmissed
       */
      mainPageLinks: spreadsheet.fetch('main-page-links').then((links) => {
        return Ember.A(links).filter((link) => {
          if (link.link) {
            return true;
          }

          return _routing.hasRoute(link.route);
        });
      }),

      /**
       * Main page slider profiles list
       */
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

      frontTableVisualizationConfig: spreadsheet.fetch('front-table-visualization-config')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    model.config.navbarLinks = model.navbarLinks;
    model.config.mainPageLinks = model.mainPageLinks;
    model.config.mainPageSliderData = model.mainPageSliderData;
  },

  actions: {
    selectPerfil(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }
});
