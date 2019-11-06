<template>
  <div>
    <Card :bordered="false">
      <div style="text-align:left;margin-bottom:10px;">
        <a :href="qiniuaddr+'/table-list.xlsx'">下载模板</a>
      </div>
      <Upload
        multiple
        type="drag"
        ref="upload"
        action="//jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUpload"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
      </Upload>
      <Row>
        <Table ref="table" :columns="headers" :data="data" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page
              :total="allData.length"
              :current="currentPage"
              @on-change="changePage"
              :page-size="pageSize"
              show-sizer
            ></Page>
          </div>
        </div>
      </Row>
    </Card>
  </div>
</template>
<script>
import * as XLSX from "xlsx";
import { mapState } from "vuex";
export default {
  data() {
    return {
      uploadList: [],
      headers: [],
      data: [],
      allData: [],
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      qiniuaddr: state => state.upload.qiniuaddr,
      domain: state => state.upload.domain
    })
  },
  mounted() {
    console.log(this.$refs.upload.fileList);
    this.uploadList = this.$refs.upload.fileList;
  },
  watch: {
    uploadList(newVal) {
      console.log(newVal);
    }
  },
  methods: {
    beforeUpload(file) {
      this.fileImport(file);
    },
    fileImport(file) {
      const self = this;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        if (fileReader.result) {
          var wb = XLSX.read(fileReader.result, {
            type: "binary" //以二进制的方式读取
          });
          const sheet0 = wb.Sheets[wb.SheetNames[0]]; //sheet0代表excel表格中的第一页
          const array = XLSX.utils.sheet_to_json(sheet0); //利用接口实现转换。
          let headers = [];
          array.forEach(item => {
            headers = headers.concat(Object.keys(item));
          });
          self.headers = Array.from(new Set(headers)).map((title, index) => {
            return {
              title: title,
              key: `${title}`,
              fixed: "center"
            };
          });
          self.allData = array;
          this.changePage(1);
          //mock
          //   var templates = new Array();
          //   var str1 = file.name;
          //   templates = str1.split("."); //将导入文件名去掉后缀
          //   console.log(templates);
          //   alert(JSON.stringify(str));
        }
      };
    },
    changePage(num) {
      if (this.allData && this.allData.length) {
        this.data = this.allData.filter(
          (item, index) =>
            index > (num - 1) * this.pageSize && index < num * this.pageSize
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>