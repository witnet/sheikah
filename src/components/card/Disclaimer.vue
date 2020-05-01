<template>
  <div class="container">
    <BaseCard class="card-navigation">
      <template v-slot:header>
        <div v-if="title" class="header">
          <div class="big-title">
            <p class="title">DISCLAIMER</p>
            {{ title }}
          </div>
          <font-awesome-icon class="icon" icon="file-signature" />
        </div>
      </template>
      <template v-slot:content>
        <div ref="disclaimer" :class="disclaimerClass">
          <slot></slot>
        </div>
        <p v-show="!readAll && showButton" class="underline" @click="handleRead"
          >Read more</p
        >
        <p v-show="readAll && showButton" class="underline" @click="handleRead"
          >Show less</p
        >
      </template>

      <template v-if="previousStep || nextStep" v-slot:footer>
        <div ref="hi" class="navigation-buttons">
          <el-button
            tabindex="2"
            v-if="previousStep"
            tabindex="2"
            data-test="previous-step"
            class="dark button"
            @click="previousStep"
          >
            {{ previousText }}
          </el-button>
          <el-button
            tabindex="1"
            v-if="nextStep"
            ref="next"
            tabindex="1"
            class="dark"
            data-test="next-step"
            type="primary"
            @click="nextStep"
          >
            {{ nextText }}
          </el-button>
        </div>
      </template>
    </BaseCard>
    <div class="sub-title-container">
      <p class="sub-title">
        By accepting these disclaimers, you commit to comply with the explained
        restrictions and digitally sign your conformance using your Witnet
        wallet.
      </p>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/card/BaseCard'
export default {
  name: 'NavigationCard',
  components: {
    BaseCard,
  },
  props: {
    nextStep: {
      type: Function,
      default: () => {},
    },
    nextText: {
      type: String,
      default: '',
    },
    previousStep: {
      type: Function,
      default: () => {},
    },
    previousText: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      readAll: false,
      showButton: false,
    }
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
  mounted() {
    this.checkoverflow()
  },
  methods: {
    handleRead() {
      if (!this.readAll && this.showButton) {
        this.readAll = true
      } else {
        this.readAll = false
        this.$refs.disclaimer.scrollTop = 0
      }
    },
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

.container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-navigation {
  background: $purple-4;
  border: 1px solid $purple-3;
  border-radius: 2px;
  box-shadow: $default-box-shadow;
  color: $white;
  min-height: 400px;
  width: 600px;

  .header {
    align-items: center;
    color: $white;
    display: flex;
    font-size: 32px;
    font-weight: 500;
    height: 100px;
    justify-content: space-between;
    padding: 0 32px;

    .big-title {
      align-items: left;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        color: $white;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }
    }

    .icon {
      font-size: 50px;
    }
  }

  .content {
    color: $white;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    overflow-y: hidden;
    padding: 32px 32px 0 32px;
  }

  .show-more {
    overflow-y: auto;
  }

  .long-content {
    height: 300px;
  }

  .underline {
    color: $white;
    cursor: pointer;
    margin: 16px 32px 0 32px;
    text-decoration: underline;
  }

  .navigation-buttons {
    box-sizing: border-box;
    padding: 32px;
    text-align: right;
  }
}

.sub-title-container {
  bottom: -80px;
  max-width: 600px;
  position: absolute;

  .sub-title {
    color: $grey-4;
    font-size: 14px;
    margin: 0 32px;
    text-align: center;
  }
}
</style>
