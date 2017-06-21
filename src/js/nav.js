;(function() {
  
  $.extend({
    
    showBack: function() {
      var back = $('.navbar .right .link.back');
      back.show();
    },
    hideBack: function() {
      var back = $('.navbar .right .link.back');
      back.hide();
    },
    showBackHome: function() {
      var back = $('.navbar .right .link:last-child');
      back.show();
    },
    hideBackHome: function() {
      var back = $('.navbar .right .link:last-child');
      back.hide();
    }

  });

})()