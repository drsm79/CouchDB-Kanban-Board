var StateCollection = Backbone.Collection.extend({
  model : StateModel,
  url : "states",
  options : {
    reduce: false
	}
});