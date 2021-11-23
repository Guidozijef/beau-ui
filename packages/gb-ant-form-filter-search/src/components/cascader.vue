<template>
  <div class="filter-sub-cascader" :class="{ 'hide-afterline': hideAfterLine }">
    <div class="filter-sub-cascader-item-wrap">
      <span v-show="value && value.length > 0" class="label-text-wrap">
        <span class="label-text-visible-hidden">{{ placeholder }}</span>
        <span class="label-text">{{ placeholder }}</span>
      </span>
      <a-cascader
        class="filter-sub-cascader-item"
        :class="{
          'auto-width': value && value.length > 0,
          [`filter-sub-cascader-${id}`]: id
        }"
        :getPopupContainer="triggerNode => triggerNode.parentNode"
        :notFoundContent="noDataText"
        :placeholder="placeholder"
        :style="cascaderStyle"
        :allowClear="allowClear"
        :fieldNames="cascaderOptionsConfig"
        :options="dataList"
        :value="value"
        @change="handleChange"
      >
        <a-icon
          slot="suffixIcon"
          type="down"
          @click="handleClick"
          class="icon-down"
        ></a-icon>
        <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
          <!--只选择最后一级，如果最后一级为不限，则选中前面一级-->
          <span class="label-last-text" v-if="onlyShowLastLabel">
            <span v-for="(item, index) in selectedOptions" :key="index">
              <span
                v-if="
                  index === selectedOptions.length - 1 &&
                    selectedOptions[index][cascaderOptionsConfig.value].indexOf(
                      noLimitCodeTag
                    ) === -1
                "
                class="show-text"
                :title="labels[labels.length - 1]"
              >
                {{ labels[labels.length - 1] | textLength(limitTextLength) }}
              </span>
              <span
                v-else-if="
                  index === selectedOptions.length - 1 &&
                    selectedOptions[index][cascaderOptionsConfig.value].indexOf(
                      noLimitCodeTag
                    ) !== -1
                "
                class="show-text"
                :title="labels[labels.length - 2]"
              >
                {{ labels[labels.length - 2] | textLength(limitTextLength) }}
              </span>
            </span>
          </span>
          <span v-else class="label-last-text">
            <span v-for="(item, index) in selectedOptions" :key="index">
              <span
                v-if="
                  index === selectedOptions.length - 1 &&
                    selectedOptions[index][cascaderOptionsConfig.value].indexOf(
                      noLimitCodeTag
                    ) === -1
                "
                class="show-text"
                :title="labels.join(labelSplit)"
              >
                {{ labels.join(labelSplit) }}
              </span>
              <span
                v-else-if="
                  index === selectedOptions.length - 1 &&
                    selectedOptions[index][cascaderOptionsConfig.value].indexOf(
                      noLimitCodeTag
                    ) !== -1
                "
                class="show-text"
                :title="
                  Array.from(labels)
                    .splice(0, labels.length - 1)
                    .join(labelSplit)
                "
              >
                {{
                  Array.from(labels)
                    .splice(0, labels.length - 1)
                    .join(labelSplit)
                }}
              </span>
            </span>
          </span>
        </template>
      </a-cascader>
    </div>
  </div>
</template>
<script>
let timer;
export default {
  props: {
    id: {
      type: String,
      default: "1"
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    cascaderOptionsConfig: {
      type: Object,
      default: () => {
        return {
          label: "label",
          value: "value",
          children: "children"
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
    cascaderStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    },
    // 最后一级'不限'对应的码值标记
    noLimitCodeTag: {
      type: String,
      default: "ALL"
    },
    labelSplit: {
      type: String,
      default: "/"
    },
    limitTextLength: {
      type: Number,
      default: 5
    },
    onlyShowLastLabel: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Array]
    }
  },
  filters: {
    textLength(text, length) {
      if (text) {
        return text && text.length > length
          ? text.slice(0, length) + "..."
          : text;
      }
      return "-";
    }
  },
  destroyed() {
    timer && clearInterval(timer);
    timer = null;
  },
  watch: {
    value() {
      const element = document.querySelector(`.filter-sub-cascader-${this.id}`);
      const inputElem = element.querySelector(".ant-input");
      let labelElem;
      if (!timer) {
        timer = setInterval(() => {
          try {
            labelElem = element.querySelector(".show-text");
            if (labelElem) {
              clearInterval(timer);
              timer = null;
            }
            const width = labelElem.offsetWidth;
            inputElem.style.width = `${width + 20}px`;
          } catch (err) {
            clearInterval(timer);
            timer = null;
          }
        }, 50);
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit("change", val);
    },
    handleClick() {
      // this.$refs[this.refSelectName].$refs.vcSelect.$el.click();
    }
  }
};
</script>
<style lang="less">
.filter-sub-cascader {
  position: relative;
  padding-left: 14px;
  padding-right: 14px;
  .ant-cascader-input {
    border: none !important;
    box-shadow: none !important;
    padding: 0;
  }
  .ant-cascader-picker-label {
    padding: 0;
    margin-top: -9px;
  }
  .ant-cascader-picker-clear {
    width: 16px;
    height: 16px;
    right: 0;
    margin-top: -6px;
  }
  .filter-sub-cascader-item-wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 32px;
    .label-last-text {
      line-height: 20px;
    }
    .label-text-wrap {
      position: relative;
      line-height: 32px;
      .label-text-visible-hidden {
        visibility: hidden;
      }
      .label-text,
      .label-text-visible-hidden {
        white-space: nowrap;
        color: #bfbfbf;
        display: inline-block;
        line-height: 20px;
        padding-right: 8px;
      }
      .label-text {
        position: absolute;
        top: 50%;
        margin-top: -9px;
        z-index: 1;
        left: 0;
      }
    }
  }
  .filter-sub-cascader-item {
    &.ant-cascader-picker-focused {
      transition: transform 0.3s;
      .icon-down {
        transform: rotate(180deg);
      }
    }
    &.auto-width {
      width: auto !important;
    }
    .icon-down {
      width: 14px;
      height: 14px;
      margin-top: -6px;
      right: 0;
      color: #bfbfbf;
      svg {
        width: 14px;
        height: 14px;
      }
    }
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
