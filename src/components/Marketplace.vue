<template>
  <div data-test="marketplace">
    <h1>Marketplace</h1>

    <h2>Marketplace templates</h2>
    <div>
      <div v-for="template in templates" :key="template.id">
        <p>Name: {{ template.name }}</p>
        <p>Description: {{ template.description }}</p>
        <p>id: {{ template.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'marketplace',
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
