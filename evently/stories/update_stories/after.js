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
    var storyId = $(event.target).attr("href").slice(1);
    $("#stories").trigger("update_db", [storyId, "Archived"]);
  });
}