<template>
  <div class="gb-ant-select-range-picker">
    <a-range-picker
      v-bind="$attrs"
      :format="format"
      :style="pickerStyle"
      :value="defaultValue"
      :placeholder="placeholder"
      :getCalendarContainer="triggerNode => triggerNode.parentNode"
      @change="handleChange"
    >
    </a-range-picker>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "gbAntSelectRangePicker",
  props: {
    pickerStyle: {
      type: Object
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    placeholder: {
      type: Array
    }
  },
  data() {
    const defaultValue = [];
    this.value.forEach(item => {
      defaultValue.push(moment(item, this.format));
    });
    return {
      defaultValue: defaultValue
    };
  },
  watch: {
    value(newVal) {
      if (!newVal[0]) {
        this.defaultValue = null;
      } else {
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
.gb-ant-select-range-picker {
  .ant-calendar-picker-input {
    padding-left: 0;
  }
}
</style>
