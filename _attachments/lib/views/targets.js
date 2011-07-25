var BoardTargetView = Backbone.View.extend({
  tagname: "select",
  template: 'Target:<select id="targets"><option selected="selected">{{null_target}}</option>{{#targets}}<option id="{{name}}">{{name}}</option>{{/targets}}</select>',
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

	  this.collection.bind('refresh', this.render);
	  this.collection.bind('reset', this.render);
	  this.collection.bind('change', this.render);
	  this.collection.bind('add', this.render);
    // This fetches but doesn't fire refresh/reset
    this.collection.fetch();

    this.selector = options.selector;
    $(this.selector).html(this.el);

    this.default_target = options.default_target;
    this.null_target = options.null_target || "All";
    this.board = options.board;
  },
  render: function() {
		var html = $(this.el).html($.mustache(this.template, {null_target: this.null_target, targets: this.collection.toJSON()}));
    if (this.default_target) {
      $(this.selector + " #targets").val(this.default_target);
    }
    return html;
	},
	set_board_target: function() {
	  if (this.board) {
	    this.board.set_target($(this.selector + " select").val());
	  }
	}
});
