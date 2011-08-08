var BoardView = Backbone.View.extend({

  initialize : function( args ) {
    _.bindAll(this, 'state_render', 'story_render');

    this.story_called = false;
    this.state_called = false;

    this.states = args.states;
    this.stories = args.stories;
    this.trigger_func = args.trigger_func;
    this.after = args.after;

    // bind state changes
    this.states.collection.bind('refresh', this.state_render);

    // bind story changes
    this.stories.collection.bind('add', this.story_render);
    this.stories.collection.bind('refresh', this.story_render);
    this.stories.collection.bind('change', this.story_render);
    this.stories.collection.bind('remove', this.story_render);

    this.states.collection.fetch();
    this.stories.collection.fetch();
  },
  init_board: function(stories) {
    Backbone.couch.db().openDoc('instance', {
      success: function(doc) {
        document.title = doc.name + ' : Couch Kanban Board' ;
        $("#board_name").text(doc.name);
      },
      error : function() {
        document.title = app.db_name + ' : Couch Kanban Board';
        $("#board_name").text(app.db_name);
      }
    });

    var board = {};
    for ( var i=0, len=stories.length; i<len; i++ ) {
      var story = stories[i].split(",");
      var state = story[0];
      if (story.length == 3) {
        if (! board[state]) {
          board[state] = [];
        }
        board[state].push(story);
      }
    }
    return board;
  },

  create_list: function(board, state) {
    var list = $("<ul class=\"state\" id=\"" + state + "\"></ul>");
    if (board[state]) {
      for (var i=0, len=board[state].length; i<len; i++) {
        if (state == "Done") {
          var story_element = $("<li><div class=\"box box_" + state + "\">" + board[state][i][2] + "<br/><a id=\"" + board[state][i][1] + "\" class=\"archive_story\" href=\"#" + board[state][i][1] +"\">archive</a></div></li>");
        } else {
          var story_element = $("<li><div class=\"box box_" + state + "\">" + board[state][i][2] + "<br/><a class=\"edit_story\" id=\"" + board[state][i][1] + "\" href=\"#" + board[state][i][1] + "\">edit &#8883;</a></div></li>");
        }
        story_element.data("story",  board[state][i]);
        list.append(story_element);
      }
    };
    return list;
  },

  create_column: function(board, state) {
    var state_column = $("<div class=\"dp10" + ((! /Ready$/.test(state)) ? "" : " queue_column")+ "\"></div>")
    state_column.append($("<div class=\"headline\">" + state + "</div>"));
    state_column.append(this.create_list(board, state));
    state_column.data("state", state);
    return state_column;
  },

  create_board: function(app_data) {
    var table = $("<div id=\"board\"></div>");
    var ids = "";
    for (j=0; j< app_data.states.length; j++) {
      var state = app_data.states[j];
      if (state.length){
        state = state.replace(" ", "_");
        ids += "#" + state + ",";
        var state_column = this.create_column(app_data.board, state);
        table.append(state_column);
      }
    }
    ids += "#" + "Done,";
    var done_column = this.create_column(app_data.board, 'Done');
    table.append(done_column);

    $(ids, table).dragsort({ dragEnd: this.trigger_func, dragBetween: true });
    return table;
  },

  state_render: function(){
    this.state_called = true;
    if (this.story_called && this.state_called){ this.render(); };
  },

  story_render: function(){
    this.story_called = true;
    if (this.story_called && this.state_called){ this.render(); };
  },

  render: function(){
    if (this.story_called && this.state_called){
    // TODO: use the collection instead of reading the textarea
      var stories = this.stories.render() || [];
      var states = this.states.render() || [];//$("#states").text().split(", ") || [];
      var empty_board = this.init_board(stories);
      var app_data = {
        board: empty_board,
        states: states
      };
      $("#output").empty();
      $("#output").append(this.create_board(app_data));
    } else {
      $.log('render called but collections not ready');
    };
    // Call any functions that might want to be triggered once
    // rendering is complete
    _.each(this.after, function(func) {
      func();
    });
  },

  // It's possible that the render calls here will be called before the
  // collections are ready, but that should be a non-issue as the target widget
  // will take care to show the right things...
  set_target: function(target){
    this.stories.set_target(target);
    this.render();
  },

  set_tag: function(tag){
    this.stories.set_tag(tag);
    this.render();
  }
});
