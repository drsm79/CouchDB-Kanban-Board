//
// The controller ties everything together into a single widget
//
var storyWidget = {
  initialise : function() {
    this.storyModel = new StoryModel();
    this.storyView = new FullStoryView({model: this.storyModel});
    this.render();
  },
  render : function(model) {
    // TODO: load a story - pass in a model here
    this.storyView.render();
  },
};
