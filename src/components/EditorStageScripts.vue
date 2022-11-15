<template>
  <LayoutTwoColumns>
    <template v-slot:left>
      <div class="scripts">
        <EditorScript
          v-for="(source, index) in sources"
          :key="index"
          class="script"
          :source="source"
          :results="
            results && results[index] ? results[index].partial_results : null
          "
          :subscript-results="subscriptResults"
          :final-result="finalResult[index]"
        />
      </div>
    </template>
    <template v-slot:upperRight>
      <Fieldset :title="$t('scripts_description_title')" type="help">
        <div>
          <p>{{ $t('scripts_description_1') }}</p>
          <p>{{ $t('scripts_description_2') }}</p>
        </div>
      </Fieldset>
    </template>

    <template v-slot:bottomRight>
      <Fieldset :title="$t('scripts_rules_title')" type="help">
        <div>
          <p>- {{ $t('scripts_rule_1') }}</p>
          <p
            >-
            <i18n-t keypath="scripts_rule_2_0">
              <em>{{ $t('scripts_rule_2_1') }}</em>
              <em>{{ $t('scripts_rule_2_2') }}</em>
            </i18n-t>
          </p>
          <p>- {{ $t('scripts_rule_3') }}</p>
          <p>- {{ $t('scripts_rule_4') }}</p>
          <p>- {{ $t('scripts_rule_5') }}</p>
          <p>- {{ $t('scripts_rule_6') }}</p>
          <p>- {{ $t('scripts_rule_7') }}</p>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script>
import { mapState } from 'vuex'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import Fieldset from '@/components/Fieldset.vue'
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
