<template>
  <div class="contents">
    <!-------------------------------------- menu ----------------------------------------------->
    <div class="home-tab">
      <Menu :theme="'dark'" :active-name="activeName" :open-names="openNames">
        <!-- logoMenu -->
        <template v-if="sidebarLogo">
          <MenuItem name="logo" style="background-color:#363E4F">
            <img src="../assets/Home_logo.jpg" class="logo-img" />
            <label class="logo-desc">Vue Project</label>
          </MenuItem>
        </template>
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
    </div>
    <!-------------------------------------- header ----------------------------------------------->
    <div class="tab-content">
      <div
        class="tab-header"
        :class="{fixedHeader:fixedHeader}"
        :style="{height:openTagsView?'80px':'50px'}"
      >
        <div class="tab-header-bread">
          <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem v-for="(item,idx) in $route.meta" :key="idx">{{item}}</BreadcrumbItem>
          </Breadcrumb>
          <div>
            <Icon type="ios-bug" class="debug" @click.native="errorLogModal=true;" />
            <Tooltip content="global">
              <fullscreen
                style="font-size: 24px;font-weight: 600;cursor: pointer;margin-right:10px;"
              ></fullscreen>
            </Tooltip>
            <Badge class="badge">
              <Icon type="logo-github" class="head" @click="jump" />
            </Badge>
          </div>
        </div>
        <div class="link" v-if="openTagsView">
          <simpleLink></simpleLink>
        </div>
      </div>
      <!-------------------------------------- content ----------------------------------------------->
      <div
        class="content"
        :class="{fixedContent:fixedHeader}"
        :style="{top:fixedHeader?openTagsView?'80px':'50px':null}"
      >
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <div class="setting-btn" :style="{backgroundColor:theme}" @click="setting()">
      <Icon type="md-settings" style="font-size: 40px;line-height: 50px; color: #fff" />
    </div>
    <Drawer title="设置" v-model="_showSetting">
      <setting></setting>
    </Drawer>
    <Modal v-model="errorLogModal" title="Error Log" fullscreen>
      <errorlog></errorlog>
    </Modal>
  </div>
</template>
<script>
import menuList from "../shared/menu";
import setting from "../components/settings";
import simpleLink from "../components/simple-link";
import fullscreen from "../components/screenfull";
import errorlog from "@/views/page/error-log";
import { mapState } from "vuex";
// require('../assets/Home_logo.jpg');
export default {
  data() {
    return {
      selectIndex: [1],
      menuList: menuList,
      activeName: "",
      openNames: [],
      errorLogModal: false
    };
  },
  components: {
    setting,
    simpleLink,
    fullscreen,
    errorlog
  },
  created() {
    // 通过router查找对应的menu
    if (this.menuList && Array.isArray(this.menuList)) {
      this.getCurrentPath(this.menuList, this.$route.path);
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (this.menuList && Array.isArray(this.menuList)) {
        this.getCurrentPath(this.menuList, this.$route.path);
      }
    }
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme,
      fixedHeader: state => state.setting.fixedHeader,
      openTagsView: state => state.setting.openTagsView,
      sidebarLogo: state => state.setting.sidebarLogo
    }),
    _showSetting: {
      get() {
        return this.$store.state.setting.showSetting;
      },
      set(val) {
        this.$store.dispatch("setting/showSetting", val);
      }
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
    },
    setting(evt) {
      this.$store.dispatch("setting/showSetting", !this._showSetting);
    }
  }
};
</script>
<style scoped lang="less">
.home-tab {
  position: fixed;
  float: left;
  height: 100vh;
  .logo-img {
    max-height: 49px;
    /* display: inline-block; */
    position: absolute;
    top: 0;
    left: 20px;
    width: initial;
  }
  .logo-desc {
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
.tab-content {
  margin-left: 240px;
  background-color: #f0f2f2;
  .tab-header {
    height: 50px;
    background-color: #fff;
    .tab-header-bread {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
    .link {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      padding: 0 20px;
      text-align: left;
    }
  }
}
.fixedHeader {
  width: calc(~"100% - 240px");
  position: fixed;
  z-index: 10;
}
.content {
  overflow: auto;
  width: calc(~"100% - 50px");
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
.debug {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
<style lang="less">
.tab-content {
  top: 0;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  .content {
    overflow-x: hidden;
  }
}
.setting-btn {
  border-radius: 5px;
  position: fixed;
  width: 50px;
  height: 50px;
  right: 0;
  top: 50%;
  z-index: 4;
  cursor: pointer;
}
.fixedContent {
  position: relative;
  top: 50px;
}
.secondHomeTab {
  top: 50px;
  position: relative;
  height: calc(~"100% - 50px") !important;
}
</style>