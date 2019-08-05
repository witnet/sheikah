<template>
<div>
  <ToolBar/>
  <StageBar v-on:change-stage="changeStage"/>
  <RadonStage class="stage" :stage="this.currentStage" :script="currentScript"/>
  <Carousel/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import RadonStage from '@/components/RadonStage.vue'
import ToolBar from '@/components/ToolBar.vue'
import Carousel from '@/components/Carousel.vue'
import StageBar from '@/components/StageBar.vue'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
    Carousel,
    StageBar,
  },
  data(){
    return {
      currentStage: "retrieve"
    }
  },
  methods:{
   changeStage: function (stage) {
    this.currentStage = stage
   }
  },
  computed: {
    ...mapState({
      retrieve: state => state.rad.radRequest.retrieve,
      aggregate: state => state.rad.radRequest.aggregate,
      consensus: state => state.rad.radRequest.consensus,
    }),
    currentScript: function(){
      if(this.currentStage === "retrieve") {
        return this.retrieve
      } else if (this.currentStage === "aggregate") {
        return this.aggregate
      } else if(this.currentStage === "consensus") {
        return this.consensus
      }
    }
  },
  data(){
    return{
      tabs: [
        {icon: 'Redo', 
        action: 'redo changes' ,
        class:'end'
        },
        {icon: 'Undo', 
        action: 'Undo changes',
        class:'end'
        },
        {icon: 'Save', 
        action: 'Save changes',
        class:'end'
        },
        {icon: 'Try data request', 
        action: 'Try data request',
        class:'end'
        }
      ],
    }
  }
}
</script>
