<template>
  <div class="base-dots-loading" :style="{ margin: props.margin }">
    --- {{ props }} ---
    <div
      v-for="className in ['first', 'second', 'third']"
      :key="className"
      class="dot"
      :class="[className]"
      :style="{
        width: props.size,
        height: props.size,
        ['background-color']: props.color,
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'DotsLoading',
  props: {
    /**
     * Width and height of each dot
     */
    size: {
      type: String,
      default: '4px',
    },
    margin: {
      type: String,
      default: '8px 8px 0 8px',
    },
    color: {
      type: String,
      default: '#eeba1b',
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

/* Thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */
.base-dots-loading {
  align-items: center;
  display: flex;

  .dot {
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    border-radius: 100%;
    display: inline-block;
    height: 4px;
    margin-right: 1px;
    width: 4px;

    &.first {
      animation-delay: -0.32s;
    }

    &.second {
      animation-delay: -0.16s;
    }
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
