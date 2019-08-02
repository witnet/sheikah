<template>
<div>
  <RadonStage class="stage" :retrieve="retrieve" />
  <RadonStage class="stage" :aggregate="aggregate" />
  <RadonStage class="stage" :consensus="consensus" />
</div>
</template>

<script>
import { mapState } from 'vuex'
import RadonStage from '@/components/RadonStage.vue'

export default {
  name: 'Editor',
  components: {
    RadonStage,
  },
  computed: {
    ...mapState({
      retrieve: state => state.rad.radRequest.retrieve,
      aggregate: state => state.rad.radRequest.aggregate,
      consensus: state => state.rad.radRequest.consensus,
    }),
  },
}
</script>
