import Widget from './widget'

class Timer extends Widget {
  constructor(cfg) {
    super(cfg)

    this.cfg = $.extend({}, {
      target             : document.body,
      time               : 15,
      position           : 'right-bottom',
      radius             : 40,
      borderWidth        : 6,
      borderDefaultColor : '#d1d3d7',
      borderActiveColor  : '#00abfb',
      disX               : '50px',
      disY               : '50px',
      during             : 300 // 动画的时长，用于调用回调
    }, cfg)

    this.render()

  }

  render() {
    this.renderUI()
    this.syncUI()
    this.bindUI()

    this.boundingBox
      .appendTo(this.cfg.target)
      .show()

    this.boundingBox[0].offsetWidth

    this.boundingBox.addClass('in').one('espTransitionEnd', (e) => {
      this.fire('open')
    }).emulateTransitionEnd(this.cfg.during)

  }
  
  renderUI() {
    
    let _timer,
        _count,
        _svg,
        d  = (this.cfg.radius + 5) * 2, // 宽高
        cd = this.cfg.radius + 5 // 内圆的直径

    _timer = '<div class=esp-timer>'
    _count = '<div class=esp-timer-count>' + this.cfg.time + '</div>'
    // 等号右侧千万不能留空格！
    _svg   = '<svg\
                width =' + d + '\
                height =' + d + '\
              >\
                <circle\
                  cx           =' + cd + '\
                  cy           =' + cd + '\
                  r            =' + this.cfg.radius + '\
                  stroke-width =' + this.cfg.borderWidth + '\
                  stroke       =' + this.cfg.borderDefaultColor + '\
                  transform    =matrix(0,-1,1,0,0,' + d + ')\
                  fill         =none\
                >\
                </circle>\
                <circle\
                  cx           =' + cd + '\
                  cy           =' + cd + '\
                  r            =' + this.cfg.radius + '\
                  stroke-width =' + this.cfg.borderWidth + '\
                  stroke       =' + this.cfg.borderActiveColor + '\
                  transform    =matrix(0,-1,1,0,0,' + d + ')\
                  fill         =none\
                >\
                </circle>\
              </svg>'

    _timer += _svg
    _timer += _count
    _timer += '</div>'

    this.boundingBox = $(_timer)

  }

  syncUI() {

    let p = this.cfg.position

    if (p === 'right-bottom' || p === 'bottom-right' || p === 'r-b' || p === 'b-r') {
      this.boundingBox.css({
        right: this.cfg.disX,
        bottom: this.cfg.disY,
        top: 'atuo',
        left: 'auto'
      })
    }

    if (p === 'left-bottom' || p === 'bottom-left' || p === 'l-b' || p === 'b-l') {
      this.boundingBox.css({
        left: this.cfg.disX,
        bottom: this.cfg.disY,
        right: 'auto',
        top: 'auto'
      })
    }

    if (p === 'right-top' || p === 'top-right' || p === 'r-t' || p === 't-r') {
      this.boundingBox.css({
        right: this.cfg.disX,
        top: this.cfg.disY,
        left: 'auto',
        bottom: 'auto'
      })
    }

    if (p === 'left-top' || p === 'top-left' || p === 'l-t' || p === 't-l') {
      this.boundingBox.css({
        left: this.cfg.disX,
        top: this.cfg.disY,
        right: 'auto',
        bottom: 'auto'
      })
    }

    $(this.cfg.target).css('position') === 'static' && $(this.cfg.target).css({'position': 'relative'})
    
  }
  
  bindUI() {
    
    let that = this

    this._svg     = this.boundingBox.find('circle').eq(1)
    this._count   = this.boundingBox.find('.esp-timer-count')
    
    // 倒计时  
    let perimeter = Math.PI * this.cfg.radius * 2, // 周长
        len       = perimeter,
        time      = this.cfg.time,
        counter   = time,
        per       = perimeter / time // 每秒的需要增加或减少的长度
    
    calc()

    function calc() {

      if (counter < 0) {
        that.destory()
      }

      that._svg.attr({
        'stroke-dasharray': (perimeter - ((time - counter) * per)) + ' ' + perimeter
      })
      that._count.text(counter >= 0 ? counter : 0)

      counter--
    }

    this._timer = setInterval(() => {
      
      calc()

    }, 1000)

  }

  destory() {
    
    this.boundingBox.off()
    clearInterval(this._timer)
    
    this.boundingBox.removeClass('in').one('espTransitionEnd', (e) => {
      this.fire('close')

      this.boundingBox.remove()
      this.boundingBox = null

    }).emulateTransitionEnd(this.cfg.during)

  }

}

function getTimer(cfg) {
  if (!(this instanceof Timer)) {
    return new Timer(cfg)
  }
}

export default getTimer