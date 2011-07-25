var targetWidget = {
  initialise: function(options) {
    options.collection = new TargetCollection;
    var targetView = new BoardTargetView(options);
    return {
      get_current_target: function() {
    	  return $(targetView.selector +  " select").val();
    	}
    }
  }
};