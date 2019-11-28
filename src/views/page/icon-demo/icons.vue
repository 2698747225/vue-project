<template>
  <div>
    <Card :bordered="false">link</Card>
    <Card>
      <Scroll :on-reach-bottom="handleReachBottom">
        <Card
          dis-hover
          v-for="(item, index) in list1"
          :key="index"
          style="margin: 32px 0"
        >Content {{ item }}</Card>
      </Scroll>
    </Card>
  </div>
</template>
<script>
export default {
  methods: {
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1];
          for (let i = 1; i < 11; i++) {
            this.list1.push(last + i);
          }
          resolve();
        }, 2000);
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>