<template>
  <div>
    <h2 style="text-align:left;font-weight:bold;color:#475669;">中后台</h2>
    <template>
      <Card :bordered="false">
        <div
          style="display:flex;align-items: flex-start;margin-bottom:10px;justify-content: space-between;"
        >
          <div style="display:flex;flex-direction: column;">
            <label>当前时间</label>
            <label style="font-size:12px;">{{new Date()|timeFilter('yyyy-MM-dd hh:mm:ss')}}</label>
          </div>
          <div>
            <Button type="primary" @click="randMock()">切换数据</Button>
          </div>
        </div>
        <div style="height:250px;">
          <chart :data="mockData" :chartType="'line'"></chart>
        </div>
      </Card>
    </template>
    <template>
      <Row>
        <Col span="12">
          <Card :bordered="false" style="margin-right:12px !important;height:331px;">
            <div
              style="display:flex;align-items: flex-start;margin-bottom:10px;justify-content: space-between;"
            >
              <div style="display:flex;flex-direction: column;">
                <label>当前时间</label>
                <label style="font-size:12px;">{{new Date()|timeFilter('yyyy-MM-dd hh:mm:ss')}}</label>
              </div>
              <div>
                <!-- <a-button type="primary" @click="randMock()">切换数据</a-button> -->
              </div>
            </div>
            <div style="height:250px;">
              <chart :data="mockData" :chartType="'bar'"></chart>
            </div>
          </Card>
        </Col>
        <Col span="12">
          <Card :bordered="false" style="height:331px;">
            <Table :columns="columns1" :data="data1"></Table>
          </Card>
        </Col>
      </Row>
    </template>
  </div>
</template>
<script>
import chart from "@com/charts";
export default {
  components: { chart },
  data() {
    return {
      mockData: [],
      xData: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      columns1: [
        {
          title: "所在年份",
          key: "year"
        },
        {
          title: "一月",
          key: "january"
        },
        {
          title: "二月",
          key: "february"
        },
        {
          title: "三月",
          key: "march"
        },
        {
          title: "四月",
          key: "april"
        },
        {
          title: "五月",
          key: "may"
        },
        {
          title: "六月",
          key: "june"
        },
        {
          title: "七月",
          key: "july"
        },
        {
          title: "八月",
          key: "august"
        },
        {
          title: "九月",
          key: "september"
        },
        {
          title: "十月",
          key: "october"
        },
        {
          title: "十一月",
          key: "november"
        },
        {
          title: "十二月",
          key: "december"
        }
      ],
      data1: [
        {
          year: "2017年占比图",
          january: Math.ceil(Math.random() * 1000),
          february: Math.ceil(Math.random() * 1000),
          march: Math.ceil(Math.random() * 1000),
          april: Math.ceil(Math.random() * 1000),
          may: Math.ceil(Math.random() * 1000),
          june: Math.ceil(Math.random() * 1000),
          july: Math.ceil(Math.random() * 1000),
          august: Math.ceil(Math.random() * 1000),
          september: Math.ceil(Math.random() * 1000),
          october: Math.ceil(Math.random() * 1000),
          november: Math.ceil(Math.random() * 1000),
          december: Math.ceil(Math.random() * 1000)
        },
        {
          year: "2018年占比图",
          january: Math.ceil(Math.random() * 1000),
          february: Math.ceil(Math.random() * 1000),
          march: Math.ceil(Math.random() * 1000),
          april: Math.ceil(Math.random() * 1000),
          may: Math.ceil(Math.random() * 1000),
          june: Math.ceil(Math.random() * 1000),
          july: Math.ceil(Math.random() * 1000),
          august: Math.ceil(Math.random() * 1000),
          september: Math.ceil(Math.random() * 1000),
          october: Math.ceil(Math.random() * 1000),
          november: Math.ceil(Math.random() * 1000),
          december: Math.ceil(Math.random() * 1000)
        },
        {
          year: "2019年占比图",
          january: Math.ceil(Math.random() * 1000),
          february: Math.ceil(Math.random() * 1000),
          march: Math.ceil(Math.random() * 1000),
          april: Math.ceil(Math.random() * 1000),
          may: Math.ceil(Math.random() * 1000),
          june: Math.ceil(Math.random() * 1000),
          july: Math.ceil(Math.random() * 1000),
          august: Math.ceil(Math.random() * 1000),
          september: Math.ceil(Math.random() * 1000),
          october: Math.ceil(Math.random() * 1000),
          november: Math.ceil(Math.random() * 1000),
          december: Math.ceil(Math.random() * 1000)
        }
      ]
    };
  },
  created() {
    this.mockData = [
      {
        title: "2019年占比图"
      },
      {
        title: "2018年占比图"
      },
      {
        title: "2017年占比图"
      }
    ];
    this.mockData2 = [];
    this.randMock();
  },
  methods: {
    randMock() {
      this.mockData = this.mockData.map(({ title }) => {
        const self = this;
        return {
          title,
          data: new Array(12).fill(1).map((data, index) => {
            return { x: self.xData[index], y: Math.ceil(Math.random() * 1000) };
          })
        };
      });
    }
  }
};
</script>