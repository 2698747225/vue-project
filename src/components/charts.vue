<template>
  <div ref="chart" style="height:100%;"></div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  props: ["data", "chartType"],
  data: function() {
    return {
      instance: null,
      instanceRelease: null
    };
  },
  computed: {
    options() {
      return {
        xAxis: {
          type: "category",
          data: this.data ? this.data[0].data.map(({ x }) => x) : []
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: this.data ? this.data.map(({ title }) => title) : []
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: this.data
          ? this.data.map(({ title, data }) => {
              return {
                name: title,
                data: data.map(({ y }) => y),
                type: this.chartType || "bar"
                // smooth: this.chartType === "line" ? true : false
              };
            })
          : []
      };
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.refresh();
        }
      },
      deep: true
    }
  },
  methods: {
    refresh() {
      if (!this.instance) {
        this.$Message.error("图表未实例化！");
        return;
      }
      this.instance.setOption(this.options);
    }
  },
  mounted() {
    /* eslint-disable*/
    const dom = this.$refs.chart;
    this.instance = echarts.init(dom, "macarons");
    this.instanceRelease = this.instance.setOption(this.options);
  },
  destroyed() {
    if (this.instanceRelease) this.instanceRelease.dispose();
  }
};
</script>

<style lang="less" scoped>
</style>