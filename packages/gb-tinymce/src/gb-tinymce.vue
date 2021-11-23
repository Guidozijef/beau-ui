<template>
  <div class="gb-tinymce">
    <editor
      id="tinymce"
      v-model="value"
      :disabled="disabled"
      :init="initConfig"
    ></editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
  name: "gbTinymce",
  components: {
    Editor
  },
  props: {
    defaultValue: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tinyInitConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fileConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    uplodaFileFn: {
      type: Function,
      default: () => {
        return new Promise();
      }
    }
  },
  data() {
    const _self = this;
    return {
      value: this.defaultValue,
      initConfig: {
        // 配置语言文件地址
        // language_url: `./tinymce/langs/zh_CN.js`,
        language_url: "",
        language: "zh_CN",
        // 配置皮肤地址
        // skin_url: `./tinymce/skins/ui/oxide`,
        skin_url: "",
        // 配置内容css地址
        // content_css: `./tinymce/skins/content/default/content.css`,
        content_css: "",
        // 设置高度
        height: 500,
        // 显示编辑器底部的状态栏
        statusbar: false,
        // 显示底部TINY广告
        branding: false,
        // 显示左下角的当前标签路径
        elementpath: false,
        // 显示菜单
        menubar: true,
        // 工具栏显示图标
        toolbar:
          "undo redo | fontsizeselect | forecolor backcolor | link unlink image code imagetools | bold italic underline strikethrough | outdent indent blockquote | alignleft aligncenter alignright alignjustify | bullist numlist | fontselect | removeformat",
        // 文字大小设置
        fontsize_formats: "12px 14px 16px 18px 20px 22px 24px 32px 36px",
        // 插件引入
        plugins:
          "image imagetools link lists code table colorpicker textcolor wordcount contextmenu",
        // 允许跨域上传图片的域名列表
        imagetools_cors_host: [],
        // 粘贴的同时能把内容里面的图片自动上传
        paste_data_images: true,
        // 上传处理函数
        images_upload_handler(blobInfo, success, failure, /*progress*/) {
          const maxSize = (_self.fileConfig.fileSize || 0.5) * 1024 * 1024;
          const formData = new FormData();
          if (blobInfo.blob().size > maxSize) {
            failure("图片超过限制大小");
            return false;
          }
          formData.append("file", blobInfo.blob());
          if (_self.fileConfig.fileName) {
            formData.append("fileName", _self.fileConfig.fileName);
          }
          formData.append(
            "category",
            _self.fileConfig.category || "tinymce_upload"
          );
          _self
            .uplodaFileFn(formData)
            .then(res => {
              success(`${res[_self.fileConfig.responseFileUrlKey]}`);
            })
            .catch(err => {
              console.log(err);
              failure("上传失败");
            });
        },
        ...this.tinyInitConfig
      }
    };
  },
  watch: {
    value(newValue) {
      this.$emit("change", newValue);
    }
  },
  mounted() {
    tinymce.init({});
  }
};
</script>
