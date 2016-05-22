import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card'],
  tagName: 'form',

  submit(ev) {
    ev.preventDefault();

    const onsubmit = this.get('attrs.onsubmit');

    if (typeof onsubmit === 'function') {
      this.onsubmit();
    }
  }
});
