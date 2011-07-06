// The loader pulls in all the necessary js files for the widget in one place

function widget_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="lib/'+scripts[i]+'"><\/script>')
  };
};

widget_load([
  "editstory/controller.js",
  "editstory/view.js",
  "models/story.js",
  "models/state.js",
  "collections/states.js"
])