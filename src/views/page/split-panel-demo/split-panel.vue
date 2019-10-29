<template>
  <div>
    <Card :bordered="false" style="position:relative;height:100vh;">
      <split-pane v-on:resize="resize" :min-percent="20" :default-percent="30" split="vertical">
        <template slot="paneL">
          <div style="background-color: #f38181;height:100%;"></div>
        </template>
        <template slot="paneR">
          <split-pane split="horizontal">
            <template slot="paneL">
              <div style="background-color:#fce38a;height:100%;"></div>
            </template>
            <template slot="paneR">
              <div style="background-color:#95e1d3;height:100%;"></div>
            </template>
          </split-pane>
        </template>
      </split-pane>
    </Card>
  </div>
</template>
<script>
import splitPane from "vue-splitpane";
export default {
  data() {
    return {
      mousedown: false,
      mouseCurrent: {
        x: null,
        y: null
      }
    };
  },
  components: { splitPane },
  methods: {
    rightSplitRemove(evt) {
      const handleMove = function(params) {
        self.$refs["right-top"];
        self.$refs["right-bottom"];
      };
      const handleUp = function(params) {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
      };
      const self = this;
      this.mouseCurrent.x = evt.clientX;
      this.mouseCurrent.y = evt.clientY;
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
    },
    resize() {}
  }
};
</script>
<style lang="less" scoped>
.left-panel {
  display: inline-block;
  height: 100%;
  width: calc(~"50% - 1px");
  background-color: #f38181;
}
.right-panel {
  .right-top-panel {
    background-color: #fce38a;
  }
  .right-bottom-panel {
    background-color: #95e1d3;
  }
}
.split-line {
  border: 1px solid;
  display: inline-block;
  height: 100%;
}
/deep/ .ivu-card-body {
  height: inherit;
}
//ivu-card-body
</style>