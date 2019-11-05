<template>
  <div class="drop-card">
    <!-- 标题-->
    <slot #title v-if="$slots.title" />
    <div class="header" v-else :style="title_style">{{title}}</div>
    <!-- 内容 -->
    <div :class="'_drop_content'">
      <template v-for="(item,idx) in data">
        <Card
          :key="'content_'+idx"
          draggable
          @drop.capture.native="cardDrop"
          @dragstart.native="dragStart"
          @dragover.native="dragOver"
        >{{item}}</Card>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      target: null
    };
  },
  props: {
    title: {
      type: String,
      default: "标题"
    },
    title_style: {
      type: Object
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    cardDrop(evt) {
      if (evt.currentTarget && window._target) {
        evt.currentTarget.parentElement.insertBefore(
          window._target,
          evt.currentTarget.nextSibling
        );
      }
      // 销毁这个暂存实例
      //   document.querySelector("._drop_content").removeChild(this.target);
      //   this.target = null;
    },
    dragStart(evt) {
      window._target = evt.target;
    },
    dragOver(evt) {
      evt.preventDefault();
    }
  },
  created() {
    console.log(1);
  }
};
</script>
<style lang="less" scoped>
.drop-card {
  border: 1px solid #f0f0f0;
  .header {
    position: relative;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
  }
  ._drop_content {
    padding: 10px;
    border: 3px solid #fff;
  }
}
</style>