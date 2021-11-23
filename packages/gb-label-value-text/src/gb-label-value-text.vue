<template>
  <div class="gb-label-value-text">
    <span class="gb-label-text">{{ label }}</span>
    <span
      class="gb-value-text"
      :title="value"
      :class="{
        'gn-value-textarea': isTextArea,
        'gb-value-ellipsis': isEllipsis
      }"
      >{{ value }}</span
    >
  </div>
</template>

<script>
export default {
  name: "gbLabelValueText",
  props: {
    label: {
      type: String,
      default: "标签"
    },
    value: {
      type: String,
      default: "值"
    },
    isTextArea: {
      type: Boolean,
      default: false
    },
    isEllipsis: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less">
.gb-label-value-text {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .gb-label-text {
    color: #9d9fa7;
    line-height: 20px;
    display: flex;
    flex-shrink: 0;
  }
  .gb-value-text {
    color: #424656;
    line-height: 20px;
    flex: 1;
    &.gb-value-textarea {
      white-space: pre-wrap;
    }
    &.gb-value-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
