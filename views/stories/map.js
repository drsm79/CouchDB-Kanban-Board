function(doc) {
  if (doc.story_state && doc.story_state != 'Archived'){
     var key = doc.story_target;
     if (!key) {
       key = "No target";
     }
     emit(key, {story_state: doc.story_state, story_target:doc.story_target, _id: doc._id, story_name: doc.story_name});
  }
}