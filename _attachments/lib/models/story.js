// Define the model class
var StoryModel = Backbone.Model.extend({
  initialize: function(story) {
    this.set({
      // do I need id or _id? will have both for now....
      _id: story._id || undefined,
      _rev: story._rev || undefined,
      story_name: story.story_name || "New Story",
      story_description: story.story_description || "",
      story_target: story.story_target || "",
      story_tags: story.story_tags || [],
      story_state: story.story_state || "New"
    });
    // TODO: use the view that builds the board to choose the 1st state
  }
// TODO: check that tags are a list
//  validate: function (attrs) {
//    if (attrs.story_tags) {}
//  }
});