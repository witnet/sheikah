<template>
  <el-checkbox-group
    v-model="checkedUtxos"
    class="checkbox-group"
    @change="handleCheckedUtxosChange"
  >
    <el-checkbox v-for="utxo in utxoInfo" :key="utxo[0]" :label="utxo[0]">
      <div class="utxo">
        <Address class="address" :value="utxo[0]" :blind="true" size="12px" />
        <Address class="address" :value="utxo[1].pkh" size="12px" />
        <Amount class="amount" :amount="utxo[1].amount" />
      </div>
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { mapState } from 'vuex'
import Amount from '@/components/Amount.vue'
import Address from '@/components/Address.vue'

export default {
  components: {
    Amount,
    Address,
  },
  data() {
    return {
      checkedUtxos: [],
    }
  },
  computed: {
    ...mapState({
      utxoInfo: state => state.wallet.utxoInfo,
    }),
  },
  methods: {
    handleCheckedUtxosChange(value) {
      this.$emit('change', this.checkedUtxos)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  background-color: var(--select-background-color);
  max-height: 240px;
  overflow-y: scroll;
  padding: 24px;

  .utxo {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .address {
      color: inherit;
    }

    .amount-container {
      font-size: 12px;
    }
  }
}
</style>
