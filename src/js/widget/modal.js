import Widget from './widget'

class Modal extends Widget {
  
  constructor(cfg) {
    super(cfg)

    this.cfg = $.extend({}, {
      target        : document.body,
      legend        : '',
      title         : '',
      full          : false,
      info          : '',
      status        : '',
      action        : [],
      withSidebar   : false,
      mask          : false,
      clickMaskHide : false
    }, cfg)

    if ($('.esp-modal').length) {
      return
    }
    
    this.render()

  }

  render() { // 生成
    this.renderUI()
    this.syncUI()
    this.bindUI()

    $(document.body).addClass('with-modal')

    this.boundingBox
      .appendTo(this.cfg.target)
      .show()
      .scrollTop(0)

    this.boundingBox[0].offsetWidth

    let $dialog = this.boundingBox.find('.esp-modal-dialog')
    
    let isTransitionend = false;

    this.boundingBox.addClass('in')
    $dialog.one('transitionend', (e) => {
      isTransitionend = true

      if (isTransitionend) {
        isTransitionend = false
        this.fire('open')
      }

    })
  }

  renderUI() {

    let _modal,
        _dialog,
        _legend,
        _title,
        _info,
        _action,
        _mask

    _modal  = '<div class=esp-modal>'
    _dialog = '<div class=esp-modal-dialog>'
    _legend = this.cfg.legend ? '<div class="esp-modal-legend ' + this.cfg.legend + '"></div>' : ''
    _title  = this.cfg.title ? '<div class=esp-modal-title>' + this.cfg.title + '</div>' : ''
    _info   = this.cfg.info ? '<div class=esp-modal-info>' + this.cfg.info + '</div>' : ''
    _legend = ''
    _action = ''
    _mask   = this.cfg.mask ? '<div class=esp-modal-mask></div>' : ''

    if (this.cfg.legend) {
      if (this.cfg.legend.match(/^legend/)) { // 插图
        _legend = '<div class="esp-modal-legend ' + this.cfg.legend + '"></div>'
      }
      if (this.cfg.legend.match(/^anime/)) { // 动画
        _legend = '<div class=esp-modal-legend>\
                    <div class="esp-anime esp-anime-sm ' + this.cfg.legend + '"></div>\
                  </div>' 
      }
    }

    if (this.cfg.action && this.cfg.action.length) {
      _action = '<div class=esp-modal-action>'

      for (let i = 0, len = this.cfg.action.length; i < len; i++) {
        _action += '<button class="esp-modal-btn esp-btn">' + this.cfg.action[i].text + '</button>'
      }

      _action += '</div>';
    }

    _dialog += _legend
    _dialog += _title
    _dialog += _info
    _dialog += _action
    _dialog += '</div>'
    _modal  += _dialog
    _modal  += _mask
    _modal  += '</div>'

    this.boundingBox = $(_modal)

  }

  syncUI() {

    if (this.cfg.full) {
      $('.esp-modal-dialog', this.boundingBox).css('top', 0)
    }

    if (this.cfg.withSidebar) {
      this.boundingBox.css('left', '340px')
    }

    if (this.cfg.status) {
      this.boundingBox.addClass('has' + this.cfg.status.substr(0,1).toUpperCase() + this.cfg.status.substr(1).toLowerCase())
    }

  }

  bindUI() {
    
    if (this.cfg.mask && this.cfg.clickMaskHide) {
      this.boundingBox.on('click', '.esp-modal-mask', (e) => {
        this.destory()
      })
    }

    for (let i = 0, len = this.cfg.action.length; i < len; i++) {
      this.boundingBox.on('click', '.esp-modal-btn:nth-child(' + (i + 1) + ')', (e) => {
        this.cfg.action[i].onClick && this.cfg.action[i].onClick()
      })
    }
    
  }

  destory() {
    
    $(document.body).removeClass('with-modal')

    this.boundingBox.off();

    let $dialog = this.boundingBox.find('.esp-modal-dialog');

    let isTransitionend = false;

    this.boundingBox.removeClass('in');
    $dialog.one('transitionend', () => {
      isTransitionend = true;

      if (isTransitionend) {
        this.fire('close')
        this.boundingBox.remove()
        this.boundingBox = null
      }
      
    });

  }

}

function getModal(cfg) {
  if (!(this instanceof Modal)) {
    return new Modal(cfg);
  }
}

export default getModal;