import Widget from './widget'

class Steps extends Widget {
  
  constructor(cfg) {
    super(cfg)
    
    this.cfg = $.extend({}, {
      active : 0,
      data   : null,
      target : '.sidebar'
    }, cfg)

    this.render()

  }

  render() {
    this.renderUI()
    this.bindUI()

    $(this.cfg.target).html(this.boundingBox)
    this.fire('open')
  }

  renderUI() {

    let _steps,
        _title,
        _items

    _steps = '<div class=esp-steps>'
    _title = '<div class=sidebar-title>' + this.cfg.data.title + '</div>'
    _items = ''

    if (this.cfg.data.data && this.cfg.data.data.length) {
      for (var i = 0, len = this.cfg.data.data.length; i < len; i++) {
        _items += '<div class=esp-steps-item>\
                     <div class=esp-steps-tail></div>\
                     <div class=esp-steps-step>\
                        <div class=esp-steps-head>\
                          <div class=esp-steps-head-inner>\
                            <i class="icon icon-material icon-' + this.cfg.data.data[i].icon + '"></i>\
                          </div>\
                        </div>\
                        <div class=esp-steps-main>\
                          <div class=esp-steps-main-title>' + this.cfg.data.data[i].text + '</div>\
                        </div>\
                     </div>\
                   </div>'
      }
    }

    _steps += _title
    _steps += _items
    _steps += '</div>'

    this.boundingBox = $(_steps)

  }

  bindUI() {
    this.boundingBox.find('.esp-steps-item').eq(this.cfg.active).addClass('active')
  }

  destory() {
    this.boundingBox.off()
    this.boundingBox.remove()
    this.fire('close')
  }

  update(index) {

    let isTransitionend = false

    let _item  = this.boundingBox.find('.esp-steps-item').eq(index),
        _inner = _item.find('.esp-steps-head-inner') 

        console.log(_item)

    _item.addClass('active').siblings().removeClass('active')


    _inner.one('transitionend', (e) => {
      isTransitionend = true

      if (isTransitionend) {
        isTransitionend = false
        this.fire('updata')
      }

    })
  }

}

function getSteps(cfg) {
  if (!(this instanceof Steps)) {
    return new Steps(cfg);
  }
}

export default getSteps;