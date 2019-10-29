<template>
  <div class="contents">
    <div class="home-tab">
      <Menu :theme="'dark'" :active-name="activeName" :open-names="openNames">
        <!-- menuList -->
        <template v-for="item in menuList">
          <Submenu :name="item.id" :key="item.id">
            <template slot="title">
              <Icon :type="item.icon" />
              {{item.title}}
            </template>
            <template v-for="second in item.children">
              <MenuItem :name="second.id" :key="second.id" :to="second.link">
                <Icon :type="second.icon" append="true" />
                {{second.title}}
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </Menu>
      <!-------------------------------------- menu mock----------------------------------------------->
      <!-- <Menu :theme="'dark'" active-name="1" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />数据管理
          </template>
          <MenuItem name="1-1">
            <Icon type="md-document" :to="'/homePage/chartPage'" />用户列表
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="md-chatbubbles" :to="'/homePage/export'" />导出
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
      </Menu>-->
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
            <Icon type="logo-github" class="head" @click="jump" />
          </Badge>
        </div>
      </div>
      <!-------------------------------------- content ----------------------------------------------->
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import menuList from "../shared/menu";
export default {
  data() {
    return {
      selectIndex: [1],
      menuList: menuList,
      activeName: "",
      openNames: []
    };
  },
  created() {
    // 通过router查找对应的menu
    if (this.menuList && Array.isArray(this.menuList)) {
      this.getCurrentPath(this.menuList, this.$route.path);
    }
  },
  methods: {
    getCurrentPath(list, path) {
      if (list && Array.isArray(list)) {
        for (const item of list) {
          if (item.link && item.link === path) {
            this.activeName = item.id;
            this.openNames = [item.id.substr(0, 1)];
            return;
          } else if (item.children && Array.isArray(item.children)) {
            this.getCurrentPath(item.children, path);
          }
        }
      }
    },
    jump() {
      window.open("https://github.com/2698747225");
    }
  }
};
</script>
<style scoped lang="less">
.home-tab {
  position: fixed;
  float: left;
  height: 100vh;
}
.tab-content {
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
  margin: 10px 24px 0;
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
  & > {
    /deep/ .ivu-menu-submenu-title {
      text-align: left;
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

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
  transition: opacity 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.head {
  font-size: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2, 1.2);
  }
}
</style>
<style lang="less">
.tab-content {
  .content {
    overflow-x: hidden;
  }
}
</style>