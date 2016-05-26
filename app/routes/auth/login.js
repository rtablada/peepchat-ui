import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  actions: {
    doLogin(user) {
      this.get('session')
        .authenticate(
          'authenticator:peepchat', user.email, user.password
        );
    }
  },
  model() {
    return {
      email: '',
      password: ''
    };
  }
});
