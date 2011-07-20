// from http://happygiraffe.net/blog/2007/09/26/jquery-logging/
jQuery.fn.log = function(m) {
 if (window && window.console && window.console.log) {
   window.console.log(arguments.length == 1 ? m : arguments);
 }
};

$.log = jQuery.fn.log;