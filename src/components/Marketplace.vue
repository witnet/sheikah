<template>
  <div data-test="marketplace">
    <div class="header">
      <p class="title">
        <span class="sheikah-title">{{ this.$t('sheikah') }}</span
        >{{ this.$t('marketplace') }}
        <span class="subtitle">{{ this.$t('marketplace_subtitle') }}</span>
      </p>
    </div>
    <div class="row">
      <div v-if="Object.entries(templates)" class="col deployed-templates-list">
        <TemplateCard
          v-for="template in paginatedItems"
          :id="template.id"
          :key="template.id"
          type="marketplace"
          class="card"
          :name="template.name"
          :description="template.description"
        />
        <div v-show="templates.length" class="pagination">
          <el-pagination
            class="marketplace"
            :page-size="itemsPerPage"
            layout="prev, pager, next"
            :total="templates.length"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="col col-right">
        <div class="tags">
          <p class="title">
            {{ this.$t('tags').toUpperCase() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TemplateCard from './card/TemplateCard'

export default {
  name: 'Marketplace',
  components: {
    TemplateCard,
  },
  data() {
    return {
      tabs: [{ name: this.$t('marketplace'), link: '/marketplace' }],
      currentPage: 1,
      itemsPerPage: 4,
    }
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
  methods: {
    ...mapActions({
      retrieveTemplates: 'retrieveTemplates',
    }),
    handleCurrentChange(val) {
      this.currentPage = val
    },
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
    border-bottom: 2px solid $purple-4;
    color: var(--text-medium-emphasis);
    color: $purple-4;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 16px;
    text-decoration: none;
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
      color: rgb(150, 5, 62);
      font-weight: bold;
    }

    .subtitle {
      color: $white;
      font-size: 18px;
      font-style: italic;
      margin-left: 32px;
    }
  }
}

.row {
  display: flex;
  justify-content: center;
}

.deployed-templates-list {
  display: flex;
  flex: 0 0 55vw;
  flex-wrap: wrap;
  justify-content: center;
  margin: 32px 0 32px 72px;

  .pagination {
    padding: 16px 0 16px 0;
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
      color: $alt-grey-3;
      font-weight: bold;
      margin-bottom: 24px;
    }
  }
}
</style>
