<template>
  <div class="gb-ant-input-textarea-limit">
    <a-textarea v-bind="$attrs" :value="showValue" @change="handleChange" />
    <div
      class="gb-ant-input-textarea-limit-tip"
      :class="{
        'gb-ant-input-textarea-limit-tip-error': showValue.length > limitSize
      }"
    >
      {{ showValue.length }}/{{ limitSize }}
    </div>
  </div>
</template>

<script>
export default {
  name: "gbAntInputTextareaLimit",
  props: {
    limitSize: {
      type: Number,
      default: 200
    },
    value: {
      type: String
    }
  },
  watch: {
    value(newVal) {
      this.showValue = newVal;
    }
  },
  data() {
    return {
      showValue: this.value || ""
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>
<style lang="less">
.gb-ant-input-textarea-limit {
  margin-bottom: 4px;
  .ant-input {
    resize: none;
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less" scoped>
.gb-ant-input-textarea-limit {
  width: 100%;
  position: relative;
  .gb-ant-input-textarea-limit-tip {
    position: absolute;
    right: 10px;
    bottom: 5px;
    font-size: 12px;
    color: #b2b5bf;
    line-height: 20px;
    &.gb-ant-input-textarea-limit-tip-error {
      color: #f1420f;
    }
  }
}
</style>
