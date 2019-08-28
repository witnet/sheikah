<template>
  <div>
    <ToolBar />
    <StageBar v-on:change-stage="changeStage" />
    <RadonStage class="stage" :stage="currentStage" :script="currentScript" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RadonStage from '@/components/RadonStage.vue'
import ToolBar from '@/components/ToolBar.vue'
import StageBar from '@/components/StageBar.vue'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
    StageBar,
  },
  methods: {
    changeStage: function(stage) {
      this.currentStage = stage
    },
  },
  computed: {
    ...mapState({
      currentTemplate: state => {
        console.log('current template---->', state.rad.currentTemplate)
        return state.rad.currentTemplate.getMarkup()
      },
    }),
    currentScript: function() {
      console.log(2)
      if (this.currentStage === 'retrieve') {
        return this.currentTemplate.radRequest.retrieve
      } else if (this.currentStage === 'aggregate') {
        return this.currentTemplate.radRequest.aggregate.script
      } else if (this.currentStage === 'tally') {
        return this.currentTemplate.radRequest.tally.script
      } else {
        return null
      }
    },
  },
  data() {
    console.log(1)
    return {
      currentStage: 'retrieve',
      tabs: [
        { icon: 'Redo', action: 'redo changes', class: 'end' },
        { icon: 'Undo', action: 'Undo changes', class: 'end' },
        { icon: 'Save', action: 'Save changes', class: 'end' },
        { icon: 'Try data request', action: 'Try data request', class: 'end' },
      ],
    }
  },
}
</script>
