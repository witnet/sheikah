<template>
  <LayoutTwoColumns>
    <template #left>
      <div class="sources">
        <EditorSource
          v-for="(source, index) in sources"
          :key="sources[index].scriptId"
          :ref="`source-${index}`"
          class="source"
          :url="source.url || ''"
          :headers="JSON.stringify(source.headers) || ''"
          :body="JSON.stringify(source.body) || ''"
          :kind-options="source.kindOptions"
          :content-type-options="source.contentTypeOptions"
          :protocol="source.kindOptions[source.kind]"
          :protocol-index="Number(source.kind)"
          :content-type="source.contentType"
          :index="index"
        />
        <el-button
          v-if="showAddSourceBtn"
          class="add-source"
          type="primary"
          data-test="add-source"
          @click="pushNewSource"
        >
          {{ $t('add_source') }}
        </el-button>
      </div>
    </template>
    <template #upperRight>
      <Fieldset :title="$t('source_description_title')" type="help">
        <div>
          <p>{{ $t('source_description_0') }}</p>
          <p>{{ $t('source_description_1') }}</p>
          <p>{{ $t('source_description_2') }}</p>
        </div>
      </Fieldset>
    </template>

    <template #bottomRight>
      <Fieldset :title="$t('source_description_title_2')" type="help">
        <div>
          <p>{{ $t('source_description_3') }}</p>
          <p>{{ $t('source_description_4') }}</p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, watch, onMounted, nextTick, toRefs, reactive } from 'vue'
import { ADD_SOURCE } from '@/store/mutation-types'
import { Kind } from '@/types'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import Fieldset from '@/components/Fieldset.vue'
import EditorSource from '@/components/EditorSource.vue'
import { getIndexFromProtocolKind } from '@/utils/protocolDictionary'
const store = useStore()
const sources = computed(() => store.state.rad.radRequest.getMarkup().retrieve)
let sourceRefs: { [key: string]: any } = reactive({})
const currentFocus = computed(() => store.state.rad.currentFocus)
const firstSource = computed(() => sources.value[0])
const isRng = computed(() => {
  return (
    firstSource.value.kind ===
    getIndexFromProtocolKind(firstSource.value.kindOptions, Kind.Rng)
  )
})
const showAddSourceBtn = computed(() => {
  return (sources.value.length && !isRng.value) || sources.value.length <= 0
})
watch(currentFocus, async val => {
  if (val || Number.isInteger(val)) {
    // wait to render deleted stage
    await nextTick()

    const refs: any = sourceRefs[`source-${val}`]
    if (refs && refs.length) {
      await nextTick()

      refs[0].$el.scrollIntoView()
      store.commit('clearCurrentFocus')
    }
  }
})

onMounted(async () => {
  sources.value.forEach((_source: any, index: number) => {
    sourceRefs[`source-${index}`] = `source-${index}`
  })
  sourceRefs = toRefs(sourceRefs)
  const refs = sourceRefs[`source-${currentFocus.value}`]
  if (sourceRefs && Object.values(sourceRefs).length && refs) {
    await nextTick()
    refs[0].$el.scrollIntoView()
    store.commit('clearCurrentFocus')
  }
})

const pushNewSource = () => store.commit(ADD_SOURCE)
</script>

<style scoped lang="scss">
.sources {
  display: flex;
  flex-direction: column;

  .source {
    margin-bottom: 25px;
  }

  .add-source {
    align-self: flex-end;
    width: min-content;
  }
}
</style>
