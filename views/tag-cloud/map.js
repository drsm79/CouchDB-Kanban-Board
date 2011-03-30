function(doc) {
  if (doc.story_tags){
    for (t in doc.story_tags){
      emit(doc.story_tags[t], 1);
    }
  }
};