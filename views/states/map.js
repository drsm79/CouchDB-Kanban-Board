function(doc) {
  if (doc.state_name){
     emit(doc.state_position, {shortcut:doc.state_shortcut, name:doc.state_name, colours: doc.state_colours});
  }
}