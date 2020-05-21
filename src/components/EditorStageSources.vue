<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <div class="sources">
        <EditorSource
          v-for="(source, index) in sources"
          :key="index"
          class="source"
          title="title"
          subtitle="subtitle"
          :url="source.url"
          :protocol="source.kind"
          :content-type="source.contentType"
          :index="index"
        />
        <el-button
          class="add-source"
          type="primary"
          data-test="add-source"
          @click="addSource"
        >
          Add another source
        </el-button>
      </div>
    </template>
    <template v-slot:upperRight>
      <Fieldset title="About data sources" type="help">
        <div>
          <p>
            Data sources are each of the endpoints from which you want Witnet to
            retrieve the data. Most times, these will be the URLs of public
            APIs.
          </p>
          <p>
            There is no limit to the number of sources in a single Witnet
            request—although the more sources, the higher the fees will be.
          </p>
          <p>
            In a later step, each source will be given a companion script that
            lists operations that we want the witnesses to apply on the
            retrieved data. This enables you to get the information of your
            interest extracted out of larger data structures like JSON objects.
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset title="Choose your sources carefully" type="help">
        <div>
          <p>
            Data sources are each of the endpoints from which you want Witnet to
            retrieve the data. Most times, these will be the URLs of public
            APIs.
          </p>
          <p>
            There is no limit to the number of sources in a single Witnet
            request—although the more sources, the higher the fees will be.
          </p>
          <p>
            In a later step, each source will be given a companion script that
            lists operations that we want the witnesses to apply on the
            retrieved data. This enables you to get the information of your
            interest extracted out of larger data structures like JSON objects.
          </p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { ADD_SOURCE, DELETE_SOURCE } from '@/store/mutation-types'
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
    }),
  },
  methods: {
    ...mapMutations({
      addSource: ADD_SOURCE,
      deleteSource: DELETE_SOURCE,
    }),
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