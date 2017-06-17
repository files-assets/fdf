/*
 * @author Luiz~
 */
(function ($) {
  'use strict';

  var ajaxPostingConfig = {
    'minForPost': 15,
    'maxForPost': 15000
  };

  var ajaxPostingStyles = [
    '.ajax-alert {',
    '  width: 70%;',
    '  text-align: center;',
    '  margin: 20px auto;',
    '  color: #555;',
    '  background-color: transparent;',
    '  border: solid 1px #ddd;',
    '  border-bottom-width: 2px;',
    '  border-radius: 3px;',
    '  padding: 12px;',
    '  font-weight: 600;',
    '}',
    '',
    '.ajax-alert.ajax-alert-sucess {',
    '  border-color: #71be47!important;',
    '  color: #71be47!important;',
    '  box-shadow: inset 0 0 80px rgba(113, 190, 71, 0.3);',
    '}',
    '',
    '.ajax-alert.ajax-alert-danger {',
    '  color: #e6594c!important;',
    '  border-color: #e6594c!important;',
    '  box-shadow: inset 0 0 0 80px rgba(226, 99, 88, 0.15);',
    '}',
  ].join('\n');

  $(function () {

    var $postingResult = $([
      '<div class="posting-results">',
      '</div>',
    ].join('\n'))
      .insertBefore('div#textarea_content')
    ;

    $('<style>', {
      type: 'text/css',
      text: ajaxPostingStyles
    }).appendTo('head');

    $('form#quick_reply')
      .on('submit', function (event) {

        if ($('textarea').sceditor('instance').val().length < ajaxPostingConfig.minForPost) {
          $postingResult
            .html([
              '<div class="ajax-alert ajax-alert-danger">',
              '  <div class="fa fa-exclamation-circle"></div>',
              '  <span>Para postar, sua mensagem deve ter no mínimo ' + ajaxPostingConfig.minForPost + ' caracteres.</span>',
              '</div>',
            ].join('\n'))
          ;
          return false;
        }

        if ($('textarea').sceditor('instance').val().length > ajaxPostingConfig.maxForPost) {
          $postingResult
            .html([
              '<div class="ajax-alert ajax-alert-danger">',
              '  <div class="fa fa-exclamation-circle"></div>',
              '  <span>Sua mensagem possui mais que o limite de caracteres (' + ajaxPostingConfig.maxForPost + ') para a postagem.</span>',
              '</div>',
            ].join('\n'))
          ;
          return false;
        }

        $.ajax({

          type: 'POST',
          url: '/post',

          data: {
            t: location.pathname.replace(/^\/t(\d+)-.*/gi, '$1'),
            mode: 'reply',
            tid: $('[name="tid"]').val(),
            post: 1,
            message: $('textarea').sceditor('instance').val(),
          },

          beforeSendo: function(context) {
            $postingResult
              .html([
              '<div class="ajax-alert ajax-alert-loading">',
                '  <div class="fa fa-circle-o-notch fa-spin"></div>',
                '  <span>Carregando...</span>',
                '</div>',
              ].join('\n'))
            ;
          },

          success: function(context) {

            var $link = $('a[href*="/viewtopic"]');

            $.get($link.attr('href'), function(context) {
              var $post = $('.post:last', context);
              $post
                .hide()
                  .insertAfter('.post:last')
                    .slideDown('fast', function() {
                      $('html, body').animate({
                          scrollTop: $('.post:last').offset().top
                      }, 500);
              });
            });

            // Adicionar alerta:
            $postingResult
              .html([
              '<div class="ajax-alert ajax-alert-sucess">',
                '  <div class="fa fa-check"></div>',
                '  <span>Mensagem postada com sucesso!</span>',
                '</div>',
              ].join('\n'))
            ;

            // Remover conteúdo do SCEditor:
            $('textarea').sceditor('instance').val('');

            console.info('[Postar em Ajax] {SUCESSO} ID do tópico onde fora postado o novo tópico: ' + location.pathname.replace(/^\/t(\d+)-.*/gi, '$1'));

          },

          fail: function(context) {
            $postingResult
              .html([
              '<div class="ajax-alert ajax-alert-danger">',
                '  <div class="fa fa-exclamation-circle"></div>',
                '  <span>Ocorreu um erro ao tentar postar sua mensagem. Tente esperar 10 segundos.</span>',
                '  <br />',
                '  <span>Caso o problema persista, acesse o Fórum dos Fóruns, e solicite ajuda.</span>',
                '</div>',
              ].join('\n'))
            ;
          },
        });

        event.preventDefault();

      })
    ;
  });
}(jQuery));
