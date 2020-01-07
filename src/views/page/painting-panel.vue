<template>
  <div style="padding: 100px;text-align:initial;height:800px;">
    <!-- 调色盘 -->
    <div class="toolbox">
      <Card :bordered="false">
        <div class="toolbox-item">
          <input type="color"
                 @change="changeColor"
                 ref="color"
                 style="margin-right:8px;" />
        </div>
        <div class="toolbox-item">
          <Button @click="clear()"
                  ref="button"
                  style="margin-right:8px;">清屏</Button>
        </div>
        <div class="toolbox-item">
          <input type="range"
                 class="range"
                 min="2"
                 max="20"
                 value="5"
                 @change="changeLine()"
                 ref="line">
        </div>
      </Card>
    </div>
    <!-- 画板部分 -->
    <div style="position: relative;display: inline-block;">
      <div style="border: 4px solid #cccccc;height:600px;width:800px;position:relative">
        <canvas style="border: 4px solid #cccccc;width:100%;height:100%;position: absolute;right: 0;"
                width="800px"
                height="600px"
                ref="canvas"></canvas>
        <img src="../../assets/paint.jpg"
             style="position:absolute;right:0;width:100%;height:100%;display:none"
             ref="img" />
        <!-- <canvas width="100%"
                height="100%" ref="img"></canvas> -->
      </div>
      <div>
        <Button type="primary"
                @click="save">保存</Button>
      </div>
    </div>
    <div class="imgs-view">
      <Card :bordered="false">
        <Row>
          <template v-for="(item,idx) in imgs">
            <Col span="12"
                 :key="idx+'_col'">
            <img :src="item"
                 :key="idx+'_img'"
                 style="width:100%;height:100%;"
                 alt />
            </Col>
          </template>
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctx: null,
      imgs: []
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
    const img = this.$refs.img;
    if (dom.getContext) {
      this.ctx = dom.getContext('2d');
      this.ctx.strokeStyle = "black";
      // 绘制一张图片
      img.onload = function () {
        self.ctx.drawImage(img, 0, 0, 800, 600);
      }
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
      this.ctx.lineTo(event.clientX - this.left, event.clientY - this.ttop);
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
    },
    // 保存图片
    save () {
      if (this.ctx) {
        this.$Message.success('保存成功！');
        this.imgs.push(this.ctx.canvas.toDataURL());
      }
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
  text-align: left;
  float: left;
  width: 230px;
  margin-right: 20px;
  height: 100%;
  top: -8px;
  position: relative;
  height: 100%;
  & > {
    /deep/ .ivu-card {
      height: inherit;
    }
  }
}
.toolbox-item {
  margin-bottom: 10px;
}
.imgs-view {
  display: inline-block;
  vertical-align: top;
  width: 300px;
  margin-left: 50px;
  position: relative;
  top: -8px;
  height: 100%;
  & > {
    /deep/ .ivu-card {
      height: inherit;
      overflow-y: auto;
    }
  }
}
</style>