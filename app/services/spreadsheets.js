import Ember from 'ember';
import Tabletop from 'tabletop';
import config from '../config/environment';
import {isNotFoundError} from 'ember-ajax/errors';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  spreadsheet: null,
  flashMessages: Ember.inject.service(),

  fetch(worksheet) {
    if (!Ember.isNone(config.APP.staticFilesUrl)) {
      return this.get('ajax')
        .request(config.APP.staticFilesUrl + worksheet + '.json')
        .then((response) => {
          return new Ember.RSVP.Promise((resolve) => {
            resolve(response);
          });
        })
        .catch((error) => {
          let errorMessage = 'Error durante carga de data JSON!';

          if (isNotFoundError(error)) {
            errorMessage = `Expected file ${worksheet}.json not found`;
          }

          this.get('flashMessages').danger(
            errorMessage,
            {sticky: true}
          );

          throw error;
        });
    }

    return new Ember.RSVP.Promise((resolve) => {
      Tabletop.init({
        key: this.get('spreadsheet'),
        callback: (data) => {
          if (Ember.isNone(data[worksheet])) {
            let errorMessage = `Got no answer for spreadsheet ${worksheet}`;
            this.get('flashMessages').danger(errorMessage, {sticky: true});

            throw new Error(errorMessage);
          }

          if (Ember.isNone(data[worksheet].elements)) {
            let errorMessage = `Got a problem with the elements for spreadsheet ${worksheet}`;
            this.get('flashMessages').danger(errorMessage, {sticky: true});

            throw new Error(errorMessage);
          }

          resolve(data[worksheet].elements);
        }
      });
    });
  }
});
