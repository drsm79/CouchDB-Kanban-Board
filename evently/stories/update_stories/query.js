function(event, data) {
  var options = {
    "view": "stories",
    "reduce": false
  };
  if (data) {
    options.key = data;
  }
  return options;
}