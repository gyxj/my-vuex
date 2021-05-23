let _Vue = null

class Store {
  constructor (options) {
    // 如果选项中没有传入给默认值为空对象
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options
    // 将 state 转换为响应式的
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      // 给 getters 中的每一个方法设置为响应式的
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (key, payload) {
    this._mutations[key](this.state, payload)
  }

  dispatch (key, payload) {
    this._actions[key](this, payload)
  }
}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  install,
  Store
}
