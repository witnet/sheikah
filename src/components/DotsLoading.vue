<template>
  <div class="loading">
    <div class="dot first"></div>
    <div class="dot second"></div>
    <div class="dot third"></div>
  </div>
</template>

<script>
export default {
  name: 'DotsLoading',
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
/*Thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */

.loading {
  display: flex;
  align-items: center;
  margin: 8px 8px 0px 8px;

  .dot {
    width: 4px;
    margin-right: 1px;
    height: 4px;
    background-color: $yellow-4;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .first {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .second {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
