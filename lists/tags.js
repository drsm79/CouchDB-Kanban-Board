// turn the tags view into a plain list of tags.
function(head, req) {
  start({
      "headers": {
          "Content-Type": "text/plain"
      }
  });
  while(row = getRow()) {
    send(row.key[1] + " ");
  }
}