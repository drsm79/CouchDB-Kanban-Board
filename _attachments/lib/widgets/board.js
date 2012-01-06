var BoardRouter = Backbone.Router.extend({
  routes: {
    "tag=:tag": "tag",
    "g=:tag": "tag",
    "target=:target": "target",
    "t=:target": "target",
    // Now we get into combinatorics...
    "t=:target/tag=:tag": "tag_and_target",
    "t=:target/g=:tag": "tag_and_target",
    "target=:target/tag=:tag": "tag_and_target",
    "target=:target/g=:tag": "tag_and_target",
    "tag=:tag/t=:target": "tag_and_target",
    "g=:tag/t=:target": "tag_and_target",
    "target=:target": "tag_and_target",
    "g=:tag/target=:target": "tag_and_target"
  },

  target: function(target) {
    $.widgets.board.set_target(target);
    $.widgets.target.set_current_target(target);
    $.widgets.board.set_tag("");
  },

  tag: function(tag) {
    $.widgets.board.set_tag(tag);
  },
  tag_and_target: function(target, tag) {
    this.target(target);
    this.tag(tag);
  }

});

var boardWidget = {
  initialise : function() { 
    var stateView = new BoardStateView(new StateCollection);
    var storyView = new BoardStoryView(new StoriesCollection);
    $.widgets.board = {};

    var trigger_state_update = function() {
      // Dragsort sets the current object to the dragged item and
      // we use the id of the a element for the id
      var story_id = $("a", this).attr("id");
      var parent = this.context.parentNode;
      var new_state = parent.id;
      // Need to get the model from the collection so everything gets refreshed
      // TODO: check that can't use new StoryModel({id: story_id})
      var model = $.widgets.board.stories.collection.get(story_id);

      // Before sending any HTTP requests, check if the state has actually changed
      if (model.get("story_state") == new_state) {
        return; // Quietly exit
      }

      // Need to fetch the model to make sure the _rev is set. Once fetched can
      // save the updated story to the database.
      var that = this;
      model.fetch({
        success : function(model, response){
          // The html change has to go here - it's the only place that has old
          // and new state to hand
          var old_state = model.get('story_state');
          model.save({story_state: new_state});
          if (old_state == "Done" || new_state == "Done") {
            var story_element = "<div class=\"box box_" + new_state + "\">";
            story_element += model.get('story_name');
            story_element += "<br/><a id=\"" + model.id;

            if (old_state == "Done" && new_state != "Done"){
              story_element += "\" class=\"edit_story\" href=\"#" + model.id;
              story_element += "\">edit &#8883;</a></div>";
            }
            if (new_state == "Done") {
              story_element += "\" class=\"Archive\" href=\"#" + model.id;
              story_element += "\">archive</a></div>";
            }
            that.html(story_element);
          }
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
            storyWidget.initialise({
              storyId: $(event.target).attr("id") || undefined,
              board: $.widgets.board,
              // I don't like this - relies on $.widgets.target being set (which will normally, but not necessarily, be the case)
              default_target: $.widgets.target.get_current_target() | "All",
              targets_collection: $.widgets.target.get_collection()
            });
          }
        });
      });
    };

    var add_archive_link = function() {
      $(".archive_story").click(function(event) {
        event.preventDefault();
        var story_id = $(event.target).attr("id");
        var model_to_archive = $.widgets.board.stories.collection.get(story_id);
        model_to_archive.save({'story_state': 'Archived'});
      });
    };
    // Bind the board to the jquery global namespace
    $.widgets.board = new BoardView({
      states: stateView,
      stories: storyView,
      trigger_func: trigger_state_update,
      after: [add_edit_link, add_archive_link]
    });

    $.log('initialised board');
  }
};
