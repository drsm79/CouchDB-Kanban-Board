Kanban Couch Installation
===========================

Dependencies
--------------------------

### CouchDB

### CouchApp

Pushing the application
--------------------------
A normal couchapp push should do the trick.

Adding states
--------------------------
> *Note* this is probably the most sucky part of Kanban Couch. It's very
> flexible but it's annoying to set up, and edit. Patches welcome via github.

Before you can use the Kanban board you need to decide which states your
stories can go through. There are some default states in \_docs which set up a
reasonable list of states stories can progress through. These states are:
 * New
 * Devel_Ready
 * Development
 * Test_Ready
 * Test
 * Deploy_Ready
 * Deployment
 * Int_Ready
 * Integrating
 * Done _(this is added automatically)_

If you'd like different states edit or add to these documents. The document
structure is simple:

	{
		"_id": "New",
		"state_colours": {
			"color": "#ffffff", "background-color": "#A5C700"
		},
		"state_position": 1,
		"state_shortcut": "DR"
	}

But it is important that state\_position is set appropriately.

Miscellany
--------------------------

### How to name your board

By default your boards name will be the same as the CouchDB database. If you'd
like to give it something a bit more descriptive you can create a document in
the database called instance. The document should have a single field (other
than the required <pre>\_rev</pre> and <pre>\_id</pre> fields) called<pre>name</pre>.
For example:

<pre>
  {
     "_id": "instance",
     "_rev": "1-a4ae8f743b61b55478b1b80595af86a8",
     "name": "My project"
  }
</pre>

Will result in a Kanban board titled "My project", regardless of the name of
the database.