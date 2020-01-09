<template>
  <div class="card">
    <p class="header">
      GENERATED ADDRESSES
    </p>
    <div data-test="addresses-container" class="content">
      <p
        :data-test="'address-' + page + '-' + index"
        class="address"
        v-for="(address, index) in paginatedAddresses"
        :key="address.address"
      >
        {{ address.address }}
      </p>
    </div>
    <div class="pagination-nav">
      <button
        data-test="paginate-to-left"
        class="page-link"
        v-if="page != 1"
        @click="toggleDirectionLeft(page)"
      >
        <font-awesome-icon class="icon-left" icon="angle-left" />
      </button>
      <button
        :data-test="'page-1'"
        v-show="setPages.length >= 1"
        class="page-link static"
        :class="[firstItemActive ? 'active' : '']"
        @click="togglePaginationButton('first')"
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
        :data-test="'page-' + setPages.length"
        v-show="setPages.length > 0 && setPages.length >= 5"
        class="page-link static"
        :class="[lastItemActive ? 'active' : '']"
        @click="togglePaginationButton('last')"
      >
        {{ setPages.length }}
      </button>
      <button
        data-test="paginate-to-right"
        @click="toggleDirectionRight(page)"
        v-if="page < setPages.length"
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
      page: 1,
      perPage: 5,
      middleItemActive: null,
      lastItemActive: false,
      firstItemActive: true,
    }
  },
  computed: {
    // TODO: pagination needs a refactor (in Issue: #823)
    setPages() {
      let pages = []
      let numberOfPages = Math.ceil(this.addresses.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index)
      }
      return pages
    },
    paginatedAddresses() {
      return this.paginate(this.addresses)
    },
    rangePages() {
      let range = []
      let lenghtRange = 4
      if (this.page !== 1 && this.page !== this.setPages.length) {
        lenghtRange = this.page + 2
      }
      if (this.setPages.length === 0 || this.setPages.length === 1) {
        return range
      }
      if (this.setPages.length === 2) {
        lenghtRange = 2
      }
      if (this.setPages.length === 3) {
        lenghtRange = 3
      }
      if (this.setPages.length === 4) {
        lenghtRange = 4
      }
      if (this.setPages.length >= 5) {
        lenghtRange = this.page + 3
      }
      if (this.page === 1) {
        for (let index = 2; index <= lenghtRange; index++) {
          range.push(index)
        }
      } else if (
        this.page === this.setPages.length ||
        this.page + 1 === this.setPages.length ||
        this.page + 2 === this.setPages.length ||
        this.page + 3 === this.setPages.length
      ) {
        if (this.setPages.length >= 5) {
          for (let index = this.setPages.length - 3; index <= this.setPages.length - 1; index++) {
            range.push(index)
          }
        }
        if (this.setPages.length < 5) {
          for (let index = 2; index <= lenghtRange; index++) {
            range.push(index)
          }
        }
      } else if (this.page !== 1 && this.page !== this.setPages.length) {
        for (let index = this.page; index <= lenghtRange; index++) {
          range.push(index)
        }
      }
      return range
    },
  },
  methods: {
    toggleDirectionRight: function(position) {
      position++
      this.page++
      if (position === 1) {
        this.firstItemActive = true
        this.lastItemActive = false
        this.middleItemActive = null
      } else if (position === this.setPages.length) {
        this.lastItemActive = true
        this.firstItemActive = false
        this.middleItemActive = null
      } else {
        this.middleItemActive = position
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    toggleDirectionLeft: function(position) {
      this.page--
      position--
      if (position === this.setPages.length) {
        this.lastItemActive = true
        this.firstItemActive = false
        this.middleItemActive = null
      } else if (position === 1) {
        this.firstItemActive = true
        this.lastItemActive = false
        this.middleItemActive = null
      } else if (position < this.setPages.length) {
        this.middleItemActive = position
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    togglePaginationButton: function(position) {
      if (position === 'last') {
        this.page = this.setPages.length
        this.lastItemActive = true
        this.firstItemActive = false
        this.middleItemActive = null
      } else if (position === 'first') {
        this.page = 1
        this.firstItemActive = true
        this.lastItemActive = false
        this.middleItemActive = null
      } else {
        this.page = position
        this.middleItemActive = position
        this.firstItemActive = false
        this.lastItemActive = false
      }
    },
    paginate(posts) {
      let page = this.page
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      return posts.slice(from, to)
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
