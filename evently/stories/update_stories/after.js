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

}