<template>
  <div class="charts-page">
    <h2>中后台</h2>
    <template>
      <Row>
        <Col span="8" style="padding-right:15px;">
          <Card :bordered="false">
            <div class="charts-total">
              <div class="icon-seven">
                <Icon type="md-people" />
              </div>
              <div style="display:inline;font-weight:bold;">
                <div style="font-size:16px;color:rgba(0,0,0,0.45)">2017年合计</div>
                <div style="font-size:20px;">{{total[0]||0}}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8" style="padding-right:15px;">
          <Card :bordered="false">
            <div class="charts-total">
              <div class="icon-eight">
                <Icon type="ios-chatboxes-outline" />
              </div>
              <div style="display:inline;font-weight:bold;">
                <div style="font-size:16px;color:rgba(0,0,0,0.45)">2018年合计</div>
                <div style="font-size:20px;">{{total[1]||0}}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card :bordered="false">
            <div class="charts-total">
              <div class="icon-nine">
                <Icon type="ios-appstore-outline" />
              </div>
              <div style="display:inline;font-weight:bold;">
                <div style="font-size:16px;color:rgba(0,0,0,0.45)">2018年合计</div>
                <div style="font-size:20px;">{{total[2]||0}}</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </template>
    <template>
      <Card :bordered="false">
        <div class="chart-d">
          <div class="chart-desc">
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
            <div class="chart-d">
              <div class="chart-desc">
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
      mockData: [
        {
          title: "2019年占比图"
        },
        {
          title: "2018年占比图"
        },
        {
          title: "2017年占比图"
        }
      ],
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
          key: "year",
          width: 120
        },
        {
          title: "一月",
          key: "一月"
        },
        {
          title: "二月",
          key: "二月"
        },
        {
          title: "三月",
          key: "三月"
        },
        {
          title: "四月",
          key: "四月"
        },
        {
          title: "五月",
          key: "五月"
        },
        {
          title: "六月",
          key: "六月"
        },
        {
          title: "七月",
          key: "七月"
        },
        {
          title: "八月",
          key: "八月"
        },
        {
          title: "九月",
          key: "九月"
        },
        {
          title: "十月",
          key: "十月"
        },
        {
          title: "十一月",
          key: "十一月"
        },
        {
          title: "十二月",
          key: "十二月"
        }
      ]
    };
  },
  created() {
    this.randMock();
  },
  computed: {
    data1() {
      return (
        this.mockData &&
        this.mockData.map(item => {
          return {
            year: item.title,
            ...(item.data &&
              Object.fromEntries(
                item.data.map(data => {
                  return [data.x, data.y];
                })
              ))
          };
        })
      );
    },
    total() {
      return this.mockData.map(({ data }) => {
        return data
          .map(({ y }) => y)
          .reduce((v1, v2) => {
            return v1 + v2;
          });
      });
    }
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
<style lang="less" scoped>
.charts-page {
  & > h2 {
    text-align: left;
    font-weight: bold;
    color: #475669;
  }
  .chart-d {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    justify-content: space-between;
    .chart-desc {
      display: flex;
      flex-direction: column;
    }
  }
  .charts-total {
    display: flex;
    justify-content: space-between;
  }
  /deep/ .ivu-table-cell {
    padding: 0 !important;
  }
  .icon-seven {
    height: 55px;
    width: 60px;
    border-radius: 6px;
    &:hover {
      background-color: #40c9c6;
      transition: all 0.38s ease-out;
    }
    & > i {
      font-size: 50px;
      color: #40c9c6;
      &:hover {
        color: #fff;
        transition: all 0.38s ease-out;
      }
    }
  }
  .icon-eight {
    height: 55px;
    width: 60px;
    border-radius: 6px;
    &:hover {
      background-color: #36a3f7;
      transition: all 0.38s ease-out;
    }
    & > i {
      font-size: 50px;
      color: #36a3f7;
      &:hover {
        color: #fff;
        transition: all 0.38s ease-out;
      }
    }
  }
  .icon-nine {
    height: 55px;
    width: 60px;
    border-radius: 6px;
    &:hover {
      background-color: #f4516c;
      transition: all 0.38s ease-out;
    }
    & > i {
      font-size: 50px;
      color: #f4516c;
      &:hover {
        color: #fff;
        transition: all 0.38s ease-out;
      }
    }
  }
}
</style>