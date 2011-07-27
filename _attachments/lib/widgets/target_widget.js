var targetWidget = {
  initialise: function(options) {
    options.collection = new TargetCollection;
    var targetView = new BoardTargetView(options);

    operations = {
      get_current_target: function() {
    	  return $(targetView.selector +  " select").val();
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