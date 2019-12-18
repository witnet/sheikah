<template>
  <div>
    <div class="templates-bar">
      <div v-for="tab in tabs" class="title" :key="tab.link">
        {{ tab.name }}
      </div>
      <div class="button-container">
        <Button type="primary" :onClick="importTemplate" class="import">Import template</Button>
      </div>
    </div>
    <div v-if="Object.entries(templates)" class="container-templates">
      <div class="add">
        <router-link to="/request/editor">
          <img @click="createTemplate" class="add-btn" src="@/resources/svg/add.svg" />
        </router-link>
      </div>
      <TemplateCard
        v-for="template in templates"
        class="card"
        :name="template.name"
        :id="template.id"
        :description="template.description"
        :key="template.id"
        :date="template.creationDate"
        v-on:change-name="changeName"
      />
    </div>
    <div v-else>
      You don't have templates yet.
    </div>
    <input :style="{ display: 'none' }" type="file" ref="fileInput" @change="readFile" />
  </div>
</template>

<script>
import TemplateCard from './card/TemplateCard'
import Button from '@/components/Button.vue'
import { mapState } from 'vuex'
import { CREATE_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'Templates',
  components: {
    TemplateCard,
    Button,
  },
  beforeMount() {
    this.$store.dispatch('getTemplates')
  },
  data() {
    return {
      tabs: [{ name: 'Templates', link: '/request/templates' }],
    }
  },
  computed: {
    ...mapState({
      templates: state =>
        Object.entries(state.rad.templates)
          .map(template => {
            return {
              id: template[0],
              ...template[1],
            }
          })
          .sort((a, b) => parseInt(a.creationDate) - parseInt(b.creationDate)),
    }),
  },
  methods: {
    changeName({ name, id }) {
      this.$store.dispatch('changeTemplateName', { id, name })
    },
    createTemplate() {
      this.$store.commit(CREATE_TEMPLATE)
    },
    importTemplate() {
      this.$refs.fileInput.click()
    },
    readFile(e) {
      const file = this.$refs.fileInput.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          const fileText = reader.result
          try {
            const template = JSON.parse(fileText)
            // TODO: Validate template before save
            this.$store.dispatch('saveTemplate', { template })
          } catch (error) {
            console.log('Error parsing json')
          }
        },
        false
      )
      reader.readAsText(file)
    },
  },
}
</script>

<style lang="scss">
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

.container-templates {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin: 24px;

  .card {
    flex: 0 1 calc(30% - 1em);
    margin: 24px;
  }
  .add {
    display: flex;
    justify-content: center;
    flex: 0 1 calc(30% - 1em);
    align-items: center;
    margin: 24px;
    .add-btn {
      width: 50px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
