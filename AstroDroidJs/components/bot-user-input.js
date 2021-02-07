AFRAME.registerComponent('bot-user-input', {
  schema: {
    bar: {type: 'number'},
    baz: {type: 'string'}
  },

  init: function () {
    this.el.addEventListener('OnMoveCommand', function (event) {
      console.log('OnMoveCommand', event);

      // todo
      // figure out how to include my messaging system
      // send message about event
      
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },

});