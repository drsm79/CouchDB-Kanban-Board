function(doc) {
  if (doc.story_state){emit (doc.story_state, 1)};
  if (doc.state_position) {emit (doc._id, 0)}
}