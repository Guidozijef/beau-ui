<template>
  <div
    class="filter-sub-date-picker-container"
    :class="{ 'hide-afterline': hideAfterLine }"
  >
    <div class="filter-sub-date-picker-item-wrap">
      <span v-show="value" class="label-text">{{ placeholder }}</span>
      <a-date-picker
        class="filter-sub-date-picker"
        :class="{
          'auto-width': value
        }"
        :getCalendarContainer="triggerNode => triggerNode.parentNode"
        :placeholder="placeholder"
        :style="{ ...selectedStyle, width: width }"
        :value="defaultValue"
        :format="format"
        @change="handleChange"
      >
        <a-icon
          v-show="!value"
          slot="suffixIcon"
          type="down"
          class="icon-down"
        ></a-icon>
      </a-date-picker>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    placeholder: {
      type: String,
      default: "请选择日期"
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    hideAfterLine: {
      type: Boolean,
      default: false
    },
    defaultWidth: {
      type: String,
      default: "90px"
    },
    value: {
      type: String
    },
    selectedStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    }
  },
  data() {
    const defaultValue = this.value
      ? moment(this.value, this.format)
      : undefined;
    return {
      defaultValue: defaultValue,
      width: this.defaultWidth
    };
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.defaultValue = moment(newVal, this.format);
        this.width = "auto";
      } else {
        this.defaultValue = null;
        this.width = this.defaultWidth;
      }
    }
  },
  methods: {
    handleChange(value) {
      const valueStr = (value && value.format(this.format)) || undefined;
      this.$emit("change", valueStr);
    }
  }
};
</script>
<style lang="less">
.filter-sub-date-picker-container {
  position: relative;
  padding-left: 14px;
  padding-right: 14px;
  .filter-sub-date-picker-item-wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 32px;
    .label-text {
      white-space: nowrap;
      font-size: 14px;
      color: #bfbfbf;
      display: inline-block;
      line-height: 32px;
      padding-right: 8px;
    }
    .ant-calendar-picker-input {
      width: auto;
      padding-left: 0;
      padding-right: 0;
    }
    .auto-width {
      .ant-calendar-picker-input {
        width: 100px;
        line-height: 32px;
      }
      .ant-calendar-picker-clear {
        right: 0;
      }
    }
    .ant-calendar-picker {
      .ant-calendar-picker-input {
        border: 0 !important;
      }
      &:focus {
        box-shadow: 0 0 0 0 rgba(29, 71, 170, 0.2);
      }
    }
    .ant-calendar-picker-input {
      cursor: pointer;
      box-shadow: 0 0 0 0 rgba(29, 71, 170, 0.2);
    }
  }
  .icon-down {
    cursor: pointer;
    position: absolute;
    right: -2px;
    color: #bfbfbf;
  }
  &.hide-afterline {
    padding-right: 0;
    &:after {
      content: "";
      width: 0;
    }
  }
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    margin: auto 0;
    width: 1px;
    height: 16px;
    border-radius: 2px;
    bottom: 0;
    background-color: #dadade;
  }
}
</style>
