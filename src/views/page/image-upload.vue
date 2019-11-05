<template>
  <div>
    <Card :bordered="false">
      <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="item.uid+index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url" alt />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
    </Card>
    <Card :bordered="false">
      <div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          :format="limitType"
          :max-size="limitSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          :action="domain"
          :data="qiniuData"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
          <!-- <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
          </div>-->
        </Upload>
      </div>
    </Card>
  </div>
</template>
<script>
import { getToken } from "../../shared/qiniuUpload";
import { mapState } from "vuex";
import { local } from "../../utils/storage";
export default {
  data() {
    return {
      limitSize: 2 * 1024 * 1024, // 1M,
      limitType: ["jpg", "jpeg", "png"],
      file: null,
      uploadList: []
    };
  },
  created() {
    // 原本应该从数据库中获取文件地址，但现在暂时未接入mongoDb，改为浏览器缓存或默认路径图片
    try {
      this.uploadList = JSON.parse(local.get("imageList"));
    } catch (e) {
      this.$Message.error(e);
    }
  },
  computed: {
    ...mapState({
      qiniuaddr: state => state.upload.qiniuaddr,
      domain: state => state.upload.domain
    }),
    qiniuData() {
      return {
        // 拼接hash，避免在此模式下，七牛不会重复上传的问题
        key: this.file ? `${this.file.name}_${this.file.response.hash}` : "",
        token: getToken(),
        putExtra: JSON.stringify({
          fname: this.file ? this.file.name : ""
        }),
        config: JSON.stringify({
          region: "qiniu.region.z2"
        })
      };
    }
  },
  methods: {
    handleBeforeUpload(file) {
      this.file = file;
      const sizeLimit = file.size < this.limitSize;
      // const fileCountLimit = this.modalModel.fileList.length < this.limit.fileAccount;
      if (
        !this.limitType.includes(
          file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase()
        )
      ) {
        this.$Message.error("文件类型错误！");
        return false;
      }

      if (!sizeLimit) {
        this.$Message.error("文件太大，上传失败");
        return false;
      }

      // if (!fileCountLimit) {
      //     this.message.create('error', `当前仅限传入${this.limit.fileAccount}个文件`);
      // }
      // 返回一个promise异步类型，解决iView控件封装的请求body内容不能在beforeUpload钩子函数执行前变化的问题
      this.showLoading();
      return Promise.resolve(true); // && fileCountLimit
    },
    // 上传成功
    handleSuccess() {
      this.hideLoading();
      this.uploadList = Array.prototype.concat(
        this.uploadList,
        (this.$refs.upload.fileList || []).map(item => {
          return {
            ...item,
            url: `${this.qiniuaddr}/${item.response.key}`
          };
        })
      );
      this.localCache();
    },
    // 上传失败
    handleError() {
      this.hideLoading();
      this.$Message.error("上传失败！");
    },
    // 预览
    handleView(url) {
      const content = `<img src="${url}" style="height:100%;width:100%;"/>`;
      this.$Modal.confirm({
        content: content,
        closable: true
      });
    },
    // 移除
    handleRemove(index) {
      this.uploadList.splice(index, 1);
      this.localCache();
    },

    // 本地缓存
    localCache() {
      local.set(
        "imageList",
        JSON.stringify(
          this.uploadList.map(({ uid, url, name }) => {
            return {
              uid,
              url,
              name,
              status: "finished"
            };
          })
        )
      );
    }
  }
};
</script>
<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 10px 20px;
  max-height: 130px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2, 1.2);
  }
}
.demo-upload-list img {
  max-width: 100%;
  max-height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>