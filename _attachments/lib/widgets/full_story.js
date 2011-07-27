//
// The controller ties everything together into a single widget
//
var storyWidget = {
  initialise : function(options) {
    var storyModel = new StoryModel({id: options.storyId});
    var storyView = new FullStoryView({
      model: storyModel,
      default_target: options.default_target
    });

    if (options.board) {
      var update_story_on_board = function() {
        var newStory = options.board.stories.collection.get(options.storyId);
        newStory.set(storyModel.changedAttributes());
      };
      storyView.after = [update_story_on_board];
    }

    // Add new target code
    $("#add_target").click(function() {
      var new_target = prompt("Enter new target:");
      storyView.target.add_target(new_target);
    });

    if (options.storyId) {
      storyModel.fetch();
    } else {
      // Manual call render to display the default story
      storyView.render();
    }
  }
};
