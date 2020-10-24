(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    
    var PAYMENT_FORM = '[data-payment="form"]';
    
    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(PAYMENT_FORM);
    
    formHandler.addSubmitHandler(function() {
      var $name = $('input[name=username]').val();
      document.getElementById('message').innerHTML = 'Thank you for your payment, ' + $name + '.';
      $('#thanking').modal();
    });
  })(window);