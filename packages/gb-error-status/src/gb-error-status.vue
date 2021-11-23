<template>
  <div class="gb-error-status">
    <div class="error-content">
      <div class="error-content-title">{{ title }}</div>
      <div class="error-content-desc">{{ desc }}</div>
      <div class="error-content-btn-wrap" v-if="buttonText">
        <a-button type="primary" class="btn-error" @click="handleGoHmoe">{{
          buttonText
        }}</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gbErrorStatus",
  props: {
    title: {
      type: String,
      default: "404"
    },
    desc: {
      type: String,
      default: "抱歉，您访问的页面不存在或仍在开发中..."
    },
    buttonText: {
      type: String
    }
  },
  methods: {
    handleGoHmoe() {
      this.$emit("btnClick");
    }
  }
};
</script>
<style lang="less">
.gb-error-status {
  position: relative;
  width: 100%;
  height: 100%;
  .error-content {
    height: 360px;
    max-width: 430px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .error-content-title {
      color: #434e59;
      font-weight: bold;
      line-height: 72px;
      font-size: 72px;
    }
    .error-content-desc {
      color: #333;
      font-size: 20px;
      line-height: 28px;
      margin-top: 24px;
      margin-bottom: 16px;
    }
  }
}
</style>
