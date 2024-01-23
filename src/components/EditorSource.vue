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
        <label v-if="protocol !== 'RNG'" class="label">URL</label>
        <el-form-item v-if="protocol !== 'RNG'" prop="localContentType">
          <el-input ref="url" v-model="form.localUrl" data-test="url-input" />
        </el-form-item>
        <label v-if="protocol === 'HTTP-POST'" class="label">Headers</label>
        <el-form-item v-if="protocol === 'HTTP-POST'" prop="localHeaders">
          <el-input
            ref="headers"
            v-model="form.localHeaders"
            type="textarea"
            :rows="3"
            data-test="headers-input"
          />
        </el-form-item>
        <label v-if="protocol === 'HTTP-POST'" class="label">Body</label>
        <el-form-item v-if="protocol === 'HTTP-POST'" prop="localBody">
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
        <div
          class="delete"
          data-test="delete-btn"
          @click="deleteSource({ index })"
        >
          <CustomIcon name="close-btn" />
        </div>
      </el-tooltip>
    </Card>
  </Fieldset>
</template>

<script>
import { mapMutations } from 'vuex'

import { UPDATE_SOURCE, DELETE_SOURCE } from '@/store/mutation-types'
import { getDomainFromUrl, isValidJson } from '@/utils'
import Card from '@/components/card/Card.vue'
import Fieldset from '@/components/Fieldset.vue'
import Select from '@/components/Select.vue'
import CustomIcon from '@/components/CustomIcon.vue'

export default {
  name: 'EditorSource',
  components: {
    Fieldset,
    Card,
    Select,
    CustomIcon,
  },
  props: {
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
     * Value to show in the url field
     */
    url: {
      required: true,
      type: String,
    },
    kindOptions: {
      required: true,
      type: Array,
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
  },
  data() {
    const areValidHeaders = (rule, value, callback) => {
      if (!isValidJson(value)) {
        callback(new Error(this.$t('json_error')))
      } else {
        callback()
      }
    }
    return {
      form: {
        localProtocol: { primaryText: this.protocol || 'HTTP-GET' },
        localContentType: { primaryText: this.contentType || 'JSON API' },
        localUrl: this.url || '',
        localHeaders: this.headers || '{}',
        localBody: this.body || '',
      },
      rules: {
        localHeaders: [{ validator: areValidHeaders, trigger: 'blur' }],
      },
    }
  },
  computed: {
    selectOptions() {
      return this.kindOptions.map(kind => {
        return { primaryText: kind }
      })
    },
    title() {
      return `Data Source #${this.index}`
    },
    subtitle() {
      return getDomainFromUrl(this.url)
    },
    currentContentTypeOptions() {
      return Object.values(this.contentTypeOptions).map(option => {
        return { primaryText: option }
      })
    },
  },
  watch: {
    form: {
      handler() {
        this.updateSource({
          index: this.index,
          source: {
            protocol: this.form.localProtocol.primaryText,
            headers: isValidJson(this.form.localHeaders)
              ? JSON.parse(this.form.localHeaders)
              : {},
            body: this.form.localBody,
            url: this.form.localUrl,
            contentType: this.form.localContentType.primaryText,
          },
        })
      },
      deep: true,
    },
    url(val) {
      this.form.currentUrl = val
    },
    protocol(val) {
      this.form.currentProtocol = { primaryText: val }
    },
    contentType(val) {
      this.form.currentContentType = { primaryText: val }
    },
  },
  methods: {
    ...mapMutations({
      deleteSource: DELETE_SOURCE,
      updateSource: UPDATE_SOURCE,
    }),
  },
}
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
