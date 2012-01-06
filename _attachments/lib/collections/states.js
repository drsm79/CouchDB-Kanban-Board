var StateCollection = Backbone.Collection.extend({
  model : StateModel,
  url : "states",
  doreduce: false
});