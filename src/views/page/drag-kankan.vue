<template>
  <div>
    <Alert>
      <template slot="desc" style="font-size:16px;">
        <label style="font-size:16px;">
          表格拖拽。
          <br />格拖拽。
          <br />拖拽
          <br />拽
        </label>
      </template>
    </Alert>
    <Row>
      <Col span="8" style="padding-right:20px;">
        <dragcard
          :title="'Todo'"
          :data="array1"
          :title_style="{'background-color':'#4A9FF9','color':'#fff'}"
        ></dragcard>
      </Col>
      <Col span="8" style="padding:0 20px;">
        <dragcard
          :title="'Working'"
          :data="array2"
          :title_style="{'background-color':'#F9944A','color':'#fff'}"
        ></dragcard>
      </Col>
      <Col span="8" style="padding-left:20px;">
        <dragcard
          :title="'Done'"
          :data="array3"
          :title_style="{'background-color':'#2AC06D','color':'#fff'}"
        ></dragcard>
      </Col>
    </Row>
  </div>
</template>
<script>
import dragcard from "../../components/dropCard";
export default {
  components: { dragcard },
  data() {
    return {
      array1: [
        "Mission1",
        "Mission2",
        "Mission3",
        "Mission4",
        "Mission5",
        "Mission6"
      ],
      array2: [
        "Mission7",
        "Mission8",
        "Mission9",
        "Mission10",
        "Mission11",
        "Mission12"
      ],
      array3: [
        "Mission13",
        "Mission14",
        "Mission15",
        "Mission16",
        "Mission17",
        "Mission18"
      ]
    };
  }
};
</script>
<style lang="less" scoped>
</style>