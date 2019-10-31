<template>
  <div>
    <template v-for="tag in linklist">
      <Tag
        type="border"
        closable
        :checkable="true"
        :key="tag.path"
        :name="tag.path"
        :color="tag.path===$route.path?theme:'default'"
        style="margin-right:8px;"
        @click.native="navigate(tag.path)"
        @on-close="handleClose"
      >{{tag.title}}</Tag>
    </template>
  </div>
</template>
<script>
import { local } from "../utils/storage";
import { mapState } from "vuex";
export default {
  data() {
    return {
      linklist: [
        {
          title: this.$route.meta
            ? this.$route.meta[this.$route.meta.length - 1]
            : "",
          path: this.$route.path || ""
        }
      ]
    };
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    })
  },
  /**
   *   初始化时本地缓存进行缓存，watch到路由变化进行变更，
   */
  created() {
    let linkPath = local.get("historylink");
    linkPath = linkPath ? JSON.parse(linkPath) : null;
    this.linklist = linkPath && linkPath.length ? linkPath : this.linklist;
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.refreshPathList("add", {
        title: to.meta ? to.meta[to.meta.length - 1] : "",
        path: to.path
      });
    }
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
    handleClose(evt, path) {
      if (!this.linklist || this.linklist.length === 1) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }
      this.refreshPathList(
        "del",
        this.linklist.find(item => item.path === path)
      );
      // 关闭的若是当前路由，则跳转上一路由
      if (this.$route.path === path)
        this.$router.replace(this.linklist[this.linklist.length - 1]);
    },
    refreshPathList(type, item) {
      switch (type) {
        case "add":
          if (this.linklist.every(data => data.path !== item.path))
            this.linklist.push(item);
          break;
        case "del":
          this.linklist.splice(
            this.linklist.findIndex(data => data.path === item.path),
            1
          );
          break;
      }
      local.set("historylink", JSON.stringify(this.linklist), 60 * 60 * 1000);
    }
  }
};
</script>
<style lang="less" scoped>
</style>