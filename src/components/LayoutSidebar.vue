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
          this.$slots.default,
        ),
      ],
    )
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.layout {
  display: grid;
  grid-template: 1fr / auto 1fr;
  max-height: 100vh;

  .content {
    background: $alpha-purple;
    overflow: auto;
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
