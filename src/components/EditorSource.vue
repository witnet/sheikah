<template>
  <Fieldset :title="title" :subtitle="subtitle" :closable="false">
    <Card class="card" shadow="thin" :border="false">
      <div class="form">
        <label class="label">{{ $t('protocol') }}</label>
        <Select
          v-model="localProtocol"
          :disabled="false"
          :options="selectOptions"
          data-test="protocol-select"
        />
        <label v-if="protocol !== 'RNG'" class="label">URL</label>
        <el-input
          v-if="protocol !== 'RNG'"
          ref="url"
          v-model="localUrl"
          data-test="url-input"
        />
        <label class="label">{{ $t('content_type') }}</label>
        <Select
          v-model="currentContentType"
          :disabled="true"
          :options="currentContentTypeOptions"
          data-test="content-type-select"
        />
      </div>
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
import { getDomainFromUrl } from '@/utils'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'
import Select from '@/components/Select'
import CustomIcon from '@/components/CustomIcon'

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
    return {
      currentProtocol: { primaryText: this.protocol || 'HTTP-GET' },
      currentContentType: { primaryText: this.contentType || 'JSON API' },
      currentUrl: this.url || '',
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
      return [
        { primaryText: 'JSON API' },
        { primaryText: 'Plain UTF-8 text' },
        { primaryText: 'Binary file' },
      ]
    },
    localUrl: {
      get() {
        return this.currentUrl
      },
      set(val) {
        this.currentUrl = val
        this.updateSource({
          index: this.index,
          source: {
            protocol: this.localProtocol.primaryText,
            url: val,
            contentType: this.localContentType.primaryText,
          },
        })
        this.$refs.url.focus()
      },
    },
    localProtocol: {
      get() {
        return this.currentProtocol
      },
      set(val) {
        this.currentProtocol = val
        this.currentContentType = {
          primaryText:
            this.contentTypeOptions[this.currentProtocol.primaryText],
        }
        this.updateSource({
          index: this.index,
          source: {
            protocol: val.primaryText,
            url: this.localUrl,
            contentType: this.currentContentType.primaryText,
          },
        })
      },
    },
    localContentType: {
      get() {
        return this.contentType
      },
      set(val) {
        this.updateSource({
          index: this.index,
          source: {
            protocol: this.localProtocol.primaryText,
            url: this.localUrl,
            contentType: val.primaryText,
          },
        })
      },
    },
  },
  watch: {
    url(val) {
      this.currentUrl = val
    },
    protocol(val) {
      this.currentProtocol = { primaryText: val }
    },
    contentType(val) {
      this.currentContentType = { primaryText: val }
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
    row-gap: 22px;

    .label {
      color: var(--text-medium-emphasis);
      font-size: 14px;
    }
  }
}
</style>

<docs>
### Example

```jsx
  <EditorSource url="witnet.io" protocol="HTTP-GET" contentType="JSON API" :index="0" />
```

</docs>
