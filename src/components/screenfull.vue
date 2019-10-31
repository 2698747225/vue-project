<template>
  <Icon type="ios-expand" class="icon" @click.native="fullScreen" />
</template>
<script>
export default {
  methods: {
    fullScreen() {
      const docElm = document.documentElement;
      switch (this.isFullScreen()) {
        case true:
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          break;
        default:
          //W3C
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          }
          //FireFox
          else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          }
          //Chrome等
          else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          }
          //IE11
          else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
          }
          break;
      }
    },
    isFullScreen() {
      return (
        document.isFullScreen ||
        document.mozIsFullScreen ||
        document.webkitIsFullScreen
      );
    }
  }
};
</script>
<style lang="less" scoped>
.icon {
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2, 1.2);
  }
}
</style>