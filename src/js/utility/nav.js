$.extend({
    
  showBack: function() {
    let back = $('.navbar .right .link.back')
    back.show()
  },
  hideBack: function() {
    let back = $('.navbar .right .link.back')
    back.hide()
  },
  showBackHome: function() {
    let back = $('.navbar .right .link:last-child')
    back.show()
  },
  hideBackHome: function() {
    let back = $('.navbar .right .link:last-child')
    back.hide()
  }

})