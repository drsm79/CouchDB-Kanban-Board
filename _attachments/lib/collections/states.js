var StateCollection = Backbone.Collection.extend({
  model : StateModel,
  url : "states?reduce=false"
});