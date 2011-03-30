function(){
  var state_data = init_states($("#states").text().split("\n"));
  var app_data = {
  board: init_board($("#stories").text().split("\n")),
    states: state_data.states,
    states_order: state_data.states_order
  }
  $("#output").empty();
  $("#output").append(create_board(app_data));
}