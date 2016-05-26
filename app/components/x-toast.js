import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['material-toast', 'toast'],
  classNameBindings: ['active', 'exiting', 'color'],

  active: false,
  color: Ember.computed('content.type', function() {
    switch (this.get('content.type')) {
      case 'danger':
        return 'red darken-2 white-text';
      case 'warning':
        return 'yellow lighten-1 black-text';
      default:
        return '';
    }
  }),

  exiting: Ember.computed.readOnly('conent.exiting'),

  _destroyFlashMessage() {
    const flash = Ember.getWithDefault(this, 'content', false);

    if (flash) {
      flash.destroyMessage();
    }
  },

  didInsertElement() {
    this._super(...arguments);

    this.__applyActiveClass = Ember.run.next(() => {
      this.set('active', true);
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    this._destroyFlashMessage();

    if (this.__applyActiveClass) {
      Ember.run.cancel(this.__applyActiveClass);
    }
  }
});
