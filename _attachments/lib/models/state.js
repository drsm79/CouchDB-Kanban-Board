var StateModel = Backbone.Model.extend({
  initialize: function(state) {
    var name = "";
    if (state.id){
      var name = state.id.replace('_', ' ');
    }

    this.set({
      _id: state.id || undefined,
      _rev: state._rev || undefined,
      name: name,
      state_position: state.state_position || -1,
      state_shortcut: state.state_shortcut || "",
      state_colours: state.state_colours || {}
    });
  }
});