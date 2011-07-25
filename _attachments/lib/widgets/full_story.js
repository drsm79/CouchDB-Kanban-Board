//
// The controller ties everything together into a single widget
//
var storyWidget = {
  initialise : function(storyId) {
    this.storyModel = new StoryModel({id: storyId});
    this.storyView = new FullStoryView({model: this.storyModel});

    if (storyId) {
      this.storyModel.fetch();
    }
  }
};
