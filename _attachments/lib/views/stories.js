var ShortStoryView = Backbone.View.extend({
  // A view for a single story - needed because the model can be edited
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.model.view = this;
  },
	render: function() {
		data = this.model.attributes;
		return [data.story_state, data._id, data.story_name].join(',') + "\n"
	}
});

var BoardStoryView = Backbone.View.extend({
	// A view for a collection of stories
	initialize: function(collection) {
	  _.bindAll(this, 'addOne', 'addAll');
	  this.collection = collection;
    this.collection.bind('add',     this.addOne);
    this.collection.bind('refresh',   this.addAll);
		this.collection.bind('reset', this.addAll);
  },
	addOne: function(story) {
		var view = new ShortStoryView({model: story});
		$("#stories").append(view.render())
	},
	addAll: function(){
		$("#stories").empty();
		this.collection.each(this.addOne);
	}
});

var FullStoryView = Backbone.View.extend({
  id: "story",
  // TODO: Ask Mike about events
  events: {
    "click #save": "save",
    "change #description": "update",
    "change #target": "update",
    "change #name": "update",
    "change #tags": "update"
  },

  initialize: function(options) {
    _.bindAll(this, "render", "save", "update");
    // explicitly bind the save for now...
    $('#save').bind("click", this.save);

    this.model = options.model || new StoryModel();
    this.model.bind("change", this.render);
    this.model.view = this;
  },

  render: function() {
    $.log("Rendering");
    $.log(this.model.toJSON());
    $("#name").val(this.model.get("story_name"));
    $("#description").val(this.model.get("story_description"));
    // Tags are "special"
    story_tags = this.model.get("story_tags");
    // Clear the tag box
    if ($("#tags").val()){
      _.each($("#tags").val().split(','), function(tag){$("#tags").removeTag(tag);});
    }
    // Add the tags back
    _.each(story_tags, function(tag){$("#tags").addTag(tag);});
    // TODO: Deal with story targets
    //$("#target").val(this.model.get("story_target"));
  },

  save: function() {
    $.log('save called');
    this.update();
    if (this.model.isNew()){
      $.board.stories.collection.add(this.model);
    }
    this.model.save();
    $("#dialog").fadeOut("fast", function() {
      $("#dialog, #overlay, #overlay-frame").remove();
    });
    $(document).unbind("keydown");
  },

  update: function() {
    this.model.set({
      story_name: $("#name").val(),
      story_description: $("#description").val(),
      story_target: $("#target").val(),
      story_tags:$("#tags").val().split(',')
    });
  }

});
