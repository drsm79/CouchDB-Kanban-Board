var BoardTargetView = Backbone.View.extend({
  tagname: "select",
  template: 'Target:<select id="targets">{{#top_targets}}<option id={{name}}>{{name}}</option>{{/top_targets}}<optgroup label="----------">{{#targets}}<option id="{{name}}">{{name}}</option>{{/targets}}</optgroup></select>',
  events: {
    "change": "set_board_target"
  },
  // A view for a collection of targets - they can't be edited, don't think we need ShortTargetView
	initialize: function(options) {
	  if (!options.selector) {
	    $.log("Selector for this widget not defined");
	    return;
	  }

	  _.bindAll(this, 'render');

	  this.collection = options.collection;

    if (options.bind_collection) {
      this.collection.bind('reset', this.render);
      this.collection.bind('change', this.render);
      this.collection.bind('add', this.render);
    }

    this.selector = options.selector;
    $(this.selector).html(this.el);

    this.default_target = options.default_target;
    this.null_target = options.null_target || "All";
    this.board = options.board;

    // This fetches but doesn't fire refresh/reset
    if (options.fetch) {
      this.collection.fetch();
    } else {
      this.render();
    }
  },
  render: function() {
    var to_render = {targets: this.collection.toJSON()};
    // Remove null_target from the collection, since it'll be in the top_targets
    to_render.targets = _.reject(to_render.targets, function(item){
      return item.name === this.null_target;
    }, this);
    to_render.top_targets = [];
    if (this.null_target) {
      to_render.top_targets.push({name: this.null_target});
    }
    to_render.top_targets.push({name: 'No target'});
		var html = $(this.el).html($.mustache(this.template, to_render));
    if (this.default_target) {
      $(this.selector + " #targets").val(this.default_target);
    }
    return html;
	},
	set_board_target: function() {
	  // Change the URL (so people can copy/paste it, bookmark it) and rely on
	  // the Router to actually change the board, via the target widget
    var base_url = document.location.href.split('#')[0];
	  var new_url = base_url + "#t=" + $(this.selector + " select").val()
	  document.location.href = new_url;
	}
});
