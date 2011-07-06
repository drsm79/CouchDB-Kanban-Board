var StoryView = Backbone.View.extend({
  id: "story",
  // TODO: Ask Mike about events
  events: {
    "click #save": "save",
    "change #description": "update",
    "change #target": "update",
    "change #name": "update",
    "change #tags": "update"
  },

  initialize: function() {
    // TODO: Ask Mike about bindAll
    _.bindAll(this, "render", "save", "update");
    // explicitly bind the save for now...
    $('#save').bind("click", this.save)
    this.model.bind("change", this.render);
    this.model.view = this;
    this.render();
  },

  render: function() {
    $("#name").val(this.model.get("story_name"));
    $("#description").val(this.model.get("story_description"));
    // Tags are special
    story_tags = this.model.get("story_tags");
    // Clear the tag box
    _.each($("#tags").val().split(','), function(tag){$("#tags").removeTag(tag);});
    // Add the tags back
    for (t in story_tags){
      $("#tags").addTag(story_tags[t]);
    }
    // TODO: Deal with story targets
    //$("#target").val(this.model.get("story_target"));
  },

  save: function() {
    this.update();
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
