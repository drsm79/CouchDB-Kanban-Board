// Define the model class
var StoryModel = Backbone.Model.extend({
  initialize: function(story) {
    // TODO: handle loading a story via fetchModel
    this.set({
      _id: story.id || undefined,
      _rev: story.rev || undefined,
      story_name: story.story_name || "New Story",
      story_description: "",
      story_target: "",
      story_tags: [],
      story_state: "New"
    });
    // TODO: use the view that builds the board to choose the 1st state
  }
// TODO: check that tags are a list
//  validate: function (attrs) {
//    if (attrs.story_tags) {}
//  }
});