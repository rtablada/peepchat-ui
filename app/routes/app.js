import Ember from 'ember';
import config from 'peepchat/config/environment';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel() {
    if(!this.get('session.isAuthenticated')) {
      this.transitionTo('auth.login');
    }
  },

  afterModel() {
    return fetch(`${config.DS.host}/${config.DS.namespace}/user/current`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.get('session.data.authenticated.access_token')}`
      }
    }).then(raw => raw.json())
    .then((data) => {
      const currentUser = this.store.push(data);
      this.set('session.currentUser', currentUser);
    });
  }
});
