var BoardStoryView = Backbone.View.extend({
	// A view for a collection of stories
	initialize: function(collection) {
	  _.bindAll(this, 'render');
	  this.collection = collection;
    this.collection.bind('add',     this.render);
    this.collection.bind('refresh',   this.render);
		this.collection.bind('reset', this.render);
		this.collection.bind('change', this.render);
		this.collection.bind('remove', this.render);
		this.shown_target = "All";
  },
	render: function() {
	  var output = [];
	  var that = this;
	  var to_show = this.collection.filter(function(story){
	    if ("All" === that.shown_target){
	      return true;
	    } else if (that.shown_target == "No target") {
	      if (story.get("story_target") == ""){
	        return true;
	      }
	    } else {
	      return story.get("story_target") === that.shown_target;
      }
    })
	  to_show.forEach(function(model) {
	    var data = model.attributes;
	    output.push([data.story_state, data._id, data.story_name].join(","));
    });
    return output;
	},
	set_target: function(target) {
	  this.shown_target = target || this.shown_target;
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
    this.targets_collection = options.targets_collection;
    this.after = options.after;
  },

  render: function() {
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
    var story_target = this.model.get("story_target");
    if (!story_target) {
      if (this.model.isNew()) {
        story_target = this.default_target;
      } else {
        story_target = "No target";
      }
    }
    if (targetWidget) {
      this.target = targetWidget.initialise({
        selector: "#story_target",
        default_target: story_target,
        local: true,
        collection: this.targets_collection
      });
    } else {
      $.log("Cannot create target selector as widget not loaded");
    }
    _.each(this.after, function(func) {
      func();
    });
  },

  save: function() {
    var that = this;
    this.update();
    this.model.save(undefined, {
      success: function(model, response) {
        var story_target = model.get("story_target") || "No target";
        if (!$.widgets.board.stories.collection.get(model.get("_id"))) {
          if (!that.default_target || (that.default_target == story_target || that.default_target == "All")) {
            $.widgets.board.stories.collection.add(model); // Do this after save so we have an _id
          }
        } else {
          if (that.default_target && that.default_target != story_target && that.default_target != "All") {
            $.widgets.board.stories.collection.remove(model);
          }
        }
      }
    });
    $("#dialog").fadeOut("fast", function() {
      $("#dialog, #overlay, #overlay-frame").remove();
    });
    $(document).unbind("keydown");
  },

  update: function() {
    var attributes = {
      story_name: $("#name").val(),
      story_description: $("#description").val(),
      story_tags:$("#tags").val().split(',')
    };
    var target = this.target.get_current_target();
    if (target == "No target") {
      if (this.model.attributes.story_target) {
        this.model.unset("story_target");
      }
    } else {
      attributes.story_target = target;
    }
    this.model.set(attributes);
  }
});
