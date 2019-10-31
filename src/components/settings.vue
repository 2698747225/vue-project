<template>
  <div>
    <div class="setting-header">
      <strong>设置</strong>
    </div>
    <div class="setting-content">
      <div>
        主题颜色：
        <ColorPicker v-model="theme" />
      </div>
      <div>
        <label>打开快速跳转：</label>
        <Switch v-model="openTag" />
      </div>
      <div>
        <label>表头固定：</label>
        <Switch v-model="fixedHeader" />
      </div>
      <div>
        <label>logo：</label>
        <Switch v-model="switch1" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switch1: null
    };
  },
  computed: {
    theme: {
      get() {
        return this.$store.state.theme.theme;
      },
      set(val) {
        this.$store.dispatch("theme/changeTheme", val);
      }
    },
    openTag: {
      get() {
        return this.$store.state.setting.openTagsView;
      },
      set(val) {
        this.$store.dispatch("setting/openTagsView", val);
      }
    },
    fixedHeader: {
      get() {
        return this.$store.state.setting.fixedHeader;
      },
      set(val) {
        this.$store.dispatch("setting/changeHeader", val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.setting-header {
  margin: 10px 0;
}
.setting-content {
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
}
</style>