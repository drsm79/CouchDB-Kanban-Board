var StoriesCollection = Backbone.Collection.extend({
  url : "stories",
  model : StoryModel,
  options : {
    reduce: false
	}
});