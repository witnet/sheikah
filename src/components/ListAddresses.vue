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
        v-for="(address, index) in paginatedItems"
        :key="address.address"
        :data-test="'address-' + currentPage + '-' + index"
        class="address"
      >
        {{ address.address }}
      </p>
    </div>
    <div v-show="addresses.length" class="pagination-nav">
      <el-pagination
        :page-size="itemsPerPage"
        layout="prev, pager, next"
        :total="addresses.length"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    addresses: {
      type: Array,
      required: true,
    },
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
  margin-top: 40px;
  min-width: 200px;

  .header {
    border-bottom: 1px solid $grey-1;
    color: $alt-grey-3;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .content {
    box-shadow: 0 0 5px 0 rgba(29, 29, 29, 0.1);
    overflow-wrap: break-word;
    padding: 32px;

    .no-transactions-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      padding: 24px;

      .no-transactions-text {
        color: $alt-grey-5;
        font-size: 16px;
        font-style: italic;
        font-weight: 400;
      }

      .no-transactions-img {
        margin-bottom: 16px;
        width: 40px;
      }
    }

    .address {
      border-bottom: 1px solid $grey-1;
      color: $black;
      font-weight: 500;
      padding: 16px;
      text-align: center;
      width: 250px;
    }
  }

  .pagination-nav {
    padding: 16px 0 16px 0;
    text-align: center;
  }
}
</style>
