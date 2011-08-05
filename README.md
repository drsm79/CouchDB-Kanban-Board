Kanban Couch
===========================
Information about the project:
 * Project [blog](http://kanbancouch.posterous.com/)
 * Project [board](https://drsm79.cloudant.com/couch-kanban/_design/kanbancouch/index.html)
 * Project [code](https://github.com/drsm79/CouchDB-Kanban-Board/)

Installation
--------------------------
See INSTALL.md

Adding a story
--------------------------
 * Click new story in the right hand menu.
 * Fill in the form.
 * Click save - make sure you have write access to the database!

Using the board
--------------------------
 * Stories can be propagated through the various states by dragging them or by clicking edit and setting the state via the drop down.
 * Once stories are in the "Done" state you can archive them. This removes them from the board (a tidy board is a happy board) but leaves them in the database, should you need to look at them in the future.
 * You can define targets for stories (e.g. for a release) by clicking edit and choosing the target from the drop down, click "add new" to add a new state to the board. You can filter the board to show only stories for a particular target via the target drop down in the right hand menu.