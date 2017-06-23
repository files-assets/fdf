/**
 *! Em fase de desenvolvimento!
 *! Modificação nas notificações.
 *
 *  @author Luiz~
 *  @see <a href="http://ajuda.forumeiros.com">Fórum dos Fóruns</a>
 *  @licence MIT
 */
(function ($) {
  'use strict';

  var config = {
    max: 7,
    error: [
      'Houve um erro ao tentar carregar as notificações.',
      'Caso o problema continue, contate o suporte técnico.'
    ].join('\n')
  };

  // .mod-text

  $(function () {

    var $faNotifyTrigger = $('<a>', {
      href: 'javascript:void(0)',
      id: 'fa-custom-notification-trigger',
      class: 'fa fa-bell'
    })
      .insertAfter('#fa_notifications')
        .on('click', function (event) {
          event.stopPropagation();
          $faNotifyContent.toggleClass('hidden');
        })
    ;

    $('#fa_notifications').attr('style', 'display: none !important');
    $(document).on('click', function () {
      if ($('.fa-notify-wrapper').is('.hidden')) {
        return;
      }

      $('.fa-notify-wrapper').toggleClass('hidden');
    });

    var $faNotifyContent = $([
      '<div class="fa-notify-wrapper hidden">',
      '  <header class="fa-notify-header">',
      '    <h4>Notificações</h4>',
      '    <a href="/profile?mode=editprofile&page_profil=notifications">Ver Todas & Configurações</a>',
      '  </header>',
      '  <div class="fa-notify-inner">',
      '    <div class="fa-notify-list">',
      '      <span class="fa-notify-loading">Carregando...</span>',
      '    </div>',
      '    <div class="fa-notify-date">',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'))
      .appendTo('body')
        .on('click', function (event) {
          event.stopPropagation();
        })
    ;

    $.get('/profile', {
      mode: 'editprofile',
      page_profil: 'notifications'
    })
      .done(function (context) {

        var $wrap = $('[name="notif_list"]', context);
        var $item = $wrap.find('table tr td:first-child');

        $item.each(function () {

          var $this = $(this);
          var $row = $(this).parent('tr');

          var text = $this.html();

          $('.fa-notify-loading').hide();

          if ($row.index() < config.max) {
            $faNotifyContent
              .find('.fa-notify-list')
                .append([
                  '<div class="notify-item">',
                  '  ' + text,
                  '</div>'
                ].join('\n'))
            ;
          }

        });

      })
      .fail(function () {
        console.warn(config.error);
      })
    ;

    var styles = [
      '.hidden {',
      '  display: none;',
      '}',
      '',
      'a#fa-custom-notification-trigger {',
      ' color: #666!important;',
      '  background-color: #fff;',
      '  font-size: 17px;',
      '  margin-top: 3px;',
      '  margin-left: 19px;',
      '  border-radius: 3px;',
      '  padding: 2px;',
      '}',
      '',
      'a#fa-custom-notification-trigger:hover {',
      '  text-decoration: none;',
      '  background-color: #39c;',
      '  color: #fff!important;',
      '}',
      '',
      '.fa-notify-wrapper {',
      '  position: fixed;',
      '  top: 45px;',
      '  z-index: 9999;',
      '  right: 25px;',
      '  background-color: #fff;',
      '  border: solid 1px #ddd;',
      '  border-radius: 3px;',
      '  padding: 20px 13px;',
      '  width: 465px;',
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
      '  font-size: 13px;',
      '  box-shadow: inset 0px -15px #ddd;',
      '}',
      '',
      '.fa-notify-wrapper, .fa-notify-wrapper * {',
      '  box-sizing: border-box;',
      '}',
      '',
      '.fa-notify-wrapper::before {',
      '  content: "";',
      '  position: absolute;',
      '  top: -11px;',
      '  right: 13px;',
      '  width: 20px;',
      '  height: 20px;',
      '  background-color: #ffffff;',
      '  z-index: 9999;',
      '  transform: rotate(45deg);',
      '  border-radius: 0 0 99px 0;',
      '  border: solid 1px #ddd;',
      '  border-bottom: none;',
      '  border-right: none;',
      '}',
      '',
      '.fa-notify-wrapper header h4 {',
      '  color: #666;',
      '  font-weight: 600;',
      '  font-size: 21px;',
      '  margin-top: 0px;',
      '  margin-bottom: 5px;',
      '  display: table;',
      '}',
      '',
      '.fa-notify-wrapper header a {',
      '  position: absolute;',
      '  bottom: 5px;',
      '  right: 5px;',
      '}',
      '',
      '.fa-notify-wrapper header {',
      '  display: block;',
      '  position: relative;',
      '  border-bottom: solid 1px #ddd;',
      '  margin-bottom: 8px;',
      '}',
      '',
      '.fa-notify-list {',
      '  counter-reset: section;',
      '}',
      '',
      '.notify-item {',
      '  margin-bottom: 15px;',
      '}',
      '',
      '.notify-item::before {',
      '  counter-increment: section;',
      '  content: counter(section);',
      '  background-color: #ddd;',
      '  border-radius: 10px;',
      '  padding: 1.5px 7px;',
      '  color: #666666;',
      '  margin-right: 4px;',
      '}'
    ].join('\n');

    $(['<style type="text/css">', styles, '</style>'].join('\n')).appendTo('head');

  });
}(jQuery));
