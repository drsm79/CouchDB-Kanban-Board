var tagWidget = {
  initialise : function() {
    $.widgets.tags = tagsView = new TagsView(new TagsCollection);
  }
};