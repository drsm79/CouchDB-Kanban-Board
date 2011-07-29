var TargetCollection = Backbone.Collection.extend({
  model : TargetModel,
  url : "targets",
  options : {
    group: true,
    success: function( result ) {
      var models = [];
      _.each( result.rows, function( row ) {
        if (row.key != "No target") { // Discard "No target" state
          var model = {name: row.key};
          if ( !model.id ) { model.id = row.id }
          models.push( model );
        }
      });
      return models;
    }
	},
	comparator: function(target) {
    return target.get("name");
  }
});