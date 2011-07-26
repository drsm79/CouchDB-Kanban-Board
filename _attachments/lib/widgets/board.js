var boardWidget = function() {
  var stateView = new BoardStateView(new StateCollection);
	var storyView = new BoardStoryView(new StoriesCollection);
  $.board = {};

  var trigger_state_update = function() {
    // Dragsort sets the current object to the dragged item and
    // we use the id of the a element for the id
    var story_id = $("a", this).attr("id");
    var parent = this.context.parentNode;
    var new_state = parent.id;
    // Need to get the model from the collection so everything gets refreshed
    // TODO: check that can't use new StoryModel({id: story_id})
    var model = $.board.stories.collection.get(story_id);

    // Before sending any HTTP requests, check if the state has actually changed
    if (model.get("story_state") == new_state) {
      return; // Quietly exit
    }

    // Need to fetch the model to make sure the _rev is set. Once fetched can
    // save the updated story to the database.
    model.fetch({
      success : function(model, response){
        model.save({story_state: new_state});
      },
      error : function(model, response){
        alert('Could not save state change for ' + model.story_name);
      }
    });
  };

  var add_edit_link = function() {
    $(".edit_story").click(function(event) {
      event.preventDefault();
      $.showDialog("add_story_dialog.html?story_id=" + $(event.target).attr("id"), {
        load: function(elem) {
          $.widgets.story.initialise({storyId: $(event.target).attr("id") || undefined, board: $.board});
        }
      })
    });
  }

  // Bind the board to the jquery global namespace
  $.board = new BoardView({
    states: stateView,
    stories: storyView,
    trigger_func: trigger_state_update,
    after: [add_edit_link]
  });

  $.log('initialised board');
};
