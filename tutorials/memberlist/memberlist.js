/**
 *! Simple memberlist in bottom of the page.
 *
 *  @author Luiz~
 *  @licence MIT
 *
 *  Copyright (c) Luiz~ | All rights reserved.
 */
(function ($) {
  'use strict';

  var members = {

    /**
     * Configurações:
     */
    config: {
      max_per_page: 20,
      // [?] Coloque a opção abaixo como "false" se você quer que somente membros registrados e conectados possam ver a lista:
      only_members: false
    },

    /**
     * Configurações de texto:
     */
    text: {
      title: 'Lista de membros',
      search_placeholder: 'Procure qualquer usuário...',
      next_text: 'Próximo',
      back_text: 'Anterior'
    },

    /**
     * Ação AJAX ao clicar no link pela primeira vez após atualizar a página.
     */
    ajaxInit: function () {

      members.checkCount();
      members.counter = 0;
      
      $.ajax({
        url: '/memberlist',
        method: 'GET',

        data: {
          mode: members.template.find('#fa-display-user-type').val(),
          order: members.template.find('#fa-order-user-type').val(),
          start: 0,
          username: ''
        },

        beforeSend: function () {
          members.template.find('.fa-user-list .append-user-list-zone')
            .html([
              '<span class="loading-status">',
              '  <i class="fa fa-spin fa-refresh"></i>',
              '</span>'
            ].join('\n'))
          ;
        }
      })
        .done(function (context) {

          context = context.replace(/src=/gi, 'data-src=');
          
          var $table = $('#memberlist', context);
          var $row = $table.find('tbody tr');

          members.template.find('.loading-status').remove();
          members.template.find('.member-user-row').remove();
      
          $row.each(function () {
      
            var $this = $(this);
            var isIn = $this.index();

            if (isIn < members.config.max_per_page && members.template.css('display') === 'block') {
              var avatar = $this.find('td.avatar-mini').find('a img').attr('data-src');
              var member = $this.find('td').eq(1).html();
              var pmlink = $this.find('td').eq(6).find('a').attr('href');
              members.create.new(avatar, member, pmlink, isIn);
            }
            
          });

          return false;
        })
        .fail(function () {
          members.create.error('Houve um erro. <br /> Tente novamente!');
        })
      ;
    },

    /**
     * Ação ao clicar no botão de voltar à página anterior.
     */
    ajaxPrev: function () {

      members.checkCount('minus');
      
      $.ajax({
        url: '/memberlist',
        method: 'GET',
      
        data: {
          mode: members.template.find('#fa-display-user-type').val(),
          order: members.template.find('#fa-order-user-type').val(),
          start: members.counter,
          username: ''
        },
      
        beforeSend: function () {
          members.template.find('.fa-user-list .append-user-list-zone')
            .html([
              '<span class="loading-status">',
              '  <i class="fa fa-spin fa-refresh"></i>',
              '</span>'
            ].join('\n'))
          ;
        }
      })
        .done(function (context) {

          context = context.replace(/src=/gi, 'data-src=');
      
          var $table = $('#memberlist', context);
          var $row = $table.find('tbody tr');
      
          members.template.find('.loading-status').remove();
          members.template.find('.member-user-row').remove();
      
          $row.each(function () {
      
            var $this = $(this);
            var isIn = $this.index();
      
            if (isIn < members.config.max_per_page && members.template.css('display') === 'block') {
              var avatar = $this.find('td.avatar-mini').find('a img').attr('data-src');
              var member = $this.find('td').eq(1).html();
              var pmlink = $this.find('td').eq(6).find('a').attr('href');
              members.create.new(avatar, member, pmlink, isIn);
            }
            
          });
      
          return false;
        })
        .fail(function () {
          members.create.error('Houve um erro. <br /> Tente novamente!');
        })
      ;
    },

    /**
     * Ação ao clicar no botão de próxima página.
     */
    ajaxNext: function () {

      members.checkCount('plus');
      
      $.ajax({
        url: '/memberlist',
        method: 'GET',
      
        data: {
          mode: members.template.find('#fa-display-user-type').val(),
          order: members.template.find('#fa-order-user-type').val(),
          start: members.counter,
          username: ''
        },
      
        beforeSend: function () {
          members.template.find('.fa-user-list .append-user-list-zone')
            .html([
              '<span class="loading-status">',
              '  <i class="fa fa-spin fa-refresh"></i>',
              '</span>'
            ].join('\n'))
          ;
        }
      })
        .done(function (context) {

          context = context.replace(/src=/gi, 'data-src=');
      
          var $table = $('#memberlist', context);
          var $row = $table.find('tbody tr');
      
          members.template.find('.loading-status').remove();
          members.template.find('.member-user-row').remove();
      
          $row.each(function () {
      
            var $this = $(this);
            var isIn = $this.index();
      
            if (isIn < members.config.max_per_page && members.template.css('display') === 'block') {
              var avatar = $this.find('td.avatar-mini').find('a img').attr('data-src');
              var member = $this.find('td').eq(1).html();
              var pmlink = $this.find('td').eq(6).find('a').attr('href');
              members.create.new(avatar, member, pmlink, isIn);
            }
            
          });
      
          return false;
        })
        .fail(function () {
          members.create.error('Houve um erro. <br /> Tente novamente!');
        })
      ;
    },

    /**
     * Ajax para procurar um usuário:
     */
    ajaxFind: function (username) {

      $.ajax({
        url: '/memberlist',
        method: 'GET',
      
        data: {
          mode: members.template.find('#fa-display-user-type').val(),
          order: members.template.find('#fa-order-user-type').val(),
          submit: 'Ok',
          username: username
        }
        
      })
        .done(function (context) {

          context = context.replace(/src=/gi, 'data-src=');
          
          var $table = $('#memberlist', context);
          var $row = $table.find('tbody tr');
      
          members.template.find('.finding-loading-status').remove();
          members.template.find('li.member-user-find').remove();

          if (!members.template.find('#fa-field-find-user').is(':focus')) {
            return false;
          }
      
          $row.each(function () {
      
            var $this = $(this);
            var isIn = $this.index();
      
            if (isIn < 3 && members.template.css('display') === 'block') {
              var member = $this.find('td').eq(1).html();

              if (!member) {
                members.create.newFound('<li class="member-user-find">Não foi possível verificar este usuário...</li>');
                return;
              }
              
              members.template.find('.fa-members-find').show();
              members.create.newFound('<li class="member-user-find member-user-find-' + isIn + '">' + member + '</li>');
            }
            
          });
      
          return false;
        })
        .fail(function () {
          members.create.newFound('<li class="member-user-find error-for-find">Não foi possível verificar este usuário... [ajax error]</li>');
        })
      ;
    },

    /**
     * Função essencial para o gerenciamento de páginas da lista:
     */
    checkCount: function (number) {
      if (members.counter === 0) {
        members.template.find('#fa-contact-prev-page')
          .addClass('disabled')
        ;
      } else {
        members.template.find('#fa-contact-prev-page')
          .removeClass('disabled')
        ;
      }

      if (number === 'plus') {

        members.template.find('#fa-contact-prev-page')
          .removeClass('disabled')
        ;
        
        members.counter = members.counter + 20;
        return;
      }

      if (number === 'minus' && members.counter !== 0) {

        if (members.counter === 0) {
          members.template.find('#fa-contact-prev-page')
            .addClass('disabled')
          ;
        }
        
        members.counter = members.counter - 20;
        return;
      }
    },

    /**
     * Funções para criar-se elementos em certa lista.
     */
    create: {
      new: function (avatar, member, pmlink, isIn) {
        members.template.find('.append-user-list-zone')
          .append([
            '<tr class="member-user-row member-user-' + isIn + '">',
            '  <td>',
            '    <img src="' + avatar + '" class="fa-userlist-avatar" />',
            '  </td>',
            '  <td class="fa-userlis-username">' + member + '</td>',
            '  <td class="fa-userlist-pmwrapper">',
            '    <a href="' + pmlink + '">',
            '      <i class="fa fa-envelope"></i>',
            '    </a>',
            '  </td>',
            '</tr>'
          ].join('\n'))
        ;
      },

      newFound: function (member) {
        members.template.find('.fa-members-find ul')
          .append(member)
        ;
      },
      
      error: function (log) {
        members.template.find('.fa-user-list .append-user-list-zone')
          .html('<span class="log log-error loading-status">' + log + '</span>')
        ;
      }
    },

    counter: 0
    
  };

  $(function () {

    if (_userdata["session_logged_in"] === 0 && members.config.only_members) {
      return false;
    }

    /**
     * HTML da lista de "contatos".
     */
    members.template = $([
      '<div class="fa-memberlist-wrapper">',
      '  <div class="fa-memberlist-toggler">',
      '    <a href="javascript:void(0)" title="Abrir lista de usuários portátil.">',
      '      <img src="https://files-assets.github.io/svg/fdf/contact-list.svg" />',
      '    </a>',
      '  </div>',
      '  <div class="fa-memberlist-inner">',
      '    <header>',
      '      <h4>' + members.text.title + '</h4>',
      '      <form id="fa-find-user">',
      '        <input id="fa-field-find-user" type="search" placeholder="' + members.text.search_placeholder + '" />',
      '        <div class="fa-members-find" style="display: none;">',
      '          <ul>',
      '          </ul>',
      '        </div>',
      '        <div class="fa-select-form-group">',
      '          <label for="fa-display-user-type">Ordenar por:</label>',
      '          <select id="fa-display-user-type">',
      '            <option value="lastvisit" selected="selected">Última visita</option>',
      '            <option value="joined">Inscrito dia</option>',
      '        	   <option value="username">Nome de usuário</option>',
      '        	   <option value="interests">Humor</option>',
      '           	<option value="posts">Mensagens</option>',
      '        	   <option value="website">URL do fórum</option>',
      '        	   <option value="groups">Grupos</option>',
      '          </select>',
      '        </div>',
      '        <div class="fa-select-form-group">',
      '          <label for="fa-order-user-type">Ordem:</label>',
      '          <select id="fa-order-user-type">',
      '            <option value="">Crescente</option>',
      '            <option value="DESC" selected="selected">Decrescente</option>',
      '          </select>',
      '        </div>',
      '      </form>',
      '    </header>',
      '    <div class="fa-user-list">',
      '      <table class="fa-userlist-table">',
      '        <tbody class="append-user-list-zone">',
      '        </tbody>',
      '      </table>',
      '    </div>',
      '    <footer>',
      '      <a id="fa-contact-next-page">' + members.text.next_text + '</a>',
      '      <a id="fa-contact-prev-page" class="disabled">' + members.text.back_text + '</a>',
      '    </footer>',
      '  </div>',
      '</div>'
    ].join('\n'))
      .appendTo('body')
    ;

    /**
     * Trigger para abrir a lista de "contatos".
     * Este é o trigger inicial do tutorial.
     */
    members.template.find('.fa-memberlist-toggler')
      .on('click', function () {

        members.counter = 0;
        var $this = $(this);

        $this.toggleClass('next-is-visible');

        if ($this.is('.next-is-visible')) {
          console.log('Rodando ajax primário...');
          members.ajaxInit();
        }

        $this
          .next()
            .toggle()
        ;

        return false;
      })
    ;

    /**
     * Trigger para executar o ajax de ir voltar uma página,
     * ao clicar-se no botão de página anterior.
     */   
    members.template.find('#fa-contact-prev-page')
      .on('click', function () {

        if (members.counter >= 20) {
          console.log('Rodando ajax de página anterior...');
          members.ajaxPrev();
        }

        members.checkCount();
    
        return false;
      })
    ;

    /**
     * Trigger para executar o ajax de ir à próxima página,
     * ao clicar-se no botão de próxima página.
     */
    members.template.find('#fa-contact-next-page')
      .on('click', function () {
    
        console.log('Rodando ajax de próxima página...');
        members.ajaxNext();
    
        return false;
      })
    ;

    /**
     * Ações baseadas no input de procurar um usuário:
     */
    members.template.find('#fa-field-find-user')
      .on({

        blur: function () {
          members.template.find('.fa-members-find .append-user-list-zone')
            .html([
              '<li class="finding-loading-status">',
              '  <i class="fa fa-spin fa-refresh"></i>',
              '  <span class="sr-only">Carregando...</span>',
              '</li>'
            ].join('\n'))
          ;
        },

        keyup: function () {
          members.template.find('.fa-members-find').show();
          
          if ($(this).val().length >= 3) {
            members.template.find('.fa-members-find .append-user-list-zone')
              .html([
                '<li class="finding-loading-status">',
                '  <i class="fa fa-spin fa-refresh"></i>',
                '  <span class="sr-only">Carregando...</span>',
                '</li>'
              ].join('\n'))
            ;
            
            members.ajaxFind($(this).val());

            return false;
          } else {
            members.template.find('.fa-members-find .append-user-list-zone')
              .html('<span class="finding-loading-status fa-search-error">Não foi possível verificar este usuário...</span>')
            ;

            return false;
          }
        },

        focusout: function () {
          members.template.find('.fa-members-find li').remove();
          members.template.find('.fa-members-find').hide();
          $(this).val('');
        }
        
      })
    ;

    /**
     * Triggers ao mudar o select de ordem de pesquisa:
     */
    members.template.find('#fa-display-user-type, #fa-order-user-type')
      .on('change', function () {
        members.ajaxInit();

        return false;
      })
    ;

    /**
     * Trigger para fechar a lista ao clicar no documento:
     */
    members.template.on('click', function (event) {
      event.stopPropagation();
    });

    $(document).on('click', function () {
      members.template.find('.fa-memberlist-inner')
        .hide()
      ;
    });

    /**
     * Criação dos estilos.
     */
    members.style = [
      '.fa-memberlist-inner a {',
      '  cursor: pointer;',
      '}',
      '',
      '.fa-members-find {',
      '  display: block;',
      '  background-color: #cde6f3;',
      '  position: absolute;',
      '  left: 15px;',
      '  right: 15px;',
      '  padding: 15px;',
      '  color: #555;',
      '  box-shadow: 0 0 4px 0px #c5deea;',
      '  font-size: 11px;',
      '}',
      '',
      '.loading-status {',
      '  font-size: 24px;',
      '  padding: 15px 0px;',
      '  text-align: center;',
      '  display: block;',
      '}',
      '',
      '.fa-userlis-username img,',
      '.member-user-find img {',
      '  display: none;',
      '}',
      '',
      '.fa-memberlist-wrapper {',
      '  position: fixed;',
      '  bottom: 0px;',
      '  left: 0px;',
      '  z-index: 99999;',
      '}',
      '',
      '.fa-memberlist-inner {',
      '  position: absolute;',
      '  display: none;',
      '}',
      '',
      '.fa-memberlist-toggler {',
      '  width: 45px;',
      '  height: 45px;',
      '  box-sizing: border-box;',
      '  background-color: #39c;',
      '  position: relative;',
      '  border-radius: 0 5px 0 0;',
      '  transition: all 200ms;',
      '}',
      '',
      '.fa-memberlist-toggler:hover {',
      '  background-color: #2e3133;',
      '}',
      '',
      '.fa-memberlist-toggler img {',
      '  width: 25px;',
      '  height: 25px;',
      '  position: absolute;',
      '  top: 49%;',
      '  left: 48%;',
      '  transform: translate(-50%, -50%);',
      '}',
      '',
      '.fa-memberlist-wrapper * {',
      '  box-sizing: border-box;',
      '}',
      '',
      '.fa-memberlist-inner {',
      '  position: absolute;',
      '  z-index: 99999999;',
      '  bottom: 45px;',
      '  background-color: #fff;',
      '  width: 350px;',
      '  box-shadow: 5px 5px rgba(0, 0, 0, 0.3);',
      '  border: solid 1px #ddd;',
      '  border-left: solid 0px;',
      '}',
      '',
      '.fa-memberlist-inner header h4 {',
      '  color: #fff;',
      '  background-color: #39c;',
      '  padding: 10px 15px;',
      '  font-family: "Trebuchet MS", Arial, sans-serif;',
      '  text-transform: uppercase;',
      '  border: none;',
      '  margin: 0;',
      '  font-size: 18px;',
      '  font-weight: normal;',
      '}',
      '',
      '.fa-memberlist-inner header form {',
      '  padding: 15px 15px 0 15px;',
      '  position: relative;',
      '  width: 100%;',
      '  display: block;',
      '}',
      '',
      '.fa-memberlist-inner header form input,',
      '.fa-memberlist-inner header form select {',
      '  width: 100%;',
      '  border: solid 1px #cecece;',
      '  padding: 7px;',
      '  font-size: 13px;',
      '  border-radius: 3px;',
      '  display: block;',
      '  padding-left: 31px;',
      '  color: #555;',
      '  background-image: url(https://files-assets.github.io/svg/fdf/find.svg);',
      '  background-repeat: no-repeat;',
      '  background-size: 16px;',
      '  background-position: 8px center;',
      '  transition: all 200ms;',
      '}',
      '',
      '.fa-memberlist-inner header form select {',
      '  padding-left: 7px;',
      '  background: none;',
      '}',
      '',
      '.fa-memberlist-inner header form label {',
      '  display: block;',
      '  margin-bottom: 6px;',
      '  margin-top: 13px;',
      '  font-size: 11px;',
      '}',
      '',
      '.fa-memberlist-inner header form input::placeholder {',
      '  color: #555;',
      '}',
      '',
      '.fa-memberlist-inner header form input:focus {',
      '  border-color: #39c;',
      '  outline: none;',
      '  box-shadow: inset 0 0 1px 0px #3399cc, 0 0 1px 1px #3399cc;',
      '}',
      '',
      '.fa-memberlist-inner .fa-user-list {',
      '  padding: 15px;',
      '}',
      '',
      '.fa-memberlist-inner footer {',
      '  background-color: #ddd;',
      '  padding: 10px 15px;',
      '}',
      '',
      '.fa-memberlist-inner footer a {',
      '  font-size: 12px;',
      '  border-bottom: solid 1px transparent;',
      '  color: #39c;',
      '}',
      '',
      '.fa-memberlist-inner footer a:hover {',
      '  border-bottom-color: #39c;',
      '}',
      '',
      'a#fa-contact-next-page {',
      '  float: right;',
      '}',
      '',
      '.disabled {',
      '  opacity: .9;',
      '  filter: blur(.5px);',
      '  cursor: not-allowed !important;',
      '}',
      '',
      '.disabled:hover {',
      '  border-bottom-color: transparent!important;',
      '}',
      '',
      '.fa-user-list {',
      '  max-height: 400px;',
      '  overflow-y: scroll;',
      '  margin-top: 15px;',
      '  border-top: solid 1px #ddd;',
      '}',
      '',
      '.fa-user-list table {',
      '  width: 100%;',
      '  border-collapse: collapse;',
      '}',
      '',
      'tr.member-user-row {',
      '  display: block;',
      '  margin-bottom: 15px;',
      '  position: relative;',
      '}',
      '',
      'tr.member-user-row:last-child {',
      '  margin-bottom: 0px;',
      '}',
      '',
      'tr.member-user-row td img.fa-userlist-avatar {',
      '  width: 25px;',
      '  height: 25px;',
      '  border: solid 1px #989898;',
      '  border-radius: 5px;',
      '  box-shadow: 0 0 1px black;',
      '}',
      '',
      'td.fa-userlist-pmwrapper {',
      '  position: absolute;',
      '  top: 50%;',
      '  right: 2px;',
      '  transform: translateY(-50%);',
      '}',
      '',
      'td.fa-userlist-pmwrapper i {',
      '  color: #39c;',
      '  font-size: 15px;',
      '}',
      '',
      'td.fa-userlist-pmwrapper i:hover {',
      '  color: #444;',
      '}'
    ].join('\n');

    /**
     * Criação dos estilos no <head>:
     */
    $(['<style type="text/css">', members.style, '</style>'].join('\n')).appendTo('head');
  });
}(jQuery));
