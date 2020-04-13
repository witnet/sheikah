import store from '../src/store'

export default previewComponent => {
  return {
    store,
    render(createElement) {
      return createElement(previewComponent)
    },
  }
}
