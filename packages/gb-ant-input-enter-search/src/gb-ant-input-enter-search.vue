<template>
  <div class="gb-ant-input-enter-search">
    <a-input
      v-model="valueStr"
      v-bind="$attrs"
      @change="handleChange"
      @pressEnter="handlePressEnter"
    >
      <a-icon
        slot="prefix"
        type="search"
        class="gb-ant-input-enter-search-icon"
        @click="handleSearch"
      ></a-icon>
      <a-icon
        v-show="showClear"
        slot="suffix"
        theme="filled"
        type="close-circle"
        class="gb-ant-input-enter-close-icon"
        @click="handleClear"
      ></a-icon>
    </a-input>
  </div>
</template>

<script>
export default {
  name: "gbAntInputEnterSearch",
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      showClear: !!this.value,
      valueStr: this.value
    };
  },
  methods: {
    handleChange(e) {
      if (e.target.value) {
        this.showClear = true;
      } else {
        this.showClear = false;
      }
      this.valueStr = e.target.value;
      this.$emit("change", e.target.value);
    },
    handleSearch() {
      this.$emit("pressEnter", this.valueStr);
    },
    handlePressEnter(e) {
      this.$emit("pressEnter", e.target.value);
    },
    handleClear() {
      this.showClear = false;
      this.valueStr = "";
      this.$emit("change", this.valueStr);
    }
  }
};
</script>
<style lang="less">
.gb-ant-input-enter-search {
  .gb-ant-input-enter-close-icon {
    color: rgba(0, 0, 0, 0.25);
  }
  .gb-ant-input-enter-search-icon {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
