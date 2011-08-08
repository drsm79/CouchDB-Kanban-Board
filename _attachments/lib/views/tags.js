var TagsView = Backbone.View.extend({
	// A view for a collection of targets - they can't be edited, don't think we need ShortTargetView
	initialize: function(options) {
	  _.bindAll(this, 'render', 'sort_tags');
	  this.collection = options.collection;
    this.board_target = options.board_target;
    this.board_target.bind_to_event("change", this.render);

	  this.collection.bind('refresh', this.render);
	  this.collection.bind('change', this.render);
	  this.collection.bind('add', this.render);
	  this.collection.bind('remove', this.render);
    // This fetches but doesn't fire refresh/reset
    this.collection.fetch();
  },
  render: function() {
    $("#tag_cloud").empty();
		var data = this.collection.models;
		if (this.board_target) {
		  var sorted_data = this.sort_tags(data, this.board_target.get_current_target());
		} else {
		  var sorted_data = this.sort_tags(data, 'All');
		}
		_.each(sorted_data, function(tag) {
		  $("#tag_cloud").append('<font size="' + tag.get('size') + '"><a class="tagcloud" href="#tag=' + tag.get('name') + '">' + tag.get('name') + '</a></font> ');
		});
	},
	sort_tags: function(models, target) {
    var models_to_render = [];
    if (target == 'All') {
      // Collection is ordered by name, so lets take advantage of that
      var names = _.uniq(models.map(function(model) { return model.get('name'); }));
      var that = this;
      var summed_models = _.map(names, function(name) {
          var models_with_name = models.filter(function(model) { return model.get('name') == name; });
          var reduced = {
            name: name,
            size: _.reduce(models_with_name, function(memo, model) { return memo + model.get('size'); }, 0)
          };
          return new that.collection.model(reduced);
        }
      );
      models_to_render = summed_models;
    } else {
      models_to_render = _.select(models, function(model) {
        return (model.get('target') == target || (target == 'No target' && !model.get('target')));
      });
    }
    // Copy so original order not disrupted by in-place sort
    var models_ordered = _.map(models_to_render, function(model) { return model });
    // Sort by value and slice
    var sliced_models = models_to_render.sort(function(a, b) { return a.get('size') - b.get('size') }).reverse().slice(0, 30);
    // Get names from sorted/sliced models
    var names = _.map(sliced_models, function(model) { return model.get('name') });
    // Now get the rows in the original order
    return filtered_rows = _.select(models_ordered, function(model) { return _.include(names, model.get('name')); });
  }

});