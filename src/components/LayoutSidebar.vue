<script>
import Sidebar from '@/components/Sidebar.vue'
// Layout that displays the sidebar next to the content provided
export default {
  name: 'LayoutSidebar',
  components: {
    Sidebar,
  },
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'layout',
        },
      },
      [
        createElement(Sidebar),
        createElement(
          'div',
          {
            attrs: {
              class: 'content',
            },
          },
          /** @slot Default slot will be rendered next to the sidebar */
          this.$slots.default
        ),
      ]
    )
  },
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template: 1fr / auto 1fr;
  max-height: 100vh;
  .content {
    overflow: auto;
    padding: 25px;
  }
}
</style>

<docs>
### Example

```jsx
  <LayoutSidebar>
    <div :style="{ background: '#E6D4F7', height: '100%' }">
      <p>I'm next to the sidebar</p>
    </div>
  </LayoutSidebar>
```
</docs>
