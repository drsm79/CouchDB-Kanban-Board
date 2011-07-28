function(doc) {
  if (doc.story_target){
    emit(doc.story_target, 1);
  } else {
    // Only emit "No target" for documents that are stories
    if (doc.story_name) {
      emit("No target", 1);
    }
  }
};