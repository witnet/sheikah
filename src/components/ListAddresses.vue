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
    <div class="pagination-nav">
      <button
        data-test="paginate-to-left"
        class="page-link"
        v-if="currentPage !== 1"
        @click="toggleDirection('left', currentPage)"
      >
        <font-awesome-icon class="icon-left" icon="angle-left" />
      </button>
      <button
        :data-test="'page-1'"
        v-show="pages.length >= 1"
        class="page-link static"
        :class="[firstItemActive ? 'active' : '']"
        @click="togglePaginationButton(1)"
      >
        1
      </button>
      <button
        :data-test="'page-' + pageNumber"
        :key="pageNumber"
        v-for="pageNumber in rangePages"
        @click="togglePaginationButton(pageNumber)"
        class="page-link num"
        :class="{ active: pageNumber === middleItemActive }"
      >
        {{ pageNumber }}
      </button>
      <button
        :data-test="'page-' + pages.length"
        v-show="pages.length > 0 && pages.length >= itemsPerPage"
        class="page-link static"
        :class="[lastItemActive ? 'active' : '']"
        @click="togglePaginationButton(pages.length)"
      >
        {{ pages.length }}
      </button>
      <button
        data-test="paginate-to-right"
        @click="toggleDirection('right', currentPage)"
        v-if="currentPage < pages.length"
        class="page-link"
      >
        <font-awesome-icon class="icon-right" icon="angle-right" />
      </button>
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
      maxNumberOfpagesShown: 5,
      middleItemActive: null,
      lastItemActive: false,
      firstItemActive: true,
    }
  },
  computed: {
    // List of pages to show in pagination bar
    pagesLength() {
      return this.pages.length
    },
    pages() {
      const numberOfPages = Math.ceil(this.addresses.length / this.itemsPerPage)
      return this.fillTheRange(1, numberOfPages)
    },
    // paginated items
    paginatedItems() {
      const from = this.currentPage * this.itemsPerPage - this.itemsPerPage
      const to = this.currentPage * this.itemsPerPage
      return this.addresses.slice(from, to)
    },
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.pagesLength
    },
    // Returns the lenght of range for the middle pages of the pagination nav
    rangeLength() {
      let rangeLength = 4

      if (!this.isFirstPage && !this.isLastPage) {
        rangeLength = this.currentPage + 2
      }
      if (this.pagesLength <= 1) {
        rangeLength = 1
      }
      if (this.pagesLength < this.maxNumberOfpagesShown && this.pagesLength > 1) {
        rangeLength = this.pagesLength
      }
      if (this.pagesLength >= this.maxNumberOfpagesShown) {
        rangeLength = this.currentPage + 3
      }
      return rangeLength
    },
    // middle pages range of the pagination nav
    rangePages() {
      const { initial, last } = this.calculateRanges()
      return this.fillTheRange(initial, last)
    },
  },
  methods: {
    calculateRanges() {
      let initial = 2
      let last
      if (this.isFirstPage) {
        last = this.rangeLength
      } else if (this.isLastPage || this.currentPage >= this.pagesLength - 3) {
        if (this.pagesLength >= this.maxNumberOfpagesShown) {
          initial = this.pagesLength - 3
          last = this.pagesLength - 1
        } else {
          last = this.rangeLength
        }
      } else {
        initial = this.currentPage
        last = this.rangeLength
      }
      return { initial, last }
    },
    fillTheRange(initial, last) {
      return Array(last - initial + 1)
        .fill()
        .map(() => initial++)
    },
    activateButton() {
      if (this.isFirstPage) {
        this.lastItemActive = false
        this.middleItemActive = null
      } else if (this.isLastPage) {
        this.firstItemActive = false
        this.middleItemActive = null
      } else if (!this.isFirstPage && !this.isLastPage) {
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    toggleDirection(direction) {
      if (direction === 'right') {
        this.currentPage++
      } else {
        this.currentPage--
      }
      this.activateButton()
      if (this.isFirstPage) {
        this.firstItemActive = true
      }
      if (this.isLastPage) {
        if (this.pagesLength < this.maxNumberOfpagesShown) {
          this.middleItemActive = this.currentPage
        } else {
          this.lastItemActive = true
        }
      } else {
        this.middleItemActive = this.currentPage
      }
    },
    togglePaginationButton(newPage) {
      if (newPage === this.pagesLength) {
        this.currentPage = this.pagesLength
        this.lastItemActive = true
      } else if (newPage === 1) {
        this.currentPage = 1
        this.firstItemActive = true
      } else {
        this.currentPage = newPage
        this.middleItemActive = newPage
      }
      this.activateButton()
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
    border-bottom: 1px solid $grey-0;
    margin-bottom: 24px;
    color: $grey-4;
    font-weight: bold;
  }
  .content {
    overflow-wrap: break-word;
    border-radius: 2px;
    box-shadow: $default-box-shadow;
    padding: 32px;
    background-color: $alpha-blue;
    .no-transactions-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      .no-transactions-text {
        font-size: 16px;
        font-weight: 400;
        font-style: italic;
        color: $grey-3;
      }
      .no-transactions-img {
        width: 40px;
        margin-bottom: 16px;
      }
    }
    .address {
      text-align: center;
      width: 250px;
      border-bottom: 1px solid $grey-0;
      padding: 16px;
      color: $black;
      font-weight: 500;
    }
  }
  .pagination-nav {
    padding: 16px 0px 16px 0px;
    text-align: center;

    .page-link {
      padding: 8px;
      border-radius: 2px;
      border: none;
      background-color: transparent;
      color: $blue-6;
      font-size: 14px;
      margin: 8px;
    }
    .static {
      border: none;
      background-color: $blue-1;
      color: $grey-6;
    }
    .num {
      border: none;
      background-color: transparent;
      color: $grey-6;
    }
    .active {
      color: $blue-6;
      font-size: 16px;
    }
    :active,
    :focus,
    :hover {
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
