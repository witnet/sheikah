<script>
export default {
  mounted() {
    const listener = e => {
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return
      }
      this.$emit(e.type, e)
    }

    document.addEventListener(`click`, listener)
    document.addEventListener(`focus`, listener, true)
    this.$once(`hook:beforeUnmount`, () => {
      document.removeEventListener(`click`, listener)
      document.removeEventListener(`focus`, listener, true)
    })
  },
  render() {
    return this.$slots.default()[0]
  },
}
</script>
