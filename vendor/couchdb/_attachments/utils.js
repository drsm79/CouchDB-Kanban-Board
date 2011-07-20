(function($) {
  $.couch = $.couch || {};
  $.couch.utils = $.couch.utils || {};

  $.extend($.couch.utils, {
    getAppInfo: function() {
		  var url = unescape(document.location.href).split('/');
		  return {db_name: url[3], ddoc: url[5]};
	  }
  })

})(jQuery);