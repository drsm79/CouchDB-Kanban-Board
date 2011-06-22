Kanban Couch Installation
===========================

Dependencies
--------------------------

### CouchDB

### CouchApp

Pushing the application
--------------------------

Adding states
--------------------------
> *Note* this is probably the most sucky part of Kanban Couch. It's very
> flexible but it's annoying to set up. Patches welcome via github.

Before you can use the Kanban board you need to decide which states your
stories can go through.


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