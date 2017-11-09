import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    shareOnTwitter() {
      window.open(
        this.model.config.twitterShareLink,
        'twitter',
        'width=450, height=250'
      );
    }
  }
});
