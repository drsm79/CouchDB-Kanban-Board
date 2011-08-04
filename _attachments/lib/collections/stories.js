var StoriesCollection = Backbone.Collection.extend({
  url : "stories",
  model : StoryModel,
  options : {
    reduce: false
	},
  handle_change: function(doc) {
    var localModel = new this.model();
    var attributes = localModel.toJSON();
    if (_.all(attributes, function(value, key) {
      return key in doc;
    })) {
      this.add(doc);
    }
  }
});