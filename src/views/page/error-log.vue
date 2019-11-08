<template>
  <div>
    <div style="margin:16px 0;text-align:right;">
      <Button type="primary" @click="clearErrorLog">
        <Icon type="md-trash" />清空
      </Button>
    </div>
    <Table :columns="headers" :data="errorLogs" border stripe>
      <template #message="{row,index}">
        <div>
          <b>Msg：</b>
          <Alert type="error">{{row.message.err.message}}</Alert>
        </div>
        <div>
          <b>Info：</b>
          <Alert type="warning">{{row.message.info}}</Alert>
        </div>
        <div>
          <b>Url：</b>
          <Alert type="success">{{row.message.url}}</Alert>
        </div>
      </template>
      <template #stack="{row,index}">
        <a>{{row.stack.err.stack}}</a>
      </template>
    </Table>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        { title: "Message", slot: "message" },
        { title: "Stack", slot: "stack" }
      ]
    };
  },
  computed: {
    ...mapState({
      errorLogs: state =>
        state.errorlog.errorLogs.map(({ err, vm, info, url }) => {
          return {
            message: {
              err,
              info,
              url
            },
            stack: {
              err
            }
          };
        })
    })
  },
  methods: {
    ...mapActions("errorlog", ["clearErrorLog"])
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 16px;
  text-align: left;
  margin: 10px 0;
}
</style>