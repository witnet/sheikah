<template>
  <div class="templates" data-test="templates">
    <div class="templates-bar">
      <p class="title">
        {{ $t('dr_templates') }}
      </p>
      <el-button class="import-btn" type="primary" @click="importTemplate">
        <div class="import-btn-content">
          <font-awesome-icon class="icon" icon="file-import" />
          {{ $t('import_templates') }}
        </div>
      </el-button>
    </div>

    <div class="container-templates">
      <div
        v-show="currentPage === 1"
        data-test="create-template"
        class="add"
        @click="createTemplateAndRedirect"
      >
        <CustomIcon class="add-btn" name="add" />
        <p class="text">{{ $t('create_template') }}</p>
      </div>
      <TemplateCard
        v-for="template in paginatedTemplates"
        :id="template.id"
        :key="template.id"
        :name="template.name"
        :sources="template.radRequest.retrieve.length"
        :description="template.description"
        @delete-template="handleDeleteTemplate({ id: template.id })"
        @toggle-modal="displayModalCreateDR(template)"
      />
    </div>

    <div
      v-show="templatesAdapted.length + 1 > templatesPerPage"
      class="pagination-nav"
    >
      <el-pagination
        :page-size="templatesPerPage"
        layout="prev, pager, next"
        :total="templatesAdapted.length + 1"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
    <input
      ref="fileInput"
      :style="{ display: 'none' }"
      type="file"
      @change="readFile"
    />
    <DeployDataRequest
      v-if="dialogVisible"
      :template="currentTemplate"
      :visible="dialogVisible"
      @close="closeDeployModal"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, computed, type Ref, toRefs, onBeforeMount } from 'vue'
import { CREATE_TEMPLATE } from '@/store/mutation-types'
import { TEMPLATES_PER_PAGE } from '@/constants'
import { useRouter } from 'vue-router'

const currentPage: Ref<number> = ref(1)
const dialogVisible: Ref<boolean> = ref(false)
const templatesPerPage = TEMPLATES_PER_PAGE
const currentTemplate = ref(null)
const store = useStore()
const router = useRouter()
const { templates } = toRefs(store.state.rad)
const { locale } = toRefs(store.state.wallet)

const templatesAdapted = computed(() => {
  return Object.entries(templates.value)
    .map((template: any) => {
      return {
        id: template[0],
        ...template[1],
      }
    })
    .sort((a, b) => parseInt(b.lastTimeOpened) - parseInt(a.lastTimeOpened))
})

const paginatedTemplates = computed(() => {
  const from =
    currentPage.value === 1
      ? 0
      : currentPage.value * templatesPerPage - templatesPerPage - 1

  const to =
    currentPage.value === 1
      ? templatesPerPage - 1
      : currentPage.value * templatesPerPage - 1

  return templatesAdapted.value.slice(from, to)
})

onBeforeMount(() => {
  store.dispatch('getTemplates')
})

const closeDeployModal = () => {
  dialogVisible.value = false
}
const createTemplateAndRedirect = () => {
  store.commit(CREATE_TEMPLATE, { locale: locale })
  router.push('/request/editor')
}
const handleDeleteTemplate = ({ id }: { id: string }) => {
  console.log(`template to delete: ${id}`)
  if (paginatedTemplates.value.length === 1 && currentPage.value !== 1) {
    currentPage.value -= 1
  }
  store.dispatch('deleteTemplate', { id })
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
const displayModalCreateDR = (currentTemplate: any) => {
  dialogVisible.value = true
  currentTemplate.value = currentTemplate
}
const fileInput = ref()
const readFile = () => {
  const file = fileInput.value.files[0]
  const reader = new FileReader()
  reader.addEventListener(
    'load',
    () => {
      const fileText: string | ArrayBuffer | null = reader.result
      try {
        if (fileText) {
          const template = JSON.parse(fileText?.toString())
          // try to save template if it is valid
          store.commmit('saveTemplate', { template })

          // clear file input to be able to try to load the same file twitce
          fileInput.value = ''
        }
      } catch (error) {
        console.log('Error parsing json')
      }
    },
    false,
  )
  reader.readAsText(file)
}

const importTemplate = () => {
  fileInput.value.click()
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.templates {
  padding-bottom: 16px;

  .templates-bar {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    height: 70px;
    justify-content: right;
    text-align: right;

    .title {
      font-weight: bold;
      margin: 16px 0 0 32px;

      .templates-number {
        color: var(--text-medium-emphasis);
        font-size: 14px;
        font-weight: normal;
        margin-left: 8px;
      }
    }

    .import-btn {
      margin: 0 16px 0 auto;
      .import-btn-content {
        display: flex;
        gap: 4px;
      }
    }
  }

  .pagination-nav {
    padding: 16px 0 0;
    text-align: center;
  }

  .container-templates {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill, 300px);
    margin: 0 32px;
    overflow-y: auto;

    .add {
      align-items: center;
      background-color: var(--card-background);
      border: var(--card-border);
      border-radius: 2px;
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      height: 300px;
      justify-content: center;
      width: 300px;

      .add-btn {
        width: 50px;
      }

      .text {
        color: var(--text-medium-emphasis);
        font-size: 12px;
        font-style: italic;
        margin-top: 24px;
      }

      &:hover {
        border: var(--card-active-border);
        cursor: pointer;
      }
    }
  }
}
</style>
