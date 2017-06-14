(function($) {
  'use strict';

  $(function() {
    var $textarea = $('#fa-generated-message');
    var $title = $('#fa-generated-title');
    var $form = $('#fa-generated-form');

    $form.on('submit', function(event) {
      
      if ($textarea.length === 0) {
        event.preventDefault();
        alert('Tente novamente!');
        return false;
      }

      event.preventDefault();

      $textarea.val($textarea.val().replace(/\{\{campo(\d+)\}\}/gi, function(text, match) {
        return $('#campo' + match).val();
      }));

      $title.val($title.val().replace(/\{\{campo(\d+)\}\}/gi, function(text, match) {
        return $('#campo' + match).val();
      }));
    });
  });
}(jQuery));
