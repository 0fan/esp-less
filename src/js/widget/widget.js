import '../utility/transition'

class Widget {
  constructor() {
    this.boundingBox = null
    this.handlers = {}
  }

  render() { // 生成
    this.renderUI()
    this.bindUI()
    this.syncUI()
  }

  renderUI() {} // 生成插件结构

  syncUI() {} // 定制插件特征

  bindUI() {} // 绑定事件

  destory() {} // 销毁

  // 观察者模式
  on(type, handler) {
    if (typeof this.handlers[type] === 'undefined') {
      this.handlers[type] = []
    }

    this.handlers[type].push(handler)

    return this
  }

  fire(type, data) {
    if (!(this.handlers[type] instanceof Array)) {
      return
    }

    let handlers = this.handlers[type]
    for (let i = 0, len = handlers.length; i < len; i++) {
      handlers[i](data)
    }
  }
  // end 观察者模式

}

export default Widget