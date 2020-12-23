<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <div class="sources">
        <EditorSource
          v-for="(source, index) in sources"
          :key="sources[index].scriptId"
          :ref="`source-${index}`"
          class="source"
          :url="source.url"
          :protocol="source.kind"
          :content-type="source.contentType"
          :index="index"
        />
        <el-button
          class="add-source"
          type="primary"
          data-test="add-source"
          @click="pushNewSource"
        >
          {{ $t('add_source') }}
        </el-button>
      </div>
    </template>
    <template v-slot:upperRight>
      <Fieldset :title="$t('source_description_title')" type="help">
        <div>
          <p>
            {{ $t('source_description[0]') }}
          </p>
          <p>
            {{ $t('source_description[1]') }}
          </p>
          <p>
            {{ $t('source_description[2]') }}
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('source_description_title_2')" type="help">
        <div>
          <p>
            {{ $t('source_description[3]') }}
          </p>
          <p>
            {{ $t('source_description[4]') }}
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { ADD_SOURCE } from '@/store/mutation-types'
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import Fieldset from '@/components/Fieldset'
import EditorSource from '@/components/EditorSource'

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

<docs>
### Example

```jsx
  <EditorStageSources />
```
</docs>
