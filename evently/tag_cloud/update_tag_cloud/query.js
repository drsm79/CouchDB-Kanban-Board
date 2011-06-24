function(event, story_target) {
  var options = {
    "view": "tag-cloud",
    "group": true,
    "group_level": 2
  }
  if (story_target) {
    options.startkey = [story_target];
    options.endkey = [story_target, {}];
  }
  return options;
}