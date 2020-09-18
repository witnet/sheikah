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
        <div ref="disclaimer" class="content">
          <slot></slot>
        </div>
      </template>

      <template v-if="previousStep || nextStep" v-slot:footer>
        <div ref="hi" class="navigation-buttons">
          <el-button
            v-if="previousStep"
            tabindex="2"
            data-test="previous-step"
            class="dark button"
            @click="previousStep"
          >
            {{ previousText }}
          </el-button>
          <el-button
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
      textExpanded: false,
      textOverflow: false,
    }
  },
  methods: {
    handleKeyUp: event => {
      if (event.keyCode === 13) {
        this.props.nextStep()
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
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 32px;

    .big-title {
      align-items: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 8px;

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
    max-height: 400px;
    overflow-y: auto;
    overflow-y: hidden;
    padding: 32px 32px 0 32px;
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
  margin-top: 16px;
  max-width: 600px;

  .sub-title {
    color: $grey-4;
    font-size: 14px;
    margin: 0 32px;
    text-align: center;
  }
}
</style>
