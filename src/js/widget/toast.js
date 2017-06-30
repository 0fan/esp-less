import Widget from './widget'

class Toast extends Widget {

  constructor(cfg) {
    super(cfg)

    this.cfg = $.extend({}, {
      text   : '默认提示',
      time   : 2.5,
      target : document.body,
      during : 300 // 动画的时长，用于调用回调
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

    this.boundingBox.addClass('in').one('espTransitionEnd', (e) => {
      this.fire('open')

      setTimeout(() => {
        this.destory()
      }, this.cfg.time * 1000)

    }).emulateTransitionEnd(this.cfg.during)
    
  }

  renderUI() {
    this.boundingBox = $('<div class="esp-toast">' + this.cfg.text +'</div>')
  }

  destory() {
    let isTransitionend = false;

    this.boundingBox.removeClass('in').one('espTransitionEnd', () => {
      this.fire('close')
      this.boundingBox.remove()
      this.boundingBox = null
    })

  }
  
}

function getToast(cfg) {
  if (!(this instanceof Toast)) {
    return new Toast(cfg);
  }
}

export default getToast;