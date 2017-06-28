import Widget from './widget'

class Toast extends Widget {

  constructor(cfg) {
    super(cfg)

    this.cfg = $.extend({}, {
      text: '默认提示',
      time: 2.5,
      target: document.body
    }, cfg)

    this.render()
  }

  render() { // 生成
    this.renderUI()
    this.syncUI()
    this.bindUI()

    this.boundingBox
      .appendTo(this.cfg.target)
      .show()
    
    this.boundingBox[0].offsetWidth
    
    let isTransitionend = false;

    this.boundingBox.addClass('in').one('transitionend', (e) => {
      isTransitionend = true;

      if (isTransitionend) {
        isTransitionend = false;
        this.fire('open')
        
        setTimeout(() => {
          this.destory()
        }, this.cfg.time * 1000)
      }

    })
  }

  renderUI() {
    this.boundingBox = $('<div class="esp-toast">' + this.cfg.text +'</div>')
  }

  destory() {
    let isTransitionend = false;

    this.boundingBox.removeClass('in').one('transitionend', () => {
      isTransitionend = true;

      if (isTransitionend) {
        this.fire('close')
        this.boundingBox.remove()  
      }
      
    });
  }
  
}

function getToast(cfg) {
  if (!(this instanceof Toast)) {
    return new Toast(cfg);
  }
}

export default getToast;