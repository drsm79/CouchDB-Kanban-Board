function(doc) {
  if (doc.story_tags){
    for (t in doc.story_tags){
      emit([doc.story_target, doc.story_tags[t].toLowerCase()], 1);
    }
  }
};