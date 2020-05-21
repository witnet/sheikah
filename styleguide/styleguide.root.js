import store from '@/store'

export default previewComponent => {
  return {
    store,
    render(createElement) {
      return createElement(previewComponent)
    },
  }
}
