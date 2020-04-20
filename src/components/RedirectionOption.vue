<template>
  <router-link :class="normalizeType(type)" :to="link">
    <button data-test="local-wallet" class="option">
      <font-awesome-icon v-if="type === 'backward'" class="angle" icon="angle-left" />
      <p class="name">{{ name }}</p>
      <font-awesome-icon v-if="type === 'forward'" class="angle" icon="angle-right" />
    </button>
  </router-link>
</template>

<script>
export default {
  name: 'RedirectionOption',
  props: {
    link: String,
    name: String,
    type: String,
  },
  methods: {
    normalizeType(propType) {
      const buttonTypes = ['forward', 'backward']
      return buttonTypes.includes(propType) ? propType : 'forward'
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.wallets {
  overflow-y: auto;
  height: 200px;
  margin-bottom: 24px;
}

.forward,
.backward {
  text-decoration: none;
}

.option {
  background: $white;
  border-radius: 3px;
  border: 1px solid $grey-1;
  color: $alt-grey-5;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 24px;
  width: 100%;
  &:focus,
  &:hover {
    outline: none;
    cursor: pointer;
    border-color: $purple-4;
  }

  .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 16px 0 0;
    &:active {
      color: $alt-grey-5;
    }
  }

  .angle {
    align-self: center;
  }
}
</style>
