/*globals jQuery, _userdata*/
(function ($) {
  'use strict';

  var $loginPopover;

  $(function () {

    if (_userdata["session_logged_in"] !== 0) {
      return;
    }

    $('a[href$="/login"]').on('click', function (event) {

      event.preventDefault();
      event.stopPropagation();

      if ($('.fa-popover-login').length > 0) {
        $loginPopover.remove();
        return;
      }

      var $this = $(this);

      /**
      * Variáveis de posição:
      */
      var pos = $this.offset();
      var posY = pos.top;
      var posX = pos.left;
      var mgnL = $this.innerWidth() / 2;
      var mgnT = $this.innerHeight();

      $loginPopover = $([
        '<div class="fa-popover-login">',
        '  <div class="fa-popover-intro">',
        '    <span class="h3">Login</span>',
        '  </div>',
        '  <form action="/login" method="post" name="form_login">',
        '    <div class="input-group">',
        '      <label for="username">Usuário:</label>',
        '      <input type="text" name="username" id="username" maxlength="40" />',
        '      <label for="password">Senha:</label>',
        '      <input type="password" id="password" name="password" maxlength="25" />',
        '    </div>',
        '    <input type="checkbox" name="autologin" id="autologin" checked="checked" />',
        '    <label for="autologin">Conexão automática.</label>',
        '    <footer>',
        '      <input type="submit" name="login" value="Conectar-se" class="submit-btn" />',
        '      <a href="/profile?mode=sendpassword">Esqueci a senha</a>',
        '    </footer>',
        '  </form>',
        '</div>',
      ].join('\n'))
        .appendTo('body')
          .css({
            top: posY + 'px',
            left: posX + 'px',
            marginLeft: mgnL + 'px',
            marginTop: mgnT + 'px',
            position: 'absolute',
            transform: 'translateX(-50%)'
          })
            .on('click', function (event) {
              event.stopPropagation();
            })
      ;

      $loginPopover
        .find('label')
          .on('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            var $label = $(this);
            var attr = $label.attr('for');

            $('#' + attr).focus();
          })
      ;

      $loginPopover
        .find('form')
          .on('submit', function (event) {

            event.preventDefault();
            var $form = $(this);
            
            $form
              .find('[type="submit"]')
                .val('Logando...')
                  .css('cursor', 'not-allowed')
            ;

            var username = $form.find('#username').val();
            var password = $form.find('#password').val();
            var autoLogin = $form.find('#autologin').prop('checked');
            var autoLoginStatus = '';

            if (autoLogin) {
              autoLoginStatus = 'on';
            }

            $.post('/login', {
              username: username,
              password: password,
              autologin: autoLoginStatus,
              login: ''
            })
              .done(function (context) {
            
                var bodyContext = context.split('<body>').pop().split('</body>').shift();
                var body = document.createElement('body');
                body.innerHTML = bodyContext;
                var $body = $(body);
                
                if ($body.find('[href="/register"]').length > 0) {
                  alert([
                    'Você especificou um usuário e/ou senha incorreto(s)!',
                    'Tente novamente!',
                  ].join('\n'));
            
                  location.pathname = '/login';
                  
                  return;
                }
            
                alert('Seja bem-vindo, ' + username + '...');
                location.reload();
                
              })
              .fail(function () {
                alert([
                  'Ocorreu um erro... Tente novamente!',
                  'Caso o erro persista, contate o suporte técnico.'
                ].join('\n'));

                location.pathname = '/login';
              })
            ;  
          })
      ;
    });

    $(document).on('click', function (event) {
      if ($('.fa-popover-login').length > 0) {
        $loginPopover.remove();
      }
    });

    var styles = [
      '.fa-popover-login {',
      '  background-color: #fff;',
      '  -webkit-box-shadow: rgba(93,97,102,0.25) 0px 0px 0px 1px, 0px 7px 10px rgba(0, 0, 0, 0.2), 0px 5px 20px rgba(0,0,0,0.1);',
      '  -moz-box-shadow: rgba(93,97,102,0.25) 0px 0px 0px 1px, 0px 7px 10px rgba(0, 0, 0, 0.2), 0px 5px 20px rgba(0,0,0,0.1);',
      '  -ms-box-shadow: rgba(93,97,102,0.25) 0px 0px 0px 1px, 0px 7px 10px rgba(0, 0, 0, 0.2), 0px 5px 20px rgba(0,0,0,0.1);',
      '  -o-box-shadow: rgba(93,97,102,0.25) 0px 0px 0px 1px, 0px 7px 10px rgba(0, 0, 0, 0.2), 0px 5px 20px rgba(0,0,0,0.1);',
      '  box-shadow: rgba(93,97,102,0.25) 0px 0px 0px 1px, 0px 7px 10px rgba(0, 0, 0, 0.2), 0px 5px 20px rgba(0,0,0,0.1);',
      '  width: 265px;',
      '  border-radius: 2px;',
      '  padding: 15px;',
      '  border: solid 1px #ddd;',
      '  font-size: 16px;',
      '  z-index: 999999999999999999999999;',
      '  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      '}',
      '',
      '.fa-popover-login,',
      '.fa-popover-login * {',
      '  box-sizing: border-box;',
      '}',
      '',
      '.fa-popover-intro .h3 {',
      '  font-family: "Trebuchet MS", "Segoe UI", Helvetica, "Helvetica Neue", Arial, "Open Sans", Lato, sans-serif;',
      '  font-size: 20px;',
      '  color: #818181;',
      '  border-bottom: solid 0px;',
      '  width: 100%;',
      '  display: block;',
      '  margin: 0px;',
      '}',
      '',
      '.fa-popover-login form {',
      '  margin: 10px -15px;',
      '  padding: 15px;',
      '  margin-bottom: 0px;',
      '  padding-bottom: 0px;',
      '  border-top: solid 1px #ddd;',
      '}',
      '',
      '.fa-popover-login form div.input-group label {',
      '  display: block;',
      '  margin-bottom: 5px;',
      '  color: #656565;',
      '  font-size: 14px;',
      '}',
      '',
      '.fa-popover-login form div.input-group label[for="password"] {',
      '  margin-top: 14px;',
      '}',
      '',
      '.fa-popover-login form div.input-group input {',
      '  display: block;',
      '  width: 100%;',
      '  padding: 5px 10px;',
      '  font-size: 1rem;',
      '  line-height: 1.25;',
      '  color: #464a4c;',
      '  background-color: #fff;',
      '  background-image: none;',
      '  -webkit-background-clip: padding-box;',
      '  background-clip: padding-box;',
      '  border: 1px solid rgba(0,0,0,.15);',
      '  border-radius: 2px;',
      '  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;',
      '  transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;',
      '  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;',
      '  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;',
      '  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;',
      '}',
      '',
      '.fa-popover-login form div.input-group input:focus {',
      '  color: #464a4c;',
      '  background-color: #fff;',
      '  border-color: #5cb3fd;',
      '  outline: 0;',
      '}',
      '',
      '.fa-popover-login label[for="autologin"] {',
      '  margin-top: 15px;',
      '  display: inline-block;',
      '}',
      '',
      '.fa-popover-login footer {',
      '  background-color: #ddd;',
      '  padding: 10px;',
      '  margin: -15px;',
      '  margin-top: 15px;',
      '  position: relative;',
      '}',
      '',
      '.fa-popover-login footer a {',
      '  border-bottom: solid 1px transparent;',
      '  color: #39c;',
      '  position: absolute;',
      '  right: 11px;',
      '  top: 47%;',
      '  -webkit-transform: translateY(-50%);',
      '  -moz-transform: translateY(-50%);',
      '  -ms-transform: translateY(-50%);',
      '  -o-transform: translateY(-50%);',
      '  transform: translateY(-50%);',
      '}',
      '',
      '.fa-popover-login footer a:hover {',
      '  border-color: #39c;',
      '}',
      '',
      '.fa-popover-login footer input {',
      '  border: none;',
      '  background-color: #3072ab;',
      '  color: #fff;',
      '  cursor: pointer;',
      '  padding: 4px 8px;',
      '}',
      '',
      '.fa-popover-login footer input:hover {',
      '  background-color: #275e8c;',
      '}',
      '',
      '.fa-popover-login::before {',
      '  content: "";',
      '  position: absolute;',
      '  height: 15px;',
      '  width: 15px;',
      '  background-color: #fff;',
      '  top: -2px;',
      '  left: 50%;',
      '  -webkit-transform: rotate(45deg) translateX(-50%);',
      '  -moz-transform: rotate(45deg) translateX(-50%);',
      '  -ms-transform: rotate(45deg) translateX(-50%);',
      '  -o-transform: rotate(45deg) translateX(-50%);',
      '  transform: rotate(45deg) translateX(-50%);',
      '  border: solid 1px transparent;',
      '  border-left: solid 1px #ddd;',
      '  border-top: solid 1px #ddd;',
      '}',
    ].join('\n');

    $(['<style type="text/css">', styles, '</style>'].join('\n')).appendTo('head');
  });
}(jQuery));
