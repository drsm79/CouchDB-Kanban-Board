//
// The controller ties everything together into a single widget
//
var storyWidget = {
  initialise : function(options) {
    this.storyModel = new StoryModel({id: options.storyId});
    this.storyView = new FullStoryView({model: this.storyModel, default_target: options.default_target});
    if (options.storyId) {
      this.storyModel.fetch();
    } else {
      // Manual call render to display the default story
      this.storyView.render();
    }
  }
};
