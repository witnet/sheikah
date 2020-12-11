<script>
// Layout that displays the sidebar next to the content provided
export default {
  name: 'LayoutSidebar',
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'layout',
        },
      },
      [
        this.$slots.sidebar[0],
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
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;

  .content {
    background: $alpha-purple;
    // overflow-y: auto;
    // padding-left: 70px;
    position: relative;
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
