function(doc) {
  if (doc.state_name){
     emit(doc.state_position, doc.state_shortcut + ',' + doc.state_name);
  }
}