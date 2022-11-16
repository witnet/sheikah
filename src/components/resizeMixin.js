/**
 * @mixin
 */
export default {
  props: {
    /**
     * Set size of the element
     */
    autoresize: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    /* 0-timeout to get the already changed text */
    _delayedResize(ref) {
      window.setTimeout(() => this._resize(ref), 0)
    },

    _resize(ref) {
      ref.style.height = 'auto'
      ref.style.height = Number(ref.scrollHeight) + 5 + 'px'
    },

    makeItAutoresizeable(ref) {
      ref.addEventListener('change', () => this._resize(ref), false)
      ref.addEventListener('cut', () => this._delayedResize(ref), false)
      ref.addEventListener('paste', () => this._delayedResize(ref), false)
      ref.addEventListener('drop', () => this._delayedResize(ref), false)
      ref.addEventListener('keydown', () => this._delayedResize(ref), false)
    },
  },
}
