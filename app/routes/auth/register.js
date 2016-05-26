import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    doRegister(attrs) {
      const user = this.store.createRecord('user', attrs);

      user.save().then(() => {
          this.transitionTo('auth.login');
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
