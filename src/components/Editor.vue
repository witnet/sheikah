<template>
<div>
  <ToolBar :tabs="tabs" />
  <RadonQuery/>
</div>
</template>

<script>

import { mapState } from 'vuex'
import RadonStage from '@/components/RadonStage.vue'
import ToolBar from '@/components/ToolBar.vue'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
  },
  computed: {
    ...mapState({
      retrieve: state => state.rad.radRequest.retrieve,
      aggregate: state => state.rad.radRequest.aggregate,
      consensus: state => state.rad.radRequest.consensus,
    }),
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
