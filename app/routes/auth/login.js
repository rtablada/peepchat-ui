import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    doLogin(user) {
      this.get('session')
        .authenticate(
          'authenticator:peepchat', user.email, user.password
        ).then(() => {
          this.get('flashMessages').success('Logged in!');
        }).catch((response) => {
          const { errors } = response;

          if (errors.mapBy('code').indexOf(401) !== -1) {
            this.get('flashMessages')
              .danger('There was a problem with your username or password, please try again');
          } else {
            this.get('flashMessages').danger('Server Error');
          }
        });
    }
  },
  model() {
    return {
      email: '',
      password: ''
    };
  }
});
