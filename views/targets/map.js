function(doc) {
  if (doc.story_target){
    emit(doc.story_target, 1);
  } else {
    emit("No target", 1);
  }
};