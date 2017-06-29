/**
 * Make your radio and checkbox inputs more fancy! ^-^
 *
 * @author Luiz~
 * @author Kyo Panda
 *
 * @version 2.1
 * @see <a href="http://ajuda.forumeiros.com/">Fórum dos Fóruns</a>
 * @licence MIT
 */
(function ($) {
  'use strict';
 
  /*
   * Main Styles.
   * You can also put this in your CSS, if you want.
   */
  var faCustonInputStyles = [
    '.fa-custom-label {',
    '  position: relative',
    '}',
    '',
    '.fa-custom-label input {',
    '  position: absolute;',
    '  opacity: 0;',
    '}',
    '',
    '.fa-custom-label.fa-label-checkbox input:checked ~ span.fa-input-icon i::before {',
    '  content: "\\f14a";',
    '}',
    '',
    '.fa-custom-label.fa-label-radio input:checked ~ span.fa-input-icon i::before {',
    '  content: "\\f058";',
    '}',
    '',
    '.fa-custom-label span.fa-input-icon i {',
    '  -moz-transition: all linear .075s;',
    '  -ms-transition: all linear .075s;',
    '  -o-transition: all linear .075s;',
    '  -webkit-transition: all linear .075s;',
    '  transition: all linear .075s;',
    '  -moz-transform: scale(1);',
    '  -ms-transform: scale(1);',
    '  -o-transform: scale(1);',
    '  -webkit-transform: scale(1);',
    '  transform: scale(1);',
    '}',
    '',
    '.fa-custom-label input:checked ~ span.fa-input-icon i {',
    '  -moz-transform: scale(1.2);',
    '  -ms-transform: scale(1.2);',
    '  -o-transform: scale(1.2);',
    '  -webkit-transform: scale(1.2);',
    '  transform: scale(1.2);',
    '}',
  ].join('\n');
 
  $(function () {
 
    /*
     * "Put" the styles on <head>:
     */
    $('<style>', {
      type: 'text/css',
      text: faCustonInputStyles,
    }).appendTo('head');
 
    /*
     * For checkbox input types:
     */
    $('input[type="checkbox"]').each(function () {
        
      var $this = $(this);
         
      var $label = $([
        '<label class="fa-custom-label fa-label-checkbox">',
        '   <span class="fa-input-icon">',
        '     <i class="fa fa-square-o"></i>',
        '   </span>',
        '</label>',
      ].join('\n'))
        .insertAfter($this)
      ;
 
      $this.prependTo($label); 
         
    });
 
    /*
     * For radio input types:
     */
    $('input[type="radio"]').each(function () {
        
      var $this = $(this);
         
      var $label = $([
        '<label class="fa-custom-label fa-label-radio">',
        '   <span class="fa-input-icon">',
        '     <i class="fa fa-circle-thin"></i>',
        '   </span>',
        '</label>',
      ].join('\n'))
        .insertAfter($this)
      ;
 
      $this.prependTo($label); 
         
    });
  });
}(jQuery));
