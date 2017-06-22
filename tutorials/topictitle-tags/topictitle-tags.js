/**
 *! Criar tags no título dos tópicos com painel de seleção.
 *
 *  @author Luiz~
 *  @see <a href="http://ajuda.forumeiros.com">Fórum dos Fóruns</a>
 *  @licence MIT
 */
(function ($) {
  'use strict';

  var tags = [
    {
      tag: 'imagem',
      background: '#666'
    },
    {
      tag: 'widget',
      background: '#000'
    }
  ];

  $(function () {
    var counter = 1;

    /**
     * Parte 1.
     * Aqui nós criamos o seletor de tags acima do editor:
     */
    if (location.pathname === '/post' && $('form input[name="subject"]').length > 0) {
      // Criar a zona para colocar-se os inputs:
      var $textarea = $('#textarea_content');
      var $title = $('form [name="subject"]');
      var $zone = $([
        '<div class="fa-icon-selector">',
        '  <div class="fa-icon-selector-inner">',
        '  </div>',
        '</div>',
      ].join('\n'))
        .prependTo($textarea)
      ;

      // Criar-se os inputs dentro da zona criada anteriormente:
      var $appendZone = $zone.find('.fa-icon-selector-inner');
      $.each(tags, function (index, tag) {
        $([
          '<div class="fa-tag-form-group">',
          '  <input type="radio" class="select-tag-input" name="select-tag-radio" id="tag-input-' + counter + '" data-tag="' + tag.tag + '" />',
          '  <label for="tag-input-' + counter + '" class="fa-tag-label">' + tag.tag + '</label>',
          '</div>',
        ].join('\n'))
          .appendTo($appendZone)
        ;
        
        counter++;
      });

      // Função para dar focus num input X caso este seja a tag dum tópico X:
      if (/^\[.*\]/gi.test($title.val())) {
        $title.val().replace(/^\[(.*)\]/gi, function (find, match) {
          $('[data-tag="' + match + '"]').prop('checked', true);
        });
      }

      // Trigger para a adição/edição do prefixo no input de título:
      $zone
        .find('input.select-tag-input')
          .on('focus', function () {
            setPrefix($(this).attr('data-tag'));
          })
      ;

      // Função para setar/editar o prefixo:
      var setPrefix = function (prefix) {

        if (/^\[.*\]/gi.test($title.val())) {
          $title.val($title.val().replace(/^\[.*\]/gi, function () {
            return '[' + prefix + ']';
          }));
          
          return;
        }
        
        $title.val('[' + prefix + '] ' + $title.val().trim());
      };
    }

    /**
     * Parte 2.
     * Aqui nós iremos substituir a tag entre os colchetes por uma tag real:
     */
    var $link = $('a[href^="/t"]');
    $link.each(function () {

      var $this = $(this);

      $.each(tags, function (index, tag) {
        var regex = new RegExp ('\\[' + tag.tag + '\\]', 'gim');
        var text = $this.text();

        if (!regex.test(text)) {
          return;
        }

        $this.addClass('fa-tagged-link');
        $this.text(text.trim().replace(regex, ''));
        $this.prepend('<span class="fa-topic-tag" style="background-color: ' + tag.background + ';">' + tag.tag + '</span>');
      });
    });

    /**
     * Parte 3:
     * Estilos.
     */
    var styles = [
      '.fa-icon-selector-inner strong {',
      '  display: block;',
      '  margin-bottom: 4px;',
      '  font-weight: bold;',
      '}',
      '',
      '.fa-icon-selector .fa-tag-form-group {',
      '  display: inline-block;',
      '  margin-right: 15px;',
      '  margin-top: 4px;',
      '}',
      '',
      '.fa-tagged-link {',
      '  text-decoration: none !important;',
      '}',
      '',
      '.fa-tagged-link:hover {',
      '  color: #f73 !important;',
      '  text-decoration: none !important;',
      '}',
      '',
      'span.fa-topic-tag {',
      '  color: #fff;',
      '  background-color: #39c;',
      '  padding: 1px 5px;',
      '  border-radius: 3px;',
      '  margin-right: 4px;',
      '  display: inline;',
      '  text-decoration: none!important',
      '}'
    ].join('\n');

    $(['<style type="text/css">', styles, '</style>'].join('\n')).appendTo('head');
    
  });
}(jQuery));
