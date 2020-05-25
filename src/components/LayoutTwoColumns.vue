<script>
// Layout to display the two columns: a main content in the left and two sections in the right side
export default {
  name: 'LayoutTwoColumns',
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'layout',
        },
      },
      [
        // slot to render on the left side
        this.$slots.left,
        createElement(
          'div',
          {
            attrs: {
              class: 'col-right',
            },
          },
          [
            // slot to render on the upper right side
            this.$slots.upperRight,
            // slot to render on the bottom of the right side
            this.$slots.bottomRight,
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
  grid-template: 1fr / 1fr 350px;
  padding: 25px;
  overflow: auto;

  .col-right {
    display: grid;
    gap: 26px;
    grid-template: auto 1fr / 1fr;
  }
}
</style>

<docs>
### Example

```jsx
  <LayoutTwoColumns>
    <template #left>
      <div :style="{ background: '#E6D4F7', height: '50vh' }">
        Main content
      </div>
    </template>

    <template #upperRight>
      <div :style="{ background: '#8AE5B1', height: '20vh'}">
        Upper right
      </div>
    </template>

    <template #bottomRight>
      <div :style="{ background: '#FCF4D9' }">
        Bottom right
      </div>
    </template>
  </LayoutTwoColumns>
```
</docs>
