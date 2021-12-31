<template>
  <div>
    <s-overflow>
      <a-select
        v-model="value"
        class="self-select"
        :mode="'multiple'"
        ref="self-select"
        style="width: 100%"
        @change="handleChange"
        :labelInValue="false"
        placeholder="select one country"
      >
        <a-select-option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </s-overflow>
  </div>
</template>

<script>
import sOverflow from '../s-overflow'
export default {
  name: "select_self",
  components: { sOverflow },
  data() {
    return {
      value: undefined,
      options: [
        { label: "2323", value: "2323" },
        { label: "45465", value: "344" },
        { label: "2323", value: "45" },
        { label: "2323", value: "452" },
        { label: "34", value: "34" },
        { label: "454656", value: "231123" }
      ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
};
</script>
<style>
 .ant-select-selection--multiple .ant-select-selection__rendered {
      overflow: hidden;
    }
    .ant-select-selection--multiple .ant-select-selection__rendered ul {
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      float: left;
    }
    .ant-select-selection--multiple .ant-select-selection__choice {
      float: none;
      overflow: visible;
    }
    .ant-select-selection--multiple .ant-select-search--inline {
      float: none;
      position: absolute;
    }
    .ant-select-selection--multiple {
      max-height: 32px;
      overflow: hidden;
    }
</style>
