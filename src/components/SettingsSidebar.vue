<template>
  <div class="settings-sidebar">
    <div class="title">Settings</div>
    <ul class="menu">
      <li
        v-for="section in sections"
        :key="section.route"
        class="menu-item"
        :class="{ active: activeSection === section.route }"
        @click="$router.push(section.route)"
      >
        <p class="name">{{ section.name }}</p>
        <p class="description">{{ section.description }}</p>
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
  display: flex;
  flex-direction: column;
  width: 337px;

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
