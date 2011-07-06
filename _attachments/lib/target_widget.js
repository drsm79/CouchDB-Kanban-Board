var targetWidget = function(app) {
  var defaultTarget = app.req.query.target;
  var ddocName = app.ddoc._id.slice(8); // TODO: brittle
  var changesFeed = null;

  var TargetModel = Backbone.Model.extend({
    sync: function(method, model, success, error) {
      if (method == "read") {
        app.db.view(ddocName + "/" + "stories", {
          reduce: true,
          group: true,
          descending: false,
          success: function(results) {
            var targets = [];
            for (var i in results.rows) {
              targets.push(results.rows[i].key);
            }
            targetModel.set({"targets": targets});
            targetView.refreshBoard();
          }
        });
      }
      if (!changesFeed) {
        app.db.info({
          include_docs: true,
          success: function(data) {
            var since = (data.update_seq || 0);
            changesFeed = app.db.changes(since, {include_docs: false});
            changesFeed.onChange(function(changes) {
              targetModel.fetch(); // We could be clever here and only fetch if there are changes for the selected target. But not today.
            });
          }
        });
      }
    }
  })

  var targetModel = new TargetModel();

  var TargetView = Backbone.View.extend({
    tagname: "select",
    events: {
      "change": "refreshBoard"
    },
    template: app.ddoc.templates.targets,
    initialize: function() {
      _.bindAll(this, "render", "refreshBoard");
      this.model.bind("change", this.render);
      this.model.view = this;
      $("#target").html(this.el);
    },
    render: function() {
      var html = $(this.el).html($.mustache(this.template, this.model.toJSON()));
      if (defaultTarget) {
        $("#targets").val(defaultTarget);
      }
      return html;
    },
    refreshBoard: function() {
      if ($("#target select").val() == "All"){
        $("#stories").trigger("update_stories");
        $("#tag_cloud").trigger("update_tag_cloud");
      } else {
        $("#stories").trigger("update_stories", $("#target select").val());
        $("#tag_cloud").trigger("update_tag_cloud", $("#target select").val());
      }
    }
  });

  var targetView = new TargetView({model: targetModel});
  targetModel.fetch();
};

(function($) {
  $.widgets = $.widgets || {}
  $.widgets.target = targetWidget;
})(jQuery);