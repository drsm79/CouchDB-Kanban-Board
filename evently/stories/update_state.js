function (event, id) {
  var state = get_current_state(id);
  if ($$(this).states_by_id[id] != state) {
    $$(this).states_by_id[id] = state;
    $(this).trigger("update_db", [id, state]);
  }
}

var get_current_state = function(id) {
  var data = get_data();
  var stories = data.split("\n");
  for (var story in stories) {
    if (stories.hasOwnProperty(story) && stories[story]) {
      var story_data = stories[story].split(',');
      var story_id = story_data[1];
      var state = story_data[0];
      if (id == story_id) {
        return state;
      }
    }
  }
  throw Error("Could not get state for story with id " + id);
}