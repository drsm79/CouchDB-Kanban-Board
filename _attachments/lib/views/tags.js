var TagsView = Backbone.View.extend({
	// A view for a collection of targets - they can't be edited, don't think we need ShortTargetView
	initialize: function(collection) {
	  _.bindAll(this, 'render');
	  this.collection = collection;

	  this.collection.bind('refresh', this.render);
	  this.collection.bind('reset', this.render);
	  this.collection.bind('change', this.render);
	  this.collection.bind('add', this.render);
    // This fetches but doesn't fire refresh/reset
    this.collection.fetch();
  },
  render: function() {
		data = this.collection.models;
		_.each(this.collection.models, function(tag) {
		  $("#tag_cloud").append('<font size="' + tag.get('size') + '">' + tag.get('name') + "</font> ");
		});
	}
});