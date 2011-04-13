function(doc) {
  if (doc.story_state){
     emit(doc.story_target, doc.story_state + ',' + doc._id + ',' + doc.story_name);
  }
}