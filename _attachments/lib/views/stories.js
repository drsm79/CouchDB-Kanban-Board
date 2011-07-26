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
    this.default_target = options.default_target;
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
    // Create target selector
    if ($.widgets.target) {
      this.target = $.widgets.target.initialise({
        selector: "#story_target",
        default_target: this.model.get("story_target") || this.default_target,
        null_target: "No target"
      });
    } else {
      $.log("Cannot create target selector as widget not loaded");
    }
  },

  save: function() {
    $.log('save called');
    this.update();
    this.model.save(undefined, {
      success: function(model, response) {
        if (!$.board.stories.collection.get(model.get("_id"))) {
          $.board.stories.collection.add(model); // Do this after save so we have an _id
        }
      }
    });
    $("#dialog").fadeOut("fast", function() {
      $("#dialog, #overlay, #overlay-frame").remove();
    });
    $(document).unbind("keydown");
  },

  update: function() {
    this.model.set({
      story_name: $("#name").val(),
      story_description: $("#description").val(),
      story_target: this.target.get_current_target(),
      story_tags:$("#tags").val().split(',')
    });
  }

});
