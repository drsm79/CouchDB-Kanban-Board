var targetWidget = {
  initialise: function(options) {
    options.collection = new TargetCollection;
    var targetView = new BoardTargetView(options);

    operations = {
      get_current_target: function() {
    	  return $(targetView.selector +  " select").val();
    	},
    	add_target: function(target) {
    	  if (!targetView.collection.some(function(model) { return model.toJSON().name == target })) {
    	    targetView.default_target = target;
    	    targetView.collection.add({name: target});
    	  }
    	}
    };

    if (!options.local) {
      // Bind to the global jQuery namespace
      $.widgets.target = operations;
    } else {
      // Return it to the calling code which will use it in its local namespace
      return operations;
    }
  }
};