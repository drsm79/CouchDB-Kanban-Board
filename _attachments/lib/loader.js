// The loader pulls in all the necessary js files for the app in one place

function app_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

app_load([
  // library code
  "vendor/backbone/underscore.js",
	"vendor/backbone/backbone.js",
	"vendor/backbone/backbone.couch.js",
	"vendor/mustache/jquery.mustache.js",
  // models for the application
  "lib/models/story.js",
  "lib/models/state.js",
  "lib/models/tag.js",
  "lib/models/target.js",
  // collections for the application
  "lib/collections/states.js",
  "lib/collections/stories.js",
  "lib/collections/tags.js",
  "lib/collections/targets.js",
  // views
  "lib/views/board.js",
  "lib/views/stories.js",
  "lib/views/states.js",
  "lib/views/tags.js",
  "lib/views/targets.js",
  // widgets/controllers
  //"lib/widgets/editstory/controller.js",
  "lib/widgets/target_widget.js",
  "lib/widgets/board.js",
  "lib/widgets/full_story.js",
  "lib/widgets/tag_widget.js"
])