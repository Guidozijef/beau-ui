<template>
  <div
    class="filter-sub-single-select"
    :class="{ 'hide-afterline': hideAfterLine }"
  >
    <div
      class="filter-sub-single-select-item-wrap"
      :class="{ [className]: className ? className : '' }"
    >
      <span
        v-show="mode === 'default' ? value : value && value[0]"
        class="label-text"
        >{{ placeholder }}</span
      >
      <a-select
        :ref="refSelectName"
        class="filter-sub-single-select-item"
        :class="{
          'auto-width': mode === 'default' ? value : value && value[0]
        }"
        dropdownClassName="filter-sub-single-select-dropdown"
        :getPopupContainer="triggerNode => triggerNode.parentNode"
        :dropdownMatchSelectWidth="false"
        :notFoundContent="noDataText"
        :placeholder="placeholder"
        :style="selectedStyle"
        :allowClear="allowClear"
        :value="value"
        :mode="mode"
        :maxTagCount="maxTagCount"
        :maxTagTextLength="maxTagTextLength"
        @change="handleChange"
        @dropdownVisibleChange="handleDropdownVisibleChange"
      >
        <a-select-option
          v-for="item in dataList"
          :key="item[selectOptionsConfig.key]"
          :value="item[selectOptionsConfig.value]"
        >
          <span :title="item[selectOptionsConfig.label]">{{
            item[selectOptionsConfig.label]
          }}</span>
        </a-select-option>
      </a-select>
      <a-icon
        v-if="mode === 'multiple'"
        type="down"
        @click="handleClick"
        class="icon-down"
      ></a-icon>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    refSelectName: {
      type: String,
      default: "refSelect"
    },
    mode: {
      type: String,
      default: "default"
    },
    maxTagCount: {
      type: Number,
      default: 2
    },
    maxTagTextLength: {
      type: Number,
      default: 5
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    className: {
      type: String
    },
    selectedStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectOptionsConfig: {
      type: Object,
      default: () => {
        return {
          key: "id",
          value: "value",
          label: "label"
        };
      }
    },
    placeholder: {
      type: String,
      default: "请选择"
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
      type: [String, Array]
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    }
  },
  methods: {
    handleChange(val) {
      this.$emit("change", val);
    },
    handleDropdownVisibleChange(open) {
      if (this.mode === "multiple") {
        let iconDown = null;
        if (this.className) {
          iconDown = document
            .querySelector(`.${this.className}`)
            .querySelector(".icon-down");
        } else {
          iconDown = document
            .querySelector(".filter-sub-single-select-item-wrap")
            .querySelector(".icon-down");
        }
        if (iconDown && iconDown.style) {
          if (open) {
            iconDown.style.transform = "rotate(180deg)";
            iconDown.style.transition = "transform 0.3s";
          } else {
            iconDown.style.transform = "rotate(0)";
            iconDown.style.transition = "transform 0.3s";
          }
        }
      }
    },
    handleClick() {
      this.$refs[this.refSelectName].$refs.vcSelect.$el.click();
    }
  }
};
</script>
<style lang="less">
.filter-sub-single-select {
  position: relative;
  padding-left: 14px;
  padding-right: 14px;
  .filter-sub-single-select-item-wrap {
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
  }
  .filter-sub-single-select-dropdown {
    min-width: 150px !important;
    max-width: 300px;
  }
  .ant-select {
    line-height: 1;
    .ant-select-selection {
      border: none;
      box-shadow: none;
      height: 32px;
      .ant-select-selection__rendered {
        margin-left: 0;
        margin-right: 0;
        line-height: 32px;
        cursor: pointer;
        .ant-select-search__field {
          color: transparent;
        }
        .ant-select-selection__placeholder {
          right: 16px;
          margin-left: 0;
        }
      }
      .ant-select-arrow {
        right: 0;
        margin-top: -7px;
        .ant-select-arrow-icon {
          font-size: 14px;
          height: 14px;
        }
      }
      .ant-select-selection__clear {
        width: 16px;
        height: 16px;
        right: 0;
        margin-top: -7px;
      }
    }
    .ant-select-selection--multiple {
      .ant-select-selection__clear {
        right: -3px;
      }
    }
  }
  .filter-sub-single-select-item {
    &.auto-width {
      min-width: auto !important;
      .ant-select-selection__rendered {
        margin-right: 24px;
      }
      .ant-select-selection--multiple {
        .ant-select-selection__rendered {
          margin-right: 0;
        }
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
