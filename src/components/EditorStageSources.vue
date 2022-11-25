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
          :protocol="source.kind"
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

<script>
import { mapMutations, mapState } from 'vuex'
import { ADD_SOURCE } from '@/store/mutation-types'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import Fieldset from '@/components/Fieldset.vue'
import EditorSource from '@/components/EditorSource.vue'

export default {
  name: 'EditorStageSources',
  components: {
    EditorSource,
    Fieldset,
    LayoutTwoColumns,
  },
  computed: {
    ...mapState({
      sources: state => {
        return state.rad.radRequest.getMarkup().retrieve
      },
      currentFocus: state => state.rad.currentFocus,
    }),
    showAddSourceBtn() {
      return (
        (this.sources.length && this.sources[0].kind !== 'RNG') ||
        this.sources.length <= 0
      )
    },
  },
  watch: {
    async currentFocus(val, oldVal) {
      if (val || Number.isInteger(val)) {
        // wait to render deleted stage
        await this.$nextTick()

        const refs = this.$refs[`source-${val}`]
        if (refs && refs.length) {
          await this.$nextTick()

          refs[0].$el.scrollIntoView()
          this.$store.commit('clearCurrentFocus')
        }
      }
    },
  },
  async mounted() {
    const refs = this.$refs[`source-${this.currentFocus}`]

    if (refs && refs.length) {
      await this.$nextTick()

      refs[0].$el.scrollIntoView()
      this.$store.commit('clearCurrentFocus')
    }
  },
  methods: {
    ...mapMutations({
      addSource: ADD_SOURCE,
      clearDataRequestResult: 'clearDataRequestResult',
    }),
    pushNewSource() {
      this.addSource()
    },
  },
}
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
