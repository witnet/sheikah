<template>
  <div data-test="marketplace">
    <div class="templates-bar">
      <div v-for="tab in tabs" class="title" :key="tab.link">
        {{ tab.name }}
      </div>
    </div>
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
          v-for="template in templates"
          class="card"
          :name="template.name"
          :id="template.id"
          :description="template.description"
          :key="template.id"
        />
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
import { mapState } from 'vuex'

export default {
  name: 'marketplace',
  components: {
    TemplateCard,
  },
  data() {
    return {
      tabs: [{ name: 'Marketplace', link: '/marketplace' }],
    }
  },
  beforeCreate() {
    this.$store.dispatch('retrieveTemplates')
  },
  computed: {
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
  border-bottom: 1px solid $grey-0;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: space-between;
  padding-left: 48px;
  text-align: right;

  .title {
    color: $grey-5;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 16px;
    text-decoration: none;
    border-bottom: 2px solid $blue-6;
    color: $blue-6;
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
  justify-content: space-around;
}
.deployed-templates-list {
  flex: 0 0 55vw;
  flex-wrap: wrap;
  display: flex;
  justify-content: left;
  margin: 32px 0px 32px 72px;
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
      border-bottom: 1px solid $grey-0;
      margin-bottom: 24px;
      color: $grey-4;
      font-weight: bold;
    }
  }
}
</style>
