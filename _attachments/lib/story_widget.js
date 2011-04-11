var storyWidget = function(app) {
  var storyId = app.req.query.story;
  var changesFeed = null;

  var StoryModel = Backbone.Model.extend({
    EMPTY: "Enter text for your new story here...",
    initialize: function() {
      if (!this.get("story_description")) {
        this.set({"story_description": this.EMPTY});
      }
    }
  });

  var storyModel = new StoryModel({"id": storyId});

  var StoryView = Backbone.View.extend({
    tagName: "div",
    events: {
      "click #save": "save",
      "click a.delete": "deleteTag",
      "click a.new": "newTag",
      "change #story_description": "update"
    },
    template: app.ddoc.templates.story,
    dirty: false,
    initialize: function() {
      _.bindAll(this, "render", "save", "update", "deleteTag", "newTag");
      this.model.bind("change", this.render);
      this.model.view = this;
      $("#story").html(this.el);
    },
    render: function() {
      var html = $(this.el).html($.mustache(this.template, this.model.toJSON()));
      if (this.isDirty()) {
        this.$("#story_name").removeClass("box");
        this.$("#story_name").addClass("dirty");
        this.$("#save").removeAttr("disabled");
      } else {
        this.$("#story_name").removeClass("dirty");
        this.$("#story_name").addClass("box");
        this.$("#save").attr("disabled", "disabled");
      }
      return html;
    },
    save: function() {
      this.model.save();
    },
    update: function() {
      this.model.set({story_description: $("#story_description").val()});
    },
    isDirty: function() {
      // Has the view changed (we tolerate some changes to the model without updating the view)
      var changedAttributes = this.model.changedAttributes();
      if (!changedAttributes || "_id" in changedAttributes) { // If no attributes change, or if _id has changed (new doc) then we're clean
        this.dirty = false;
        return this.dirty;
      }
      var ignore = {"_rev": null, "story_state": null};
      var keys = [];
      for (var key in changedAttributes) {
        if (changedAttributes.hasOwnProperty(key)) {
          if (!(key in ignore)) {
            this.dirty = true;
            return this.dirty;
          } else {
            keys.push(key);
          }
        }
      }
      if (keys.length == 1 && keys[0] == "_rev") { // Doc update so we're clean
        this.dirty = false;
        return this.dirty;
      }
      return this.dirty;
    },
    deleteTag: function(event) {
      event.preventDefault();
      var toDelete = ($(event.target).attr("href").slice(1));
      var newTags = [];
      for (var i in this.model.attributes.story_tags) {
        if (this.model.attributes.story_tags[i] != toDelete) {
          newTags.push(this.model.attributes.story_tags[i]);
        }
      }
      this.model.set({story_tags: newTags});
    },
    newTag: function(event) {
      event.preventDefault();
      if ($.trim($("#new_tag").val()).length == 0) {
        alert("You can't create empty tags.");
        return;
      }
      var newTags = this.model.attributes.story_tags.slice();
      newTags.push($("#new_tag").val());
      this.model.set({story_tags: newTags});
    }
  });

  var storyView = new StoryView({model: storyModel});

  var handleChangedStory = function(newStoryId) {
    if (newStoryId == storyModel.attributes.id) {
      Backbone.couch.db().openDoc(newStoryId, {
        success: function(doc) {
          var changedValues = getChangedValues(storyModel.attributes, doc);
          var rejects = null;
          for (var value in changedValues) {
            if (changedValues.hasOwnProperty(value)) {
              if (value != "story_state" && value != "story_owner" && value != "_rev") {
                var useNew = confirm("Story property " + value + " has been changed.\n" +
                    "Your version: " + JSON.stringify(storyModel.attributes[value]) + "\n" +
                    "New version: " + JSON.stringify(doc[value]) + "\n" +
                    "Use new version?");
                if (!useNew) {
                  rejects = true;
                  doc[value] = storyModel.attributes[value];
                } else if (!rejects) {
                  rejects = false;
                }
              }
            }
          }
          if (rejects != null && !rejects) {  // If everything was accepted then user has discarded all local changes - just start over
            storyModel.clear();
            storyModel.fetch();
          } else {
            storyModel.set(doc);  // Even if we have no locally accepted changes, we still need to update the model to get the new _rev
          }
        }
      });
    }
  };

  var getChangedValues = function(doc1, doc2) {
    var changedValues = {};
    for (var item in doc2) {
      if (doc2.hasOwnProperty(item)) {
        if (JSON.stringify(doc1[item]) != JSON.stringify(doc2[item])) {
          changedValues[item] = [doc1[item], doc2[item]];
        }
      }
    }
    return changedValues;
  };

  // Set up couchdb-backbone connector
  Backbone.couch.databaseName = app.db.name;
	Backbone.couch.ddocName = app.ddoc._id.slice(8);
	Backbone.couch.enableChangeFeed = true;
	Backbone.couch.docChange(handleChangedStory);

  storyModel.fetch();
};

(function($) {
  $.widgets = $.widgets || {}
  $.widgets.story = storyWidget;
})(jQuery);