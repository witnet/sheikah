<template>
  <div class="card">
    <p class="header">
      GENERATED ADDRESSES
    </p>
    <div data-test="addresses-container" class="content">
      <div v-if="addresses.length === 0" class="no-transactions-container">
        <img class="no-transactions-img" src="@/resources/svg/empty.svg" />
        <p class="no-transactions-text">You don't have addresses</p>
      </div>
      <p
        :data-test="'address-' + currentPage + '-' + index"
        class="address"
        v-for="(address, index) in paginatedItems"
        :key="address.address"
      >
        {{ address.address }}
      </p>
    </div>
    <div v-show="addresses.length" class="pagination-nav">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="itemsPerPage"
        layout="prev, pager, next"
        :total="addresses.length"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    addresses: Array,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
    }
  },
  computed: {
    paginatedItems() {
      const from = this.currentPage * this.itemsPerPage - this.itemsPerPage
      const to = this.currentPage * this.itemsPerPage
      return this.addresses.slice(from, to)
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  min-width: 200px;
  max-height: 400px;
  margin-top: 40px;
  .header {
    border-bottom: 1px solid $grey-1;
    margin-bottom: 24px;
    color: $alt-grey-3;
    font-weight: bold;
  }
  .content {
    overflow-wrap: break-word;
    box-shadow: 0 0px 5px 0px rgba(29, 29, 29, 0.1);
    padding: 32px;
    .no-transactions-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      .no-transactions-text {
        font-size: 16px;
        font-weight: 400;
        font-style: italic;
        color: $alt-grey-5;
      }
      .no-transactions-img {
        width: 40px;
        margin-bottom: 16px;
      }
    }
    .address {
      text-align: center;
      width: 250px;
      border-bottom: 1px solid $grey-1;
      padding: 16px;
      color: $black;
      font-weight: 500;
    }
  }
  .pagination-nav {
    padding: 16px 0px 16px 0px;
    text-align: center;
  }
}
</style>
