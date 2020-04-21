<script>
// Layout to display the Transactions view
export default {
  name: 'LayoutTransactions',
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'layout',
        },
      },
      [
        // slot to render transaction list on the left side
        this.$slots.transactions,
        createElement(
          'div',
          {
            attrs: {
              class: 'col-right',
            },
          },
          [
            // slot to render the balace on the upper right side
            this.$slots.balance,
            // slot to render addreses on the bottom of the right side
            this.$slots.addresses,
          ]
        ),
      ]
    )
  },
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template: 1fr / 1fr 350px;
  gap: 25px;

  .col-right {
    display: grid;
    grid-template: auto 1fr / 1fr;
    gap: 26px;
  }
}
</style>

<docs>
### Example

```jsx
  <LayoutTransactions>

    <template #transactions>
      <div :style="{ background: '#E6D4F7', height: '50vh' }">
        Transactions
      </div>
    </template>

    <template #balance>
      <div :style="{ background: '#8AE5B1', height: '20vh'}">
        Balance
      </div>
    </template>

    <template #addresses>
      <div :style="{ background: '#FCF4D9' }">
        Addresses
      </div>
    </template>

  </LayoutTransactions>
```
</docs>
