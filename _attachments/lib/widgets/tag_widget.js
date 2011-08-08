var tagWidget = {
  initialise : function(options) {
    options.collection = new TagsCollection;
    var tagsView = new TagsView(options);

    var operations = {
      add_tag: function(tag, target) {
        var current_tag = tagsView.collection.filter(function(model) {
           return (model.get('name') == tag && model.get('target') == target)
        })[0];
        if (current_tag) {
          current_tag.set({size: current_tag.get('size') + 1});
        } else {
          tagsView.collection.add(new tagsView.collection.model({name: tag, size: 1, target: target}));
        }
      },
      remove_tag: function(tag, target) {
        var current_tag = tagsView.collection.filter(function(model) { return (model.get('name') == tag && model.get('target') == target)})[0];
        if (current_tag) {
          if (current_tag.get('size') > 1) {
            current_tag.set({size: current_tag.get('size') - 1})
          } else {
            tagsView.collection.remove(current_tag);
          }
        }
      }
    };

    $.widgets.tags = operations;
  }
};