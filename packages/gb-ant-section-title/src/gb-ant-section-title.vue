<template>
  <div class="gb-ant-section-title">
    <div class="gb-ant-section-title-text">{{ title }}</div>
    <div v-if="!!extra" class="gb-ant-section-title-extra">{{ extra }}</div>
    <!--自定义额外的内容-->
    <slot name="extraContent"></slot>
    <a-tooltip
      v-if="tooltipConfig.content"
      :placement="tooltipConfig.placement"
      :title="tooltipConfig.content"
      :overlayClassName="tooltipConfig.overlayClassName"
      :autoAdjustOverflow="tooltipConfig.autoAdjustOverflow"
      arrow-point-at-center
    >
      <a-icon type="question-circle" class="question-icon"></a-icon>
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: "gbAntSectionTitle",
  props: {
    title: {
      type: String,
      default: "暂无标题"
    },
    extra: {
      type: String,
      default: ""
    },
    tooltipConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style lang="less">
.gb-ant-section-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  .gb-ant-section-title-text {
    color: #424656;
    line-height: 20px;
    position: relative;
    display: flex;
    align-items: center;
    font-weight: bold;
    padding-left: 10px;
    &:before {
      content: "";
      width: 3px;
      height: 10px;
      background-color: #1d47aa;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto 0;
    }
  }
  .gb-ant-section-title-extra {
    color: #9d9fa7;
    line-height: 20px;
    margin-left: 12px;
  }
  .question-icon {
    margin-left: 8px;
  }
}
</style>
