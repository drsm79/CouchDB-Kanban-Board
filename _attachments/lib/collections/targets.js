var sort_targets = function(rows) {
  // Convert numerical strings to numbers in the sort
  // so that numbers and strings are separate
  var sorted = _.sortBy(rows, function(value) {
    var numerical = value * 1;
    if (numerical == NaN) {
      return value;
    } else {
      return numerical;
    }
  });
  return sorted.reverse();
}

var TargetCollection = Backbone.Collection.extend({
  model : TargetModel,
  url : "targets",
  options : {
    group_level: 1,
    success: function( result ) {
      var models = [];
      _.each( sort_targets(result.rows), function( row ) {
        if (row.key != "No target") { // Discard "No target" state
          var model = {name: row.key};
          if ( !model.id ) { model.id = row.id }
          models.push( model );
        }
      });
      return models;
    }
	}
});