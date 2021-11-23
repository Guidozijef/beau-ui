<template>
  <div class="gb-ant-input-number-unit">
    <a-input-number
      v-bind="$attrs"
      :value="value"
      style="width:100%;"
      @change="handleInputChange"
    />
    <span class="gb-ant-input-number-unit-suffix"
      ><slot name="suffix"></slot
    ></span>
  </div>
</template>

<script>
export default {
  name: "gbAntInputNumberUnit",
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  methods: {
    handleInputChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>
<style lang="less">
.gb-ant-input-number-unit {
  position: relative;
  .ant-input-number {
    .ant-input-number-input {
      padding-right: 32px;
    }
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
  .gb-ant-input-number-unit-suffix {
    position: absolute;
    right: 11px;
    color: #b2b5bf;
  }
}
</style>
