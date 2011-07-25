function(doc) {
  if (doc.story_state && doc.story_state != 'Archived'){
     emit(doc.story_target, {story_state: doc.story_state, _id: doc._id, story_name: doc.story_name});
  }
}