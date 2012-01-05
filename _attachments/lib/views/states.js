var BoardStateView = Backbone.View.extend({
	// A view for a collection of stories
	initialize: function(collection) {
	  _.bindAll(this, 'render');
	  this.collection = collection;
    this.collection.bind('add',     this.render);
    this.collection.bind('reset',   this.render);
  },
  render: function() {
    var output = [];
	  this.collection.forEach(function(model) {
	    // TODO The setting of style here is a bit side-effect-y
      var colours = model.get('state_colours');
      var state_style = '#' + model.get('id') + ' .box ';
      state_style = state_style + '{ background-color: ' + colours['background-color'];
      state_style = state_style + '; color: ' + colours.color + ';}\n';
      $('style').append(state_style);

      output.push(model.get('name'));
    });
    return output;
  }
});
