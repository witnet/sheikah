import Vue from 'vue'

Vue.directive('focus', {
  inserted: function(el) {
    // It focus the element and add support for element ui inputs
    el.getElementsByTagName('input')
      ? el.getElementsByTagName('input')[0].focus()
      : el.focus()
  },
})
