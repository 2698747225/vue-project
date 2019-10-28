<template>
  <div class="home">
    <div class="header">
      <div class="header-title">
        <img alt src="../assets/logo.png" style="width:50px;height:50px;" />
        <strong style="font-size:16px;">Ant Design</strong>
      </div>
      <div style="border-bottom:1px solid #cdcdcd">
        <Menu mode="horizontal" class="header-menu">
          <MenuItem
            :name="item.value"
            :key="item.value"
            v-for="item in menuList"
            @click.native="item.action()"
          >
            <Icon type="ios-paper" />
            {{item.name}}
          </MenuItem>
        </Menu>
      </div>
    </div>
    <div>
      <Carousel autoplay loop>
        <CarouselItem>
          <div>
            <img src="../assets/banner1.jpg" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <img src="../assets/banner2.jpg" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <img src="../assets/banner哈.jpg" />
          </div>
        </CarouselItem>
      </Carousel>
    </div>

    <ul style="margin:30px;">
      <Row>
        <Col span="6" :key="item.id" v-for="item in tabList">
          <li class="home-li">
            <span style="display: inline-block;">
              <h3
                style="margin-bottom:18px;font-weight:600;font-family: 'Bitter', serif;"
              >{{item.title}}</h3>
              <!-- <img :src="item.imgUrl" style="display:inline-block" /> -->
              <label style="width:300px;display:inline-block;">{{item.context}}</label>
            </span>
          </li>
        </Col>
      </Row>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import * as img1 from "../assets/功能定义.png";
import * as img2 from "../assets/托管.png";
import * as img3 from "../assets/运营管理.png";
import * as img4 from "../assets/服务地球.png";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    const self = this;
    return {
      menuList: [
        { name: "ant-design-test", value: 1, action() {} },
        {
          name: "点击进入",
          value: 2,
          action: () => {
            self.$router.push("homePage");
          }
        }
      ]
    };
  },
  computed: {
    tabList() {
      const array = [
        {
          context:
            "风回小院庭芜绿，柳眼春相续。凭阑半日独无言，依旧竹声新月似当年。笙歌未散尊罍在，池面冰初解。烛明香暗画堂深，满鬓青霜残雪思难任。",
          imgUrl: img4,
          id: 1,
          title: "《虞美人·春怨》"
        },
        {
          context:
            "风老莺雏，雨肥梅子，午阴嘉树清圆。地卑山近，衣润费炉烟。人静乌鸢自乐，小桥外、新绿溅溅。凭阑久，黄芦苦竹，拟泛九江船。年年。如社燕，飘流瀚海，来寄修椽。且莫思身外，长近尊前。憔悴江南倦客，不堪听、急管繁弦。歌筵畔，先安簟枕，容我醉时眠。",
          imgUrl: img1,
          id: 2,
          title: "《满庭芳》"
        },
        {
          context:
            "天上星河转，人间帘幕垂。凉生枕簟泪痕滋。起解罗衣聊问、夜何其。翠贴莲蓬小，金销藕叶稀。旧时天气旧时衣。只有情怀不似、旧家时。",
          imgUrl: img2,
          id: 3,
          title: "《南歌子》"
        },
        {
          context:
            "裁剪冰绡，轻叠数重，淡著胭脂匀注。新样靓妆，艳溢香融，羞杀蕊珠宫女。易得凋零，更多少、无情风雨。愁苦。闲院落凄凉，几番春暮。凭寄离恨重重，者双燕，何曾会人言语。天遥地远，万水千山，知他故宫何处。怎不思量，除梦里、有时曾去。无据，和梦也新来不做。",
          imgUrl: img3,
          id: 4,
          title: "《燕山亭》"
        }
      ];
      return array;
    }
  }
};
</script>
<style scoped lang="less">
.home {
  padding: 0 70px;
}
.header {
}
.header-title {
  float: left;
  clear: both;
  /* margin: 15px; */
}
.header-menu {
  display: flex;
  justify-content: flex-end;
  border: none;
  /* float: right; */
}
.header-menu:after {
  /* content: "";
  display: block;
  line-height: 0;
  clear: both; */
}
// .ant-carousel >>> .slick-slide {
//   text-align: center;
// }
.home-li {
  /* height: 60px;
  width: 200px; */
}

ul {
  list-style: none;
}

img {
  width: 100%;
}
.ant-carousel img {
  // display: inline-block !important;
}
</style>