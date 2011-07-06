var StateModel = Backbone.Model.extend({
  initialize: function(spec) {
    // A state looks like:
    //
    //{"name":"New",
    // "id":"New",
    // "colours":{"color":"#ffffff","background-color":"#A5C700"}}

    this.set({name: ""});
    this.set({id: ""});
    this.set({colours: {}});
  }
});