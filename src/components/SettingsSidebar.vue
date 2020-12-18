<template>
  <div class="settings-sidebar">
    <div class="title">Settings</div>
    <ul class="menu">
      <li
        v-for="section in sections"
        :key="section.route"
        :data-test="`section-${section.name}`"
        class="menu-item"
        :class="{ active: activeSection === section.route }"
        @click="
          section.route !== activeSection ? $router.push(section.route) : null
        "
      >
        <p class="name" :data-test="section.name">{{ section.name }}</p>
        <p class="description" :data-test="section.description">{{
          section.description
        }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SettingsSidebar',
  props: {
    sections: {
      type: Array,
      required: true,
    },
    activeSection: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.settings-sidebar {
  align-items: flex-end;
  background: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  width: 30vw;
  z-index: 20;

  .title {
    color: #444258;
    font-size: 24px;
    font-weight: 500;
    margin: 24px 0;
    padding-left: 24px;
    width: 250px;
  }

  .menu {
    display: flex;
    flex-direction: column;

    .menu-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 77px;
      justify-content: center;
      padding: 8px 24px;
      width: 250px;

      &:hover,
      &.active {
        background: rgba(243, 233, 251, 0.5);
        box-shadow: 3px 0 0 #9b51e0 inset;
      }

      .name {
        font-weight: 500;
      }

      .description {
        font-style: italic;
      }
    }
  }
}
</style>
