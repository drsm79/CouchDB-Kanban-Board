function(data) {
  $$(this).states_by_id = get_current_states(data);
  return_data = {stories: data.rows};
  return return_data;
}

var get_current_states = function(data) {
  var states_by_id = {};
  for (var i in data.rows) {
    if (data.rows.hasOwnProperty(i)) {
      id = data.rows[i];
      state = data.rows[i].value.split(',')[1];
      states_by_id[id] = state;
    }
  }
  return states_by_id;
}