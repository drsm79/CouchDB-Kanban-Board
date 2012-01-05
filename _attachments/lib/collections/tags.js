var TagsCollection = Backbone.Collection.extend({
  model : TagModel,
  url : "tag-cloud",
  doreduce: true,
  group: true,
  group_level: 2,
  success: function( result ) {
    var models = [];
    _.each( result.rows, function( row ) {
      var model = {name: row.key[1], size: row.value, target: row.key[0]};
      if ( !model.id ) { model.id = row.id }
      models.push( model );
    });
    // if no result then should result null
    if ( models.length == 0 ) { models = null }
    return models;
  },
	comparator: function(tag) {
    return tag.get("name");
  }
});