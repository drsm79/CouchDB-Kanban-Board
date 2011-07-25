var TargetCollection = Backbone.Collection.extend({
  model : TargetModel,
  url : "targets",
  options : {
    group_level: 1,
    success: function( result ) {
      var models = [];
      _.each( result.rows, function( row ) {
        var model = {name: row.key};
        if ( !model.id ) { model.id = row.id }
        models.push( model );
      });
      // if no result then should result null
      if ( models.length == 0 ) { models = null }
      return models;
    }
	}
});