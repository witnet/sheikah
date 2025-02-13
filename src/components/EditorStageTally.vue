<template>
  <LayoutTwoColumns>
    <template #left>
      <EditorAggregationsTally
        :script="tally"
        stage="tally"
        :results="results ? results.partial_results : null"
        :final-result="finalResult"
        :filters-supported="filtersSupported"
      />
    </template>

    <template #upperRight>
      <Fieldset :title="$t('tally_description_title')" type="help">
        <div>
          <i18n-t keypath="tally_description_0" tag="p" scope="global">
            <em>{{ $t('tally_description_1') }}</em>
          </i18n-t>
        </div>
      </Fieldset>
    </template>

    <template #bottomRight>
      <Fieldset :title="$t('tally_rule_title')" type="help">
        <div>
          <p>{{ $t('tally_rules_intro') }}</p>
          <i18n-t keypath="tally_rule_1_0" tag="p" scope="global">
            <em>{{ $t('tally_rule_1_1') }}</em>
          </i18n-t>
          <i18n-t keypath="tally_rule_2_0" tag="p" scope="global">
            <em>{{ $t('tally_rule_2_1') }}</em>
          </i18n-t>
          <i18n-t keypath="tally_rule_3_0" tag="p" scope="global">
            <em>{{ $t('tally_rule_3_1') }}</em>
          </i18n-t>
          <i18n-t keypath="tally_rule_4_0" tag="p" scope="global">
            <em>{{ $t('tally_rule_4_1') }}</em>
          </i18n-t>
          <i18n-t keypath="tally_rule_5_0" tag="p" scope="global">
            <em>{{ $t('tally_rule_5_1') }}</em>
          </i18n-t>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import EditorAggregationsTally from '@/components/card/EditorAggregationsTally.vue'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import Fieldset from '@/components/Fieldset.vue'
import { Kind } from '@/types'
import { getIndexFromProtocolKind } from '@/utils/protocolDictionary'
const store = useStore()

const tally = computed(() => store.state.rad.radRequest.getMarkup().tally)
const radRequestResult = computed(() => store.state.wallet.radRequestResult)
const firstSource = computed(
  () => store.state.rad.radRequest.getMarkup().retrieve[0],
)
const filtersSupported = computed(() => {
  return (
    firstSource.value.kind !==
    getIndexFromProtocolKind(firstSource.value.kindOptions, Kind.Rng)
  )
})
const results = computed(() =>
  radRequestResult.value ? radRequestResult.value.result.tally : null,
)
const finalResult = computed(() =>
  results.value ? results.value.result : null,
)
</script>
