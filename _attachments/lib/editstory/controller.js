//
// The controller ties everything together into a single widget
//
var storyWidget = function(app) {
  // Set up couchdb-backbone connector
  Backbone.couch.databaseName = app.db.name;
  Backbone.couch.ddocName = app.ddoc._id.slice(8);
  Backbone.couch.enableChangeFeed = true;

  // TODO: load a story
  var storyModel = new StoryModel(); // StoryModel(story_doc)
  var storyView = new StoryView({model: storyModel});

/*
  $.log('defined collection')
  var myStates = StateCollection({});
  $.log('inited collection')
  $.log(Backbone.couch.fetchCollection(states));
  $.log('fetched collection')
*/
};

(function($) {
  $.widgets = $.widgets || {}
  $.widgets.story = storyWidget;
})(jQuery);