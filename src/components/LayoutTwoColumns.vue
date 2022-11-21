<script>
import { h } from 'vue'

// Layout to display the two columns: a main content in the left and two sections in the right side
export default {
  name: 'LayoutTwoColumns',
  render() {
    return h( 'div',
      {
        attrs: {
          class: 'layout',
        },
      },
      [
        // slot to render on the left side
        this.$slots.left(),
        h(
          'div',
          {
            attrs: {
              class: 'col-right',
            },
          },
          [
            // slot to render on the upper right side
            this.$slots.upperRight(),
            // slot to render on the bottom of the right side
            this.$slots.bottomRight(),
          ],
        ),
      ],
    )
  },
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  gap: 25px;
  grid-template-columns: 1fr 360px;
  overflow-y: auto;
  padding: 25px;

  .col-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
