import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  actions: {
    doRegister(attrs) {
      const user = this.store.createRecord('user', attrs);

      user.save().then(() => {
          this.get('flashMessages').success('Registered! Please login now');
          this.transitionTo('auth.login');
        }).catch((response) => {
          const { errors } = response;

          this.get('flashMessages').danger(errors.mapBy('detail').join(', '));
        });
    }
  },
  model() {
    return {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }
});
