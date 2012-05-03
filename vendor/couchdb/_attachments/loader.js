
function load_couchdb(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

load_couchdb([
  "/_utils/script/sha1.js",
  "/_utils/script/json2.js",
  "/_utils/script/jquery.js",
  "/_utils/script/jquery.dialog.js",
  "vendor/couchdb/jquery.couch.js",
  "vendor/couchdb/utils.js",
/*
  "vendor/couchapp/jquery.couch.app.js",
  "vendor/couchapp/jquery.couch.app.util.js",
  "vendor/couchapp/jquery.mustache.js",
  "vendor/couchapp/jquery.evently.js",
*/
  "vendor/jqueryui/jquery.selectBox.js",
  "vendor/jqueryui/jquery.tagsinput.js",
  "vendor/jqueryui/jquery-ui-1.8.11.custom.min.js",
  "vendor/jquery.utils/jquery.utils.js"
])