function(event, id, state) {
  var app = $$($(this)).app;
  app.db.openDoc(id, {
    success : function(doc) {
      doc.story_state = state;
      app.db.saveDoc(doc, {
        success : function(meta) {
          // Currently do nothing
        },
        error : function(code) {
          alert(code + " error saving doc with id " + doc_id);
        }
      });
    },
    error : function(code) {
      alert(code + " error opening doc with id " + doc_id);
    }
  });
}