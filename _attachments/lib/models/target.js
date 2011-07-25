var TargetModel = Backbone.Model.extend({
  initialize: function(target) {
    this.set({
      name: target.name
    });
  }
});