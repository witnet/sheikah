<template>
  <div class="card">
    <p class="title">Data source #{{ source.index }} <span class="name"> url.com </span></p>
    <div class="container">
      <RadonScript
        :script="source.script"
        stage="retrieve"
        :sourceIndex="source.index"
        :scriptId="source.scriptId"
      />
      <div class="script-info"></div>
    </div>
  </div>
</template>

<script>
import RadonScript from '@/components/RadonScript'
export default {
  name: 'SourceCard',
  props: {
    source: [Object, Array],
  },
  components: {
    RadonScript,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  .title {
    font-size: 16px;
    font-weight: medium;
    color: $alt-grey-5;
    margin-bottom: 8px;
    .name {
      color: $grey-3;
      font-style: medium italic;
    }
  }

  .container {
    border: 1px solid $grey-1;
    box-shadow: $main-box-shadow;
    background: $white;
    border-radius: 2px;
    font-size: 16px;
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto;
    .script-info {
      background-color: $yellow-0;
      border: 1px solid $yellow-3;
    }
  }
}
</style>
