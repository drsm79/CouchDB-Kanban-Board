function(doc) {
  if (doc.state_position){
     emit(doc.state_position, {name:doc._id, id:doc._id.replace(" ", ""), colours: doc.state_colours});
  }
}