var ShortStateView = Backbone.View.extend({
  // A view for a single story
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.model.view = this;
  },
	render: function() {
		var state = this.model;
    var colours = state.get('state_colours');
		var state_style = '#' + state.id + ' .box ';

		state_style = state_style + '{ background-color: ' + colours['background-color'];
		state_style = state_style + '; color: ' + colours.color + ';}\n';
	  $('style').append(state_style);

		return this.model.get('name') + ', ';
	}
});

var BoardStateView = Backbone.View.extend({
	// A view for a collection of stories
	initialize: function(collection) {
	  _.bindAll(this, 'addOne', 'addAll');
	  this.collection = collection;
    this.collection.bind('add',     this.addOne);
    this.collection.bind('refresh',   this.addAll);
		this.collection.bind('reset', this.addAll);
  },
	addOne: function(state) {
		var view = new ShortStateView({model: state});
		$("#states").append(view.render())
	},
	addAll: function(){
		this.collection.each(this.addOne);
	}
});
