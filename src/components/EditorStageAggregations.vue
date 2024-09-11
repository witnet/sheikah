<template>
  <LayoutTwoColumns>
    <template #left>
      <EditorAggregationsTally
        :script="aggregations"
        stage="aggregation"
        :sources="sourcesLength"
        :results="results ? results.partial_results : null"
        :final-result="finalResult"
        :filters-supported="filtersSupported"
      />
    </template>

    <template #upperRight>
      <Fieldset :title="$t('aggregator_description_title')" type="help">
        <div>
          <i18n-t keypath="aggregations_description_0" tag="p" scope="global">
            <em>{{ $t('aggregations_description_1') }}</em>
          </i18n-t>
          <p>{{ $t('aggregations_description_2') }}</p>
        </div>
      </Fieldset>
    </template>

    <template #bottomRight>
      <Fieldset
        :title="$t('aggregator_rules_title')"
        type="help"
        scope="global"
      >
        <div>
          <i18n-t keypath="aggregations_rule_1_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_1_1') }}</em>
          </i18n-t>
          <i18n-t keypath="aggregations_rule_2_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_2_1') }}</em>
          </i18n-t>
          <i18n-t keypath="aggregations_rule_3_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_3_1') }}</em>
          </i18n-t>
          <i18n-t keypath="aggregations_rule_4_0" tag="p" scope="global">
            <em>{{ $t('aggregations_rule_4_1') }}</em>
            <em>{{ $t('aggregations_rule_4_2') }}</em>
          </i18n-t>
        </div>
      </Fieldset>
    </template>
  </LayoutTwoColumns>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import LayoutTwoColumns from '@/components/LayoutTwoColumns.vue'
import EditorAggregationsTally from '@/components/card/EditorAggregationsTally.vue'
import Fieldset from '@/components/Fieldset.vue'
import { Kind } from '@/types'
import { getIndexFromProtocolKind } from '@/utils/protocolDictionary'

const store = useStore()
const aggregations = computed(
  () => store.state.rad.radRequest.getMarkup().aggregate,
)
const sourcesLength = computed(
  () => store.state.rad.radRequest.getMarkup().retrieve.length,
)
const radRequestResult = computed(() => store.state.wallet.radRequestResult)
const filtersSupported = computed(() => {
  const firstSource = store.state.rad.radRequest.getMarkup().retrieve[0]
  return (
    firstSource.kind !==
    getIndexFromProtocolKind(firstSource.kindOptions, Kind.Rng)
  )
})
const results = computed(() => {
  return radRequestResult.value ? radRequestResult.value.result.aggregate : null
})
const finalResult = computed(() => {
  return results.value ? results.value.result : null
})
</script>
