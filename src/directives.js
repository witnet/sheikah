import Vue from 'vue'

let handleOutsideClick

Vue.directive('focus', {
  inserted: function(el) {
    // It focus the element and add support for element ui inputs
    el.getElementsByTagName('input')
      ? el.getElementsByTagName('input')[0].focus()
      : el.focus()
  },
})

Vue.directive('closable', {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation()
      const { handler, exclude } = binding.value
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        if (
          !clickedOnExcludedEl &&
          vnode.context.$refs[refName] !== undefined
        ) {
          const excludedEl = vnode.context.$refs[refName]
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind() {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  },
})
