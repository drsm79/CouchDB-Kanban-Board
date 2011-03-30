function(doc) {
  if (doc.story_state){
     emit(null, doc.story_state + ',' + doc._id + ',' + doc.story_name);
  }
}