<template>
  <BaseCard class="card-navigation">
    <template v-slot:header>
      <div v-if="title" class="header">
        <p class="title">DISCLAIMER</p>
        <div class="big-title">
          {{ title }}
          <font-awesome-icon class="icon" icon="file-signature" />
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div ref="disclaimer" :class="disclaimerClass">
        <slot></slot>
      </div>
      <p v-show="!readAll && showButton" @click="readAll = true" class="underline">Read more</p>
      <p v-show="readAll && showButton" @click="readAll = false" class="underline">Show less</p>
    </template>

    <template v-if="previousStep || nextStep" v-slot:footer>
      <div ref="hi" class="navigation-buttons">
        <el-button
          v-if="previousStep"
          data-test="previous-step"
          class="dark button"
          @click="previousStep"
        >
          {{ previousText }}
        </el-button>
        <el-button
          v-if="nextStep"
          class="dark"
          data-test="next-step"
          type="primary"
          @click="nextStep"
          ref="next"
        >
          {{ nextText }}
        </el-button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/card/BaseCard'

export default {
  name: 'NavigationCard',
  data() {
    return {
      readAll: false,
      showButton: false,
    }
  },
  props: {
    nextStep: Function,
    nextText: String,
    previousStep: {
      type: Function,
      required: false,
    },
    previousText: String,
    title: String,
  },
  components: {
    BaseCard,
  },
  mounted() {
    this.checkoverflow()
  },
  computed: {
    disclaimerClass() {
      if (this.showButton) {
        if (this.readAll) {
          return 'content long-content show-more'
        } else {
          return 'content long-content'
        }
      } else {
        return 'content'
      }
    },
  },
  methods: {
    handleKeyUp: event => {
      if (event.keyCode === 13) {
        this.props.nextStep()
      }
    },
    async checkoverflow() {
      await this.$nextTick()
      if (this.$refs.disclaimer.clientHeight > 300) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card-navigation {
  background: $blue-6;
  color: $white;
  box-shadow: $default-box-shadow;
  width: 600px;
  min-height: 400px;
  border: 1px solid $grey-0;

  .header {
    color: $white;
    padding: 0 32px;
    margin-bottom: 16px;
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    font-size: 32px;
    font-weight: 500;
    height: 100px;
    .title {
      font-size: 14px;
      font-weight: 500;
      color: $white;
      margin-bottom: 8px;
      margin-top: 16px;
    }
    .big-title {
      display: flex;
      justify-content: space-between;
      .icon {
        font-size: 50px;
      }
    }
  }

  .content {
    color: $white;
    display: flex;
    overflow-y: hidden;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    padding: 32px 32px 0px 32px;
  }
  .show-more {
    overflow-y: auto;
  }
  .long-content {
    height: 300px;
  }
  .underline {
    margin: 16px 32px 0px 32px;
    color: $white;
    text-decoration: underline;
    cursor: pointer;
  }
  .navigation-buttons {
    box-sizing: border-box;
    text-align: right;
    padding: 32px;
    .button,
    .default {
      margin-right: 8px;
    }
  }
}
</style>
