import Vue from 'vue'

Vue.directive('focus', {
  update: function (el, binding) {
    if (binding.arg === true) {
      if (el.getElementsByTagName('input')) {
        el.getElementsByTagName('input')[0].focus()
      } else {
        el.focus()
      }
    }
  },
  inserted: function (el) {
    // It focus the element and add support for element ui inputs
    if (el.getElementsByTagName('input')) {
      el.getElementsByTagName('input')[0].focus()
    } else {
      el.focus()
    }
  },
})
