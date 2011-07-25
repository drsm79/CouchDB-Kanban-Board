var TagModel = Backbone.Model.extend({
  initialize: function(tag) {
    this.set({
      name: tag.name,
      size: tag.size
    });
  }
});