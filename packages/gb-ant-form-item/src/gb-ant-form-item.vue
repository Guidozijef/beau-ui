<template>
  <div :id="labelKey" class="gb-ant-form-item-wrap">
    <a-form-item
      class="gb-form-item"
      v-bind="$attrs"
      :class="{
        'gb-form-item-text-wrap': textWrap,
        'gb-form-item-text-100p': formElem100p
      }"
      :label="label"
      :colon="colon"
    >
      <slot></slot>
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: "gbAntFormItem",
  props: {
    label: {
      type: String
    },
    labelTitle: {
      type: String
    },
    labelKey: {
      type: String
    },
    colon: {
      type: Boolean,
      default: false
    },
    textWrap: {
      type: Boolean,
      default: false
    },
    formElem100p: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 是否展示不下需要显示...
    if (this.labelTitle && this.labelKey) {
      const formItemDom = document.getElementById(this.labelKey);
      const labelDom = formItemDom.getElementsByTagName("label");
      if (labelDom && labelDom[0]) {
        labelDom[0].setAttribute("title", this.labelTitle);
      }
    }
  }
};
</script>
<style lang="less">
.gb-ant-form-item-wrap {
  .gb-form-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    &.gb-form-item-text-wrap {
      .ant-form-item-label {
        margin-top: -1px;
      }
    }
    &.gb-form-item-text-100p {
      .ant-form-item-control-wrapper {
        flex: 1;
      }
    }
  }
  .ant-form-item-label {
    margin-right: 6px;
    margin-top: 10px;
    max-height: 40px;
    line-height: 20px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    white-space: pre-wrap;
    width: 92px;
    padding-left: 8px;
    .ant-form-item-required {
      position: relative;
      width: 84px;
      &:before {
        position: absolute;
        left: -8px;
        top: 2px;
      }
    }
  }
}
</style>
