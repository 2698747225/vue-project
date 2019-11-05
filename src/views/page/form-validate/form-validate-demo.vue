<template>
  <div>
    <Alert>
      <template slot="desc" style="font-size:16px;">
        <label style="font-size:16px;">基于iView+async-validator的表单验证</label>
      </template>
    </Alert>
    <Card class="form-card">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="姓名：" prop="name" style="width:400px;">
          <Input v-model="formValidate.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="邮件：" prop="mail" style="width:400px;">
          <Input v-model="formValidate.mail" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="城市：" prop="city" style="width:400px;">
          <!-- 待修改-->
          <Input v-model="formValidate.city" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="开始时间：" prop="datetime" style="width:400px;">
          <DatePicker
            v-model="formValidate.datetime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            placeholder="请输入"
            style="width:100%;"
          ></DatePicker>
        </FormItem>
        <FormItem label="状态：" prop="state" style="width:400px;">
          <RadioGroup v-model="formValidate.state" style="display:flex;">
            <Radio label="0">开启</Radio>
            <Radio label="1">关闭</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="描述：" prop="desc" style="width:400px;">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入"
          ></Input>
        </FormItem>
        <FormItem style="text-align:left;">
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { validateMail } from "@/shared/iviewValidate.js";
export default {
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        state: "",
        datetime: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空！",
            trigger: "change"
          }
        ],
        mail: [
          {
            required: true,
            message: "邮箱不能为空！",
            trigger: "change"
          },
          {
            validEmail: validateMail("邮箱格式不正确！"),
            trigger: "change"
          }
        ],
        city: [
          {
            required: true,
            message: "城市不能为空！",
            trigger: "change"
          }
        ],
        state: [
          {
            required: true,
            message: "状态不能为空！",
            trigger: "change"
          }
        ],
        datetime: [
          {
            required: true,
            message: "开始时间不能为空！",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "描述不能为空！",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
@otherH: "200px";
/deep/ .ivu-date-picker-rel {
  width: 100%;
}
.form-card {
  height: calc(~"100vh - 150px - @otherH");
}
</style>