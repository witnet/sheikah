<template>
  <div class="container">
    <BaseCard class="card-navigation">
      <template #header>
        <div v-if="title" class="header">
          <div class="big-title">
            <p class="title">{{ $t('disclaimer').toUpperCase() }}</p>
            {{ title }}
          </div>
          <font-awesome-icon class="icon" icon="file-signature" />
        </div>
      </template>

      <template #content>
        <div ref="disclaimer" class="content">
          <slot></slot>
        </div>
      </template>

      <template v-if="previousStep || nextStep" #footer>
        <div class="navigation-buttons">
          <el-button
            v-if="previousStep"
            class="dark"
            tabindex="2"
            data-test="previous-step"
            @click="previousStep"
          >
            {{ previousText }}
          </el-button>
          <el-button
            v-if="nextStep"
            ref="next"
            class="dark"
            tabindex="1"
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
        {{ $t('disclaimer_info') }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/card/BaseCard.vue'
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
  align-items: center;

  .card-navigation {
    background: var(--disclaimer-background);
    border: var(--disclaimer-border);
    border-radius: 2px;
    box-shadow: var(--default-box-shadow);
    color: var(--disclaimer-text);
    min-height: 400px;
    width: 600px;

    .header {
      align-items: center;
      color: var(--disclaimer-text);
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
          color: var(--disclaimer-text);
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
      color: var(--disclaimer-text);
      display: flex;
      flex-direction: column;
      font-size: 16px;
      max-height: max-content;
      padding: 32px 32px 0;
    }

    .navigation-buttons {
      box-sizing: border-box;
      display: grid;
      grid-template-columns: max-content max-content;
      justify-content: flex-end;
      padding: 32px;
      text-align: right;
    }
  }

  .sub-title-container {
    bottom: -80px;
    margin-top: 16px;
    max-width: 600px;

    .sub-title {
      color: var(--text-medium-emphasis);
      font-size: 14px;
      margin: 0 32px;
      text-align: center;
    }
  }
}
</style>
