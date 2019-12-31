<template>
  <div class="wechat-content">
    <div style="float:left;position: absolute;top: 120px">
      <Alert>测试账号只有2个，前端写死的一个是100，一个是101</Alert>
      <Input v-model.number="uid"
             placeholder="测试id"
             style="width: 200px;margin-right: 8px;" />
      <Input v-model="nickname"
             placeholder="测试name"
             style="width: 200px;margin-right: 8px;" />
      <Button @click="connection">测试uid登录</Button>
    </div>
    <div class="clone">
      <div class="wechat-left">
        <template v-for="(user,idx) in currentUser">
          <div :key="user+'_'+idx"
               class="user-role"
               @click="selectUser(user)">
            <div class="wechat-user-name">
              <div class="img">
                <img alt="" />
              </div>
              <div class="user">
                <label>{{user.nickname||'error'}}</label>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="wechat-right">
        <template v-if="user">
          <div class="message-content">
            <template v-for="(msg,idx) in currentMsg">
              <!----------------------------------- 真实消息 ---------------------------------->
              <div :key="msg+'_'+idx"
                   class="div-message"
                   :style="{'justify-content': msg.uid===uid?'flex-end':'initial'}"
                   v-if="msg.type===2">
                <template v-if="msg.uid===uid">
                  <div class="message">
                    {{msg.msg}}
                  </div>
                  <div class="right-message">
                    <img :alt="msg.nickname" />
                  </div>
                </template>
                <template v-else>
                  <div class="left-message">
                    <img :alt="msg.nickname" />
                  </div>
                  <div class="message">
                    {{msg.msg}}
                  </div>
                </template>
              </div>
              <!------------------------------------- 登录消息 ---------------------------------->
              <div v-if="msg.type===1"
                   :key="msg+'_'+idx"
                   class="join-message">
                <label>
                  {{new Date()|timeFilter('yyyy-MM-dd hh:mm:ss')}}
                </label>
              </div>
            </template>
          </div>
          <div class="message-input">
            <div class="input"
                 contenteditable="true"
                 ref="input">
            </div>
            <Button class="btn"
                    @click="sendMessage(2,$refs.input.innerHTML)">发送</Button>
          </div>
        </template>
        <tmplate v-else>

        </tmplate>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ws: null,
      uid: null,
      nickname: '',
      msg: '',
      // 桥存在表示1对1，不存在表示群聊
      bridge: [],
      // 页面消息（接收到的全部消息）
      messageList: [],
      // 连接进来的user集合
      users: [],
      user: null
    }
  },
  computed: {
    currentMsg () {
      return (this.messageList || []).filter(msgContent => {
        // 需要修改，暂时没搭桥
        if (msgContent.bridge && msgContent.bridge.length)
          return msgContent.bridge.includes(this.uid) && msgContent.bridge.includes(this.user.uid);
        else
          return msgContent.type === 2 || (msgContent.type === 1 && msgContent.uid !== this.uid && msgContent.nickname !== this.nickname && msgContent.uid === this.user.uid);
      })
    },
    currentUser () {
      return (this.users || []).filter(user => user.uid !== this.uid);
    }
  },
  created () {
    // mock
    this.users = [{
      nickname: '刘凌宇',
      uid: 100
    }, {
      nickname: '刘航',
      uid: 101
    }];
  },
  mounted () {
    if (!this.uid) {
      // 弹框输入uid
    } else {
      this.conWebSocket();
    }
  },
  methods: {
    sendMessage (type = 1, msg = '') {
      /**
       * @params uid 主键
       * @params type 消息类型 1：连接成功登陆 2：正常的消息发送
       * @params nickname 缩略名
       * @params msg 消息主体
       * @params bridge 消息搭建的桥
       */
      this.ws.send(
        JSON.stringify({
          uid: this.uid,
          type: type,
          nickname: this.nickname,
          msg: msg,
          bridge: this.bridge
        })
      )
      this.$refs.input.innerHTML = '';
    },
    conWebSocket () {
      const vm = this;
      if (WebSocket) {
        // 双通道连接
        this.ws = new WebSocket('ws://localhost:9000/websocket');
        // 连接成功
        this.ws.onopen = (e) => {
          console.log('连接成功');
          if (!this.uid) {
            //
          } else {
            // socket消息发送信息，type1
            this.sendMessage(1);
          }
        };
        this.ws.onclose = () => {
          console.log('连接关闭');
        };
        this.ws.onerror = () => {
          console.log('连接错误');
        }
        // 消息接收
        this.ws.onmessage = (msg) => {
          console.log('info__', msg.data);
          /**
           * @params type 消息类型（根据用户发送的原封不动返回，客户端处理）
           * @params data 消息时间
           * @params msg 消息体
           * @params users 已登录的用户集合
           * @params uid 新用户uid
           * @params nickname 新用户名
           * @params bridge 新的桥连接
           */
          // 这里只收集用户和消息集合
          const message = JSON.parse(msg.data);
          if (message)
            vm.messageList.push(message);
          if (message.users)
            vm.users = message.users;
        }
      }
    },
    connection () {
      if (!this.uid) {
        this.$Message.error('uid不能为空！');
        return;
      }
      this.conWebSocket();
    },
    selectUser (user) {
      if (!user) {
        this.$Message.error('用户不存在');
        return;
      }
      this.user = user;
      this.bridge = [this.uid, user.uid];
    }
  },
  destroyed () {
    //
  }
}
</script>
<style lang="less" scoped>
.wechat-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(~"100vh - 120px");
  .clone {
    height: 600px;
    width: 800px;
    text-align: initial;
    border: 4px solid #fff;
    border-radius: 4px;
  }
  .wechat-left {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    width: 150px;
    overflow-y: auto;
    border-right: 2px solid #ccc;
    overflow-x: hidden;
    background-color: #e8e7e6;
    float: left;
    .user-role {
      height: 64px;
      display: flex;
      justify-content: center;
      padding: 13px;
      border-bottom: 2px solid #ccc;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: #e0dddd;
        transform: scaleX(1.1);
      }
      .wechat-user-name {
        width: 100%;
        .img {
          vertical-align: top;
          width: 36px;
          height: 36px;
          max-width: 36px;
          max-height: 36px;
          display: inline-block;
          margin-right: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        .user {
          display: inline-block;
          label {
            font-size: 15px;
          }
        }
      }
    }
  }
  .wechat-right {
    height: 100%;
    overflow: auto;
    margin-left: 150px;
    position: relative;
    .message-content {
      background-color: #f5f5f5;
      .join-message {
        text-align: center;
        height: 20px;
        label {
          display: inline-block;
          background-color: #fff;
          height: 100%;
        }
      }
      .div-message {
        min-height: 50px;
        display: flex;
        align-items: center;
        padding: 3px 5px;
        background-color: #f0f2f2;
        img {
          vertical-align: top;
          width: 36px;
          height: 36px;
          max-width: 36px;
          max-height: 36px;
          display: inline-block;
          margin-right: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        .left-message {
          flex: none;
          align-self: flex-start;
        }
        .right-message {
          flex: none;
          align-self: flex-start;
        }
        .message {
          padding: 5px;
          font-size: 14px;
          flex: auto;
          background-color: #fff;
          align-self: start;
          max-width: 60%;
          min-height: 30px;
          margin-right: 5px;
          flex: initial;
          min-width: 30px;
        }
      }
    }
    .message-input {
      height: 140px;
      background-color: #ffffff;
      position: absolute;
      bottom: 0;
      width: 100%;
      .input {
        width: 100%;
        height: 100px;
        overflow-y: auto;
        font-size: 15px;
        padding: 10px;
      }
      .btn {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
  }
}
.select {
  background-color: #c5c5c5;
}
</style>