<template>
  <div>
    <!-- 表格检索部分 -->
    <Card>
      <Row>
        <!-- <Input v-model="formValidate.name" placeholder="请输入"></Input> -->
      </Row>
    </Card>
    <!-- 表格 -->
    <Card class="complex-card">
      <Table :columns="headers" :data="jsonList" border stripe>
        <template #timestamp="{row,index}">
          <label>{{row.timestamp}}</label>
        </template>
        <template #title="{row,index}">
          <a>{{row.title}}</a>
        </template>
        <template #type="{row,index}">
          <Tag
            size="large"
            type="border"
            color="primary"
          >{{row.type|dictionaryFilter('CalendarType_dic')}}</Tag>
        </template>
        <template #importance="{row,index}">
          <Rate v-model="row.importance" :count="3" />
        </template>
        <template #status="{row,index}">
          <Tag
            type="border"
            size="large"
            :color="getColor(row.status)"
          >{{row.status|dictionaryFilter('CalendarStatus_dic')}}</Tag>
        </template>
        <template #author="{row,index}">
          <label>{{row.author}}</label>
        </template>
        <template #action="{row,index}">
          <div style="display:flex;justify-content: space-around;">
            <Button type="info" @click="edit(row,index)">编辑</Button>
            <template v-if="row.status!=1">
              <Button type="success" @click="row.status='1'">发布</Button>
            </template>
            <template v-else>
              <Button @click="row.status='0'">起草</Button>
            </template>
            <template v-if="row.status!=2">
              <Button type="error" @click="row.status='2'">删除</Button>
            </template>
            <template v-else>
              <Button @click="row.status='0'">起草</Button>
            </template>
          </div>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="allData.length"
            :current="currentPage"
            :page-size="pageSize"
            :page-size-opts="[10,15,20,30,50]"
            @on-change="changePage"
            @on-page-size-change="pageSizeChange"
            show-sizer
          ></Page>
        </div>
      </div>
    </Card>
    <Modal
      v-model="editVisible"
      title="编辑"
      @on-ok="handleSubmit($event,'formValidate')"
      @on-cancel="editVisible=false"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="Author：" prop="author" style="width:400px;">
          <Input v-model="formValidate.author" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="邮件：" prop="imp" style="width:400px;">
          <Rate v-model="formValidate.imp" :count="3" />
        </FormItem>
        <FormItem label="描述：" prop="title" style="width:400px;">
          <Input
            v-model="formValidate.title"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import * as json from "@/assets/json/table-list.json";
import { isArray, isUndefined } from "@/utils/validator";
export default {
  data() {
    return {
      allData: json
        ? json.default.map(item => {
            return {
              ...item,
              importance: +item.importance
            };
          })
        : [],
      headers: [],
      editVisible: false,
      selectItem: null,
      formValidate: {
        title: "",
        author: "",
        imp: 0,
        index: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "change"
          }
        ],
        author: [
          {
            required: true,
            message: "不能为空！",
            trigger: "change"
          }
        ]
      },
      jsonList: [],
      pageSize: 15,
      currentPage: 1
    };
  },
  created() {
    this.changePage(1);
    // 初始化获取json
    if (this.jsonList && this.jsonList.length) {
      const headerArr = Object.keys(this.jsonList[0]);
      if (isArray(headerArr)) {
        this.headers = headerArr.map(item => {
          return {
            title: item.toUpperCase(),
            slot: item,
            align: item === "title" ? "left" : "center",
            width: item === "title" ? "500" : null,
            minWidth: 150
          };
        });
        // 拼接action列
        this.headers = this.headers.concat({
          title: "Action",
          slot: "action",
          align: "center",
          width: "250"
        });
      }
    }
  },
  methods: {
    getColor(value) {
      switch (value) {
        case "0":
          return "default";
        case "1":
          return "success";
        case "2":
          return "error";
      }
    },
    edit(item, index) {
      if (item) {
        this.formValidate.title = item.title;
        this.formValidate.author = item.author;
        this.formValidate.imp = item.importance;
        this.formValidate.index = index;
      }
      this.editVisible = true;
    },
    handleSubmit(evt, name) {
      const self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!isUndefined(self.formValidate.index)) {
            self.jsonList[self.formValidate.index].title =
              self.formValidate.title;
            self.jsonList[self.formValidate.index].author =
              self.formValidate.author;
            self.jsonList[self.formValidate.index].importance =
              self.formValidate.imp;
          }
          self.$Message.success("Success!");
        } else {
          evt.preventDefault();
          self.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    changePage(num) {
      this.currentPage = num;
      if (this.allData && this.allData.length) {
        this.jsonList = this.allData.filter(
          (item, index) =>
            index > (num - 1) * this.pageSize && index < num * this.pageSize
        );
      }
      this.$nextTick(() => {
        this.hideLoading();
      });
    },
    pageSizeChange(pageSize) {
      //   this.showLoading();
      this.pageSize = pageSize;
      this.changePage(this.currentPage);
    }
  }
};
</script>
<style lang="less" scoped>
.complex-card {
  min-height: calc(~"100vh - 150px - 50px");
}
</style>