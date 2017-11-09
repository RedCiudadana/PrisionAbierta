import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  informacionGeneralFields: null,
  frenteAFrenteFields: null,

  normalize(modelClass, resourceHash) {
    resourceHash.informacionGeneral = {};

    this.get('informacionGeneralFields').forEach((item) => {
      resourceHash.informacionGeneral[item.field] = {
        label: item.label,
        value: resourceHash[item.field]
      };
    });

    resourceHash.frenteAFrente = {};

    this.get('frenteAFrenteFields').forEach((item) => {
      resourceHash.frenteAFrente[item.field] = resourceHash[item.field];
    });

    return this._super(modelClass, resourceHash);
  }
});
