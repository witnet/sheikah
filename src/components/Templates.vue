<template>

<div>
  <TopBar :tabs="tabs" />
  <div class="container-templates">
    <TemplateCard class="card" v-for="template in templates" :key="template.header">
      <template v-slot:title>
        {{template.header}}
      </template>
      <template v-slot:description>
        {{template.content}}
      </template>
    </TemplateCard>
    <router-link class="add" to="/request/editor">
    <img class="add-btn" src="@/resources/svg/add.svg">
    </router-link>
  </div>
</div>
</template>

<script>
import TemplateCard from './card/TemplateCard'
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'Templates',
  components:{
    TemplateCard,
    TopBar,
  },

  data (){
    return {
      tabs: [
        { name: 'Templates', link: '/request/templates' },
      ],
      templates: [
      {
        header: 'Template 1',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      },
      {
        header: 'Template 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      },
      {
        header: 'Template 3',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      },
      {
        header: 'Template 4',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      },
      {
        header: 'Template 5',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      },
      {
        header: 'Template 6',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      },
      {
        header: 'Template 7',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dapibus taciti suspendisse vehicula, magna in hac sed fermentum sociosqu parturient viverra justo.',
      }]
    }
  }
}
</script>
<style lang="scss">
.container-templates{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin:25px;

  .card{
    flex: 0 1 calc(30% - 1em);
    margin:20px;
  }
  .add{
    display: flex;
    justify-content: center;
    flex: 0 1 calc(30% - 1em);
    margin:20px;
    
    .add-btn{
      width: 50px;
      &:hover{
        cursor: pointer;
      }
    }
}
}

</style>
