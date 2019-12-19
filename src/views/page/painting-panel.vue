<template>
  <div style="padding: 100px;">
    <!-- 调色盘 -->
    <div style="margin-bottom: 10px;text-align:right"
         class="toolbox">
      <input type="color"
             @change="changeColor"
             ref="color"
             style="margin-right:8px;" />
      <Button @click="clear()"
              ref="button" style="margin-right:8px;">清屏</button>
      <input type="range"
             class="range"
             min="2"
             max="20"
             value="5"
             @change="changeLine()"
             ref="line">
    </div>
    <!-- 画板部分 -->
    <canvas style="border: 4px solid #cccccc;"
            width="800px"
            height="600px"
            ref="canvas"></canvas>
    <div></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctx: null,
    };
  },
  computed: {
    colorElm () {
      return this.$refs.color;
    },
    lineElm () {
      return this.$refs.line;
    },
    dom () {
      return this.$refs.canvas;
    },
    button () {
      return this.$refs.button;
    },
    left () {
      if (this.dom)
        return this.dom.getBoundingClientRect().left;
      else return null;
    },
    ttop () {
      if (this.dom)
        return this.dom.getBoundingClientRect().top;
      else return null;
    }
  },
  mounted () {
    const self = this;
    const dom = this.$refs.canvas;
    const button = this.$refs.button;
    if (dom.getContext) {
      this.ctx = dom.getContext('2d');
      this.ctx.strokeStyle = "black";
    }

    var mouseup = function (event) {
      dom.removeEventListener('mousemove', self.mousemove);
    };
    dom.addEventListener('mousedown', this.mousedown);
    dom.addEventListener('mouseup', mouseup);
  },
  methods: {
    changeColor () {
      this.ctx.strokeStyle = this.colorElm.value || 'black';
    },
    changeLine () {
      this.ctx.lineWidth = this.lineElm.value;
    },
    mousemove () {
      this.ctx.lineTo(event.clientX - this.left - 5, event.clientY - this.ttop - 5);
      this.ctx.stroke();
    },
    mousedown () {
      this.dom.addEventListener('mousemove', this.mousemove);
      // 开始绘制
      this.ctx.beginPath();
      // 移动绘制点
      this.ctx.moveTo(event.clientX - this.left, event.clientY - this.ttop);
    },
    clear () {
      this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }
  },
  destroyed () {
    this.$refs.canvas.removeEventListener('mousemove', this.mousemove);
    this.$refs.canvas.removeEventListener('mousedown', this.mousedown);
  }
}
</script>
<style lang="less" scoped>
.toolbox {
  margin-bottom: 10px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>