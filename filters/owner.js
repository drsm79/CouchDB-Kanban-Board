function(doc, req)
{
  if (doc.story_owner == req.query.name) { return true; }
  if (doc.state_shortcut) { return true; }
  return false;
}