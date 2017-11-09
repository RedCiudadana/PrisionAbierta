import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  spreadsheets: Ember.inject.service(),

  findAll(_, type) {
    return this.get('spreadsheets').fetch(type);
  },

  find(store, type, id) {
    return this.findAll(store, type).then(function(data) {
      return data.findBy('id', id);
    });
  },

  findQuery: function(store, type, query) {
    return this.findAll(store, type).then(function(data) {
      return data.filter(function(datum) {
        return Ember.keys(query).every(function(key) {
          return datum[key] === query[key];
        });
      });
    });
  },

  createRecord() { throw('Not supported'); },
  updateRecord() { throw('Not supported'); },
  deleteRecord() { throw('Not supported'); }
});
