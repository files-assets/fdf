(function ($) {
	'use strict';
		
	$(function () {
		var $textarea = $('#fa-generated-message');
		var $title = $('#fa-generated-title');
  	var $form = $('#fa-generated-form');
  
  	$btn.on('submit', function (event) {
			
			event.preventDefault();
    
    	$textarea.val($textarea.val().replace(/\{\{field(\d+)\}\}/gi, function (text, match) {
      	return $('#campo' + match).val();
    	}));
			
    	$title.val($title.val().replace(/\{\{field(\d+)\}\}/gi, function (text, match) {
      	return $('#campo' + match).val();
    	}));
  	});
	});
}(jQuery));
