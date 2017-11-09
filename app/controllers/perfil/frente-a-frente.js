import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,

  frenteAFrenteFields: null,

  frenteAFrenteFuncionalidad: null,

  /**
   * Hash
   */
  frenteAFrenteSectionGroupedFields: Ember.computed('frenteAFrenteFields', function() {
    let groupedFields = {};

    this.get('frenteAFrenteFields').forEach((item) => {
      if (Ember.isNone(groupedFields[item.section])) {
        groupedFields[item.section] = {};
      }

      groupedFields[item.section][item.field] = {
        field: item.field,
        label: item.label
      };
    });

    return groupedFields;
  }),

  perfilUnoId: null,

  perfilDosId: null,

  perfilUno: Ember.computed('perfilUnoId', function() {
    return this.get('model.perfiles').findBy('id', this.get('perfilUnoId'));
  }),

  perfilDos: Ember.computed('perfilDosId', function() {
    return this.get('model.perfiles').findBy('id', this.get('perfilDosId'));
  })
});
