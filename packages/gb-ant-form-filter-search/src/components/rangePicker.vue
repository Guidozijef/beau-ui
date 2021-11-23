<template>
  <div
    class="filter-sub-range-picker-container"
    :class="{ 'hide-afterline': hideAfterLine }"
  >
    <div class="filter-sub-range-picker-item-wrap">
      <span v-show="value && value[0]" class="label-text">{{ labelText }}</span>
      <a-range-picker
        class="filter-sub-range-picker"
        :class="{
          'auto-width': value && value[0],
          'empty-width': !value || !value[0],
          'no-border': !value || !value[0] || !border
        }"
        :getCalendarContainer="triggerNode => triggerNode.parentNode"
        :placeholder="value && value[0] ? placeholder : [labelText, '']"
        :style="{ ...selectedStyle, width }"
        :value="defaultValue"
        :format="format"
        @change="handleChange"
      >
        <a-icon
          v-show="!value || !value[0]"
          slot="suffixIcon"
          type="down"
          class="icon-down"
        ></a-icon>
      </a-range-picker>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    placeholder: {
      type: Array,
      default: () => {
        return ["请选择", ""];
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    defaultWidth: {
      type: String,
      default: "90px"
    },
    labelText: {
      type: String,
      default: "起始日期"
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    hideAfterLine: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
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
    const defaultValue = [];
    this.value.forEach(item => {
      defaultValue.push(moment(item, this.format));
    });
    return {
      defaultValue: defaultValue,
      width: this.defaultWidth
    };
  },
  watch: {
    value(newVal) {
      if (!newVal[0]) {
        this.defaultValue = null;
        this.width = this.defaultWidth;
      } else {
        this.width = "auto";
        this.defaultValue = [
          moment(newVal[0], this.format),
          moment(newVal[1], this.format)
        ];
      }
      return this.defaultValue;
    }
  },
  methods: {
    handleChange(valueArr) {
      const startTime = (valueArr[0] && valueArr[0].format(this.format)) || "";
      const endTime = (valueArr[1] && valueArr[1].format(this.format)) || "";
      this.$emit("change", startTime ? [startTime, endTime] : undefined);
    }
  }
};
</script>
<style lang="less">
.filter-sub-range-picker-container {
  position: relative;
  padding-left: 14px;
  padding-right: 14px;
  .filter-sub-range-picker-item-wrap {
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
    .filter-sub-range-picker {
      .ant-calendar-range-picker-input {
        outline: none;
        padding-left: 0;
        padding-right: 0;
        &:first-of-type {
          width: 80px;
        }
        &:last-of-type {
          width: 100px;
          text-align: left;
          margin-left: 5px;
        }
      }

      &.empty-width {
        .ant-calendar-range-picker-separator {
          display: none;
        }
        .ant-calendar-range-picker-input {
          &:first-child {
            text-align: left;
            width: 100%;
          }
          &:last-of-type {
            display: none;
          }
        }
      }
      &.auto-width {
        &.no-border {
          .ant-calendar-picker-clear {
            right: 0;
          }
        }
      }
      &.no-border {
        .ant-calendar-picker-input {
          border: 0 !important;
        }
      }
    }
    .ant-calendar-picker-input {
      cursor: pointer;
      padding-left: 0;
      padding-right: 0;
      &:focus {
        box-shadow: none;
      }
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
