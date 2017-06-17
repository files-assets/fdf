(function ($) {
  'use strict';
 
  var styles = [
    'a.mainmenu[href="/profile?mode=editprofile"],',
    '[data-trigger="profile-drop"] {',
    '  position: relative;',
    '}',
    '',
    '.fa-dropdown-user {',
    '  position: absolute;',
    '  background-color: #fff;',
    '  z-index: 9999;',
    '  width: 400px;',
    '  height: 105px;',
    '  border-radius: 3px;',
    '  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.39);',
    '  top: 50px;',
    '  left: -20px;',
    '  padding: 10px;',
    '  padding-left: 30px;',
    '  opacity: 0;',
    '  visibility: hidden;',
    '  pointer-events: none;',
    '}',
    '',
    '.fa-dropdown-user img {',
    '  display: inline-block!important;',
    '  width: 75px;',
    '  height: 75px;',
    '  position: absolute;',
    '  left: 15px;',
    '  top: 50%;',
    '  transform: translateY(-50%);',
    '  border: solid 3px #ddd;',
    '  border-radius: 100px;',
    '  background-color: #fff;',
    '  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.54);',
    '}',
    '',
    '.fa-dropdown-user:before {',
    '  content: "";',
    '  width: 20px;',
    '  height: 20px;',
    '  background-color: #fff;',
    '  position: absolute;',
    '  top: -11px;',
    '  left: 45px;',
    '  transform: rotate(45deg);',
    '  border-radius: 0 0 100px 0;',
    '  border-left: solid 1px rgba(0, 0, 0, 0.21);',
    '  border-top: solid 1px rgba(0, 0, 0, 0.21);',
    '}',
    '',
    '.fa-col-left {',
    '  position: absolute;',
    '  left: 28%;',
    '  text-align: left;',
    '}',
    '',
    '.fa-col-left a,',
    '.fa-col-right a {',
    '  display: block;',
    '  height: auto!important;',
    '  line-height: initial!important;',
    '  color: #0372be;',
    '  margin-bottom: 17px;',
    '  margin-top: 10px;',
    '}',
    '',
    '.fa-col-right {',
    '  text-align: left;',
    '  position: absolute;',
    '  left: 59%;',
    '}',
    '',
    '.fa-col-left a:hover, .fa-col-right a:hover {',
    '  color: #0372be;',
    '  text-decoration: underline;',
    '}',
    '',
    '.drop-is-visible {',
    '  opacity: 1;',
    '  visibility: visible;',
    '  pointer-events: all;',
    '}',
  ].join('\n');
 
  $(function () {
 
    var $target = $('a.mainmenu[href="/profile?mode=editprofile"], a.mainmenu[href="javascript:void(0)"], .profile-link');
    var $drop = $([
      '<div class="fa-dropdown-user">',
      '  <div class="fa-avatar-wrap">',
      '    ' + _userdata["avatar"],
      '  </div>',
      '  <div class="fa-col-left">',
      '    <a href="/st/' + _userdata["username"] + '">Meu Conteúdo</a>',
      '    <a href="/profile?mode=editprofile&page_profil=signature">Assinatura</a>',
      '    <a href="/profile?mode=editprofile&page_profil=friendsfoes">Amigos</a>',
      '  </div>',
      '  <div class="fa-col-right">',
      '    <a href="/u' + _userdata["user_id"] + '">Meu Perfil</a>',
      '    <a href="/profile?mode=editprofile&page_profil=avatars">Mudar avatar</a>',
      '    <a href="/profile?mode=editprofile&page_profil=informations">Preferências</a>',
      '  </div>',
      '</div>',
    ].join('\n'))
      .appendTo($target)
    ;
 
    $target.attr({
      'href': 'javascript:void(0)',
      'data-trigger': 'profile-drop'
    });
 
    var $trigger = $('[data-trigger="profile-drop"]');
 
    $trigger.on('click', function (event) {
      $drop.toggleClass('drop-is-visible');
      event.preventDefault();
      event.stopPropagation();
    });
 
    $drop.on('click', function (event) {
      event.stopPropagation();
    });
 
    $(document).on('click', function (event) {
      if (!$drop.is('.drop-is-visible')) {
        return;
      }
 
      $drop.toggleClass('drop-is-visible');
    })
 
    $([
      '<style type="text/css">',
      ' ' + styles,
      '</style>',
    ].join('\n'))
      .appendTo('head')
    ;
    
  });
}(jQuery));
