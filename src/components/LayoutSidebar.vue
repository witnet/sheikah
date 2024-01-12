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
        this.$slots.sidebar()[0],
        createElement(
          'div',
          {
            attrs: {
              class: 'main',
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
  background: var(--app-background-color);
  display: grid;
  grid-template-columns: 70px 1fr;
}

.sidebar {
  grid-row-end: span 2;
}

.main {
  background: var(--app-background-color);
  min-height: 100vh;
}
</style>
