function(doc) {
  if (doc.state_position){
     emit(doc.state_position, doc);
  }
}