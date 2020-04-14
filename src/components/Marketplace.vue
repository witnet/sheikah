<template>
  <div data-test="marketplace">
    <div class="header">
      <p class="title">
        <span class="sheikah-title">Sheikah </span>Marketplace
        <span class="subtitle">Hundreds of smart contracts ready to be deployed</span>
      </p>
    </div>
    <div class="row">
      <div v-if="Object.entries(templates)" class="col deployed-templates-list">
        <TemplateCard
          type="marketplace"
          v-for="template in paginatedItems"
          class="card"
          :name="template.name"
          :id="template.id"
          :description="template.description"
          :key="template.id"
        />
        <div v-show="templates.length" class="pagination">
          <el-pagination
            class="marketplace"
            @current-change="handleCurrentChange"
            :page-size="itemsPerPage"
            layout="prev, pager, next"
            :total="templates.length"
            :current-page="currentPage"
          />
        </div>
      </div>
      <div class="col col-right">
        <div class="tags">
          <p class="title">
            TAGS
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TemplateCard from './card/TemplateCard'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'marketplace',
  components: {
    TemplateCard,
  },
  data() {
    return {
      tabs: [{ name: 'Marketplace', link: '/marketplace' }],
      currentPage: 1,
      itemsPerPage: 4,
    }
  },
  methods: {
    ...mapActions({
      retrieveTemplates: 'retrieveTemplates',
    }),
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
  computed: {
    paginatedItems() {
      const from = this.currentPage * this.itemsPerPage - this.itemsPerPage
      const to = this.currentPage * this.itemsPerPage
      return this.templates.slice(from, to)
    },
    ...mapState({
      templates: state => {
        return state.marketplace.templates
      },
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
.templates-bar {
  border-bottom: 1px solid $grey-1;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: space-between;
  padding-left: 48px;
  text-align: right;

  .title {
    color: $alt-grey-5;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 16px;
    text-decoration: none;
    border-bottom: 2px solid $purple-4;
    color: $purple-4;
  }
  .button-container {
    padding: 8px;
  }
}
.header {
  background-color: rgb(255, 42, 127);
  margin: 40px;
  padding: 48px 48px 48px 100px;
  text-align: left;
  .title {
    color: $white;
    font-size: 32px;
    .sheikah-title {
      font-weight: bold;
      color: rgb(150, 5, 62);
    }
    .subtitle {
      color: $white;
      margin-left: 32px;
      font-size: 18px;
      font-style: italic;
    }
  }
}
.row {
  display: flex;
  justify-content: center;
}
.deployed-templates-list {
  flex: 0 0 55vw;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  margin: 32px 0px 32px 72px;
  .pagination {
    padding: 16px 0px 16px 0px;
    text-align: center;
    &.el-pagination {
      .el-pager li.active {
        color: red;
      }
    }
  }
  .card {
    flex: 0 1 calc(40% - 2em);
  }
}
.col-right {
  flex: 0 0 300px;
  height: 55vh;
  margin-top: 32px;
  .tags {
    min-width: 300px;
    .title {
      border-bottom: 1px solid $grey-1;
      margin-bottom: 24px;
      color: $alt-grey-3;
      font-weight: bold;
    }
  }
}
</style>
