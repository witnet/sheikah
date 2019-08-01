<template>

<div>
  <TopBar :tabs="tabs" />
  <div class="container-templates">
    <TemplateCard class="card" v-for="template in templates" :key="template.content">
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
        content: 'Follow Witnet Foundation on Twitter to get daily updates on the progress of the project.',
      },
      {
        header: 'Template 2',
        content: 'Join the official Witnet community Discrod room to discuss with the rest of the community and get direct support from the developers.',
      },
      {
        header: 'Template 3',
        content: 'Follow Witnet Foundation on Medium to read different articles stating our vision and future roadmap.',
      },
      {
        header: 'Template 4',
        content: 'You can write us directly for any inquiry not appropriate for any of the other channels.',
      },
      {
        header: 'Template 5',
        content: 'Join other members of the Witnet Community at the official Telegram group.',
      },
      {
        header: 'Template 6',
        content: 'GitHub is where the Witnet protocol development takes place. Are you a programmer? Your contributions are more than welcome!',
      },
      {
        header: 'Template 7',
        content: 'The space for linking articles, informal discussion, kitten pictures and occasional memes.',
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
