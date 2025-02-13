<template>
  <Fieldset :title="title" :subtitle="subtitle" :closable="false">
    <Card class="card" shadow="thin" :border="false">
      <el-form class="form" :rules="rules" :model="form">
        <label class="label">{{ $t('protocol') }}</label>
        <el-form-item prop="localProtocol">
          <Select
            v-model="form.localProtocol"
            :disabled="false"
            :options="selectOptions"
            data-test="protocol-select"
          />
        </el-form-item>
        <label v-if="!isRng" class="label">URL</label>
        <el-form-item v-if="!isRng" prop="localContentType">
          <el-input ref="url" v-model="form.localUrl" data-test="url-input" />
        </el-form-item>
        <label v-if="isPostRequest" class="label">Headers</label>
        <el-form-item v-if="isPostRequest" prop="localHeaders">
          <el-input
            ref="headers"
            v-model="form.localHeaders"
            type="textarea"
            :rows="3"
            data-test="headers-input"
          />
        </el-form-item>
        <label v-if="isPostRequest" class="label">Body</label>
        <el-form-item v-if="isPostRequest" prop="localBody">
          <el-input
            ref="body"
            v-model="form.localBody"
            type="textarea"
            :rows="3"
            data-test="body-input"
          />
        </el-form-item>
        <label class="label">{{ $t('content_type') }}</label>
        <el-form-item prop="localContentType">
          <Select
            v-model="form.localContentType"
            :disabled="true"
            :options="currentContentTypeOptions"
            data-test="content-type-select"
          />
        </el-form-item>
      </el-form>
      <el-tooltip
        :content="$t('delete_source')"
        placement="right"
        effect="light"
      >
        <div class="delete" data-test="delete-btn" @click="deleteSource(index)">
          <CustomIcon name="close-btn" />
        </div>
      </el-tooltip>
    </Card>
  </Fieldset>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, reactive, watch, toRefs } from 'vue'
import { Kind, ContentType } from '@/types'
import { useI18n } from 'vue-i18n'
import { UPDATE_SOURCE, DELETE_SOURCE } from '@/store/mutation-types'
import { getIndexFromProtocolKind } from '@/utils/protocolDictionary'
import { getDomainFromUrl, isValidJson } from '@/utils'
import Card from '@/components/card/Card.vue'
import Fieldset from '@/components/Fieldset.vue'
import Select from '@/components/Select.vue'
import CustomIcon from '@/components/CustomIcon.vue'
const store = useStore()
const { t } = useI18n()
const props = defineProps({
  /**
   * Index of the source by creation date
   */
  index: {
    required: true,
    type: Number,
  },
  /**
   * Value to show in the protocol field
   */
  protocol: {
    required: true,
    type: String,
  },
  /**
   * Protocol value as integer
   */
  protocolIndex: {
    required: true,
    type: Number,
  },
  /**
   * Value to show in the url field
   */
  url: {
    required: true,
    type: String,
  },
  kindOptions: {
    required: true,
    type: Object,
  },
  headers: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  contentTypeOptions: {
    required: true,
    type: Object,
  },
  /**
   * Value to show in the content type field
   */
  // FIXME: Support other content types and protocol options
  contentType: {
    required: true,
    type: String,
  },
})

const areValidHeaders = (_rule: any, value: any, callback: any) => {
  if (!isValidJson(value)) {
    callback(new Error(t('json_error')))
  } else {
    callback()
  }
}

const form = reactive({
  localProtocol: {
    primaryText: props.protocol || Kind.HttpGet,
  },
  localContentType: {
    primaryText: props.contentType || ContentType.JsonApi,
  },
  localUrl: props.url || '',
  localHeaders: props.headers || '{}',
  localBody: props.body || '',
})
const { localContentType, localProtocol } = toRefs(form)
const { contentType, protocol } = toRefs(props)
const rules = reactive({
  localHeaders: [{ validator: areValidHeaders, trigger: 'blur' }],
})

const selectOptions = computed(() => {
  return Object.values(props.kindOptions).map(kind => {
    return { primaryText: kind }
  })
})
const title = computed(() => {
  return `Data Source #${props.index}`
})
const subtitle = computed(() => {
  return getDomainFromUrl(props.url)
})
const currentContentTypeOptions = computed(() => {
  return Object.values(props.contentTypeOptions).map(option => {
    return { primaryText: option }
  })
})
const isRng = computed(() => {
  return props.protocol === Kind.Rng
})
const isPostRequest = computed(() => {
  return props.protocol === Kind.HttpPost
})

const deleteSource = (index: number) => store.commit(DELETE_SOURCE, { index })
const updateSource = ({ index, source }: { index: number; source: any }) => {
  store.commit(UPDATE_SOURCE, { index, source })
}

watch(
  () => form,
  value => {
    updateSource({
      index: props.index,
      source: {
        protocol: getIndexFromProtocolKind(
          props.kindOptions,
          value.localProtocol.primaryText,
        ),
        headers: isValidJson(value.localHeaders)
          ? JSON.parse(form.localHeaders)
          : {},
        body: value.localBody,
        url: value.localUrl,
        contentType: value.localContentType.primaryText,
      },
    })
  },
  { deep: true },
)

watch(contentType, val => {
  localContentType.value = { primaryText: val }
})
watch(protocol, val => {
  localProtocol.value = {
    primaryText: val,
  }
})
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.card {
  position: relative;

  .delete {
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .form {
    align-items: center;
    column-gap: 10px;
    display: grid;
    grid-template: repeat(3, auto) / 130px 1fr;

    .label {
      color: var(--text-medium-emphasis);
      font-size: 14px;
    }
  }
}
</style>
