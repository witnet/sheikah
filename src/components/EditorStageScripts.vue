<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <div class="scripts">
        <EditorScript
          v-for="(source, index) in sources"
          :key="index"
          class="script"
          :source="source"
          :results="results ? results[index].partial_results : null"
          :subscriptResults="subscriptResults"
          :finalResult="finalResult[index]"
        />
      </div>
    </template>
    <template v-slot:upperRight>
      <Fieldset title="About companion scripts" type="help">
        <div>
          <p>
            Each source can have a companion script that lists operations that
            we want the witnesses to apply on the retrieved data. This enables
            you to get the information of your interest extracted out of larger
            data structures like JSON objects.
          </p>
          <p>
            The diversity of operators that you can use in companion scripts is
            quite rich indeed: in addition to selecting specific pieces of data,
            you can also transform those so they are uniform and can be compared
            or aggregated together later in Step 3 of this editor.
          </p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset title="The rules of companion scripts" type="help">
        <div>
          <p
            >- Each operator is applied on the output of the previous
            operator.</p
          >
          <p
            >- Each script always start with a <em>String</em> or
            <em>Bytes</em> value.</p
          >
          <p>
            - Key-value data structures (roughly alike to Javascript objects,
            Python dictionaries or Solidity mappings) are called Map.
          </p>
          <p
            >- The final return type of a script is that of its last
            operator.</p
          >
          <p>
            - All source scripts in a single data request template must return
            exactly the same type.
          </p>
          <p>
            - Any operator arguments starting with a dollar sign ($) will be
            interpreted as a variable that can be customized by the user when
            deploying a new instance of this template.
          </p>
          <p
            >- Default values for variables can be defined in Step 5 of this
            editor.</p
          >
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import LayoutTwoColumns from '@/components/LayoutTwoColumns'
import Fieldset from '@/components/Fieldset'
import { mapState } from 'vuex'
import EditorScript from '@/components/card/EditorScript.vue'

export default {
  name: 'EditorStageScripts',
  components: {
    Fieldset,
    LayoutTwoColumns,
    EditorScript,
  },
  computed: {
    ...mapState({
      script: state => state.rad.radRequest.getMarkup().retrieve,
      radRequestResult: state => state.wallet.radRequestResult,
    }),
    sources() {
      return this.script.map((operator, index) => ({ ...operator, index }))
    },
    subscriptResults() {
      return this.radRequestResult
        ? this.radRequestResult.result.retrieve[0].context.stage.Retrieval
            .subscript_partial_results
        : null
    },
    results() {
      return this.radRequestResult
        ? this.radRequestResult.result.retrieve
        : null
    },
    finalResult() {
      return this.results
        ? Array.from(this.results.map(result => result.result))
        : []
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.scripts {
  display: flex;
  flex-direction: column;

  .script {
    margin-bottom: 25px;
  }
}
</style>

<docs>
### Example
```jsx
  <EditorStageScripts />
```
</docs>
