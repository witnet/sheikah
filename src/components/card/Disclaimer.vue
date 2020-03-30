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
        <p v-show="!readAll && showButton" @click="handleRead()" class="underline">Read more</p>
        <p v-show="readAll && showButton" @click="handleRead()" class="underline">Show less</p>
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
    <div class="sub-title-container">
      <p class="sub-title">
        By accepting these disclaimers, you commit to comply with the explained restrictions and
        digitally sign your conformance using your Witnet wallet.
      </p>
    </div>
  </div>
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
  background: $purple-6;
  color: $white;
  box-shadow: $default-box-shadow;
  width: 600px;
  min-height: 400px;
  border: 1px solid $purple-6;

  .header {
    color: $white;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    font-weight: 500;
    height: 100px;
    .big-title {
      display: flex;
      align-items: left;
      justify-content: center;
      flex-direction: column;
      .title {
        font-size: 14px;
        font-weight: 500;
        color: $white;
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
    overflow-y: hidden;
    flex-direction: column;
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
  }
}
.sub-title-container {
  position: absolute;
  bottom: -80px;
  max-width: 600px;
  .sub-title {
    text-align: center;
    color: $grey-4;
    font-size: 14px;
    margin: 0px 32px;
  }
}
</style>
