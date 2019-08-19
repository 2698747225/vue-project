<template>
  <div class="contents">
    <div class="home-tab">
      <!-------------------------------------- menu ----------------------------------------------->
      <Menu :theme="'dark'" active-name="1" :open-names="[1]">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />数据管理
          </template>
          <MenuItem name="1-1">
            <Icon type="md-document" :to="'/homePage/chartPage'" />用户列表
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="md-chatbubbles" />商家列表
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="md-chatbubbles" />食品列表
          </MenuItem>
          <MenuItem name="1-4">
            <Icon type="md-chatbubbles" />订单列表
          </MenuItem>
          <MenuItem name="1-5">
            <Icon type="md-chatbubbles" />管理员列表
          </MenuItem>
        </Submenu>

        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-paper" />添加数据
          </template>
          <MenuItem name="2-1">
            <Icon type="md-heart" />添加商铺
          </MenuItem>
          <MenuItem name="2-2">
            <Icon type="md-leaf" />添加商品
          </MenuItem>
        </Submenu>

        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-paper" />图表
          </template>
          <MenuItem name="3-1">
            <Icon type="md-heart" />用户分布
          </MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-paper" />编辑
          </template>
          <MenuItem name="4-1">
            <Icon type="md-heart" />文本编辑
          </MenuItem>
        </Submenu>
        <Submenu name="5">
          <template slot="title">
            <Icon type="ios-paper" />设置
          </template>
          <MenuItem name="5-1">
            <Icon type="md-heart" />管理员设置
          </MenuItem>
        </Submenu>
        <Submenu name="6">
          <template slot="title">
            <Icon type="ios-paper" />说明
          </template>
          <MenuItem name="6-1">
            <Icon type="md-heart" />说明
          </MenuItem>
        </Submenu>
      </Menu>
    </div>

    <!-------------------------------------- header ----------------------------------------------->
    <div class="tab-content">
      <div class="tab-header">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem v-for="(item,idx) in $route.meta" :key="idx">{{item}}</BreadcrumbItem>
        </Breadcrumb>
        <div>
          <Badge class="badge">
            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Badge>
        </div>
      </div>
      <!-------------------------------------- content ----------------------------------------------->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectIndex: [1]
    };
  },
  created() {
    console.log(this);
  }
};
</script>
<style scoped lang="less">
.home-tab {
  float: left;
  height: 100%;
}
.tab-content {
  height: 100%;
  margin-left: 240px;
  background-color: #f0f2f2;
  .tab-header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #fff;
  }
}
.content {
  overflow: auto;
  max-height: calc(100%-50px);
  margin: 0 24px;
}
.contents {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;

  & > {
    /deep/ .ivu-menu-dark {
      height: 100%;
    }
  }
}

.badge {
  width: 50px;
  height: 50px;
  z-index: 4;
}
img {
  width: 100%;
  height: 100%;
}
</style>