function(){
  var states = $("#states").text().split("\n");
  if (states.length){
    var app_data = {
      board: init_board($("#stories").text().split("\n")),
      states: $("#states").text().split("\n")
    };
    $("#output").empty();
    $("#output").append(create_board(app_data));
  };
  $(".Archive").click(function(event) {
    event.preventDefault();
    var storyId = $(event.target).attr("id");
    $("#stories").trigger("update_db", [storyId, "Archived"]);
  });
  $(".edit_story").click(function(event) {
    event.preventDefault();
    $.showDialog("add_story_dialog.html?story_id=" + $(event.target).attr("id"), {
      load: function(elem) {
        // Note: Doing the $.couch.app stuff here means we can create a closure
        // referencing the story id. The story widget can then use the id to load
        // the story data. I can't think of another way of getting the story id
        // to the story widget.
        $.couch.app(function(app) {
          $.widgets.story(app, $(event.target).attr("id") || undefined);
        });
      }
    })
  });
  // Note: The above two $(selector).click functions add functionality to the stories
  // after they have been updated by this evently widget.
  // This is not particularly clean: Stories are updated by this widget but then
  // just dumped in a div. The SimpleKanban logic in index.html renders that data
  // as stories, and then the .click callbacks run and add functionality to the
  // edit/archive links. Logic for one thing is spread around the codebase.
  // TODO: Refactor so that stories are rendered directly by this widget (note -
  // before we do that we probably want to re-write this as a Backbone widget).
}