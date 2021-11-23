<template>
  <div class="gb-ant-select-date-picker">
    <a-date-picker
      v-bind="$attrs"
      :format="format"
      :style="pickerStyle"
      :value="defaultValue"
      :placeholder="placeholder"
      :getCalendarContainer="triggerNode => triggerNode.parentNode"
      @change="handleChange"
    >
    </a-date-picker>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "gbAntSelectDatePicker",
  props: {
    pickerStyle: {
      type: Object
    },
    value: {
      type: String
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    placeholder: {
      type: String
    }
  },
  data() {
    const defaultValue = this.value
      ? moment(this.value, this.format)
      : undefined;
    return {
      defaultValue: defaultValue
    };
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.defaultValue = moment(newVal, this.format);
      } else {
        this.defaultValue = null;
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
