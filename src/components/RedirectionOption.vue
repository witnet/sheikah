<template>
  <router-link :class="normalizeType(type)" :to="link">
    <button data-test="local-wallet" class="option">
      <font-awesome-icon
        v-if="type === 'backward'"
        class="angle"
        icon="angle-left"
      />
      <p class="name">{{ name }}</p>
      <font-awesome-icon
        v-if="type === 'forward'"
        class="angle"
        icon="angle-right"
      />
    </button>
  </router-link>
</template>

<script>
export default {
  name: 'RedirectionOption',
  props: {
    link: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
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

.forward,
.backward {
  text-decoration: none;
}

.option {
  background: $white;
  border: 1px solid $grey-1;
  border-radius: 3px;
  color: $alt-grey-5;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;

  &:focus,
  &:hover {
    border-color: $purple-4;
    cursor: pointer;
    outline: none;
  }

  .name {
    overflow: hidden;
    padding: 0 16px 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:active {
      color: $alt-grey-5;
    }
  }

  .angle {
    align-self: center;
  }
}
</style>
