<template>
  <div class="gb-ant-select-no-limit-cascader">
    <a-cascader
      class="gb-ant-select-no-limit-item"
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
      <a-icon slot="suffixIcon" type="down" class="icon-down"></a-icon>
      <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
        <!--只选择最后一级，如果最后一级为不限，则选中前面一级-->
        <span class="label-last-text" v-if="onlyShowLastLabel">
          <span v-for="(item, index) in selectedOptions" :key="index">
            <span
              v-if="
                index === selectedOptions.length - 1 &&
                  selectedOptions[index][cascaderOptionsConfig.value]
                    .toString()
                    .indexOf(noLimitCodeTag) === -1
              "
              class="show-text"
              :title="labels[labels.length - 1]"
            >
              {{ labels[labels.length - 1] | textLength(limitTextLength) }}
            </span>
            <span
              v-else-if="
                index === selectedOptions.length - 1 &&
                  selectedOptions[index][cascaderOptionsConfig.value]
                    .toString()
                    .indexOf(noLimitCodeTag) !== -1
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
                  selectedOptions[index][cascaderOptionsConfig.value]
                    .toString()
                    .indexOf(noLimitCodeTag) === -1
              "
              class="show-text"
              :title="labels.join(labelSplit)"
            >
              {{ labels.join(labelSplit) }}
            </span>
            <span
              v-else-if="
                index === selectedOptions.length - 1 &&
                  selectedOptions[index][cascaderOptionsConfig.value]
                    .toString()
                    .indexOf(noLimitCodeTag) !== -1
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
</template>
<script>
export default {
  name: "gbAntSelectNoLimitCascader",
  props: {
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
  methods: {
    handleChange(val) {
      this.$emit("change", val);
    }
  }
};
</script>
<style lang="less"></style>
