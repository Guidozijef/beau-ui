<template>
  <div
    class="gb-ant-select-two-cascader"
    :class="{ 'two-cascader-outside': !isClickOutSide }"
    v-clickoutside="handleDropdownOutside"
  >
    <a-select
      mode="multiple"
      :maxTagTextLength="maxTagTextLength"
      :maxTagCount="maxTagCount"
      style="width:100%"
      :allowClear="allowClear"
      :placeholder="placeholder"
      :value="selectedValueArr"
      :notFoundContent="null"
      :open="isOpen"
      showArrow
      :dropdownMatchSelectWidth="false"
      :getPopupContainer="tirggerNode => tirggerNode.parentNode"
      @focus="handleFocus"
      @deselect="handleDeselect"
    >
      <a-icon
        type="close-circle"
        slot="clearIcon"
        theme="filled"
        @click="handleClearAll"
      />
      <template slot="dropdownRender" slot-scope="menu">
        <v-nodes :vnodes="menu" />
        <div :class="dropdownClassName">
          <div class="cascader-not-content" v-if="treeData.length <= 0">
            <a-empty :image="simpleImage" :description="noDataText"></a-empty>
          </div>
          <div class="cascader-content-wrap" v-else>
            <div class="cascader-content-left">
              <div
                v-for="(treeFirstItem, index) in treeDataFirstList"
                :key="treeFirstItem[selectOptionsConfig['key']]"
                class="left-wrap"
                :class="{ 'is-active': firstTreeSelectedIndex === index }"
                @click="handleFirstTreeClick(index)"
              >
                <span
                  class="left-tree-text"
                  :title="treeFirstItem[selectOptionsConfig.text]"
                >
                  {{ treeFirstItem[selectOptionsConfig.text] }}
                </span>
                <a-icon class="left-tree-arrow" type="right"></a-icon>
              </div>
            </div>
            <div class="cascader-content-right">
              <div
                v-for="(treeSecondItem, index) in treeDataSecondList"
                :key="treeSecondItem[selectOptionsConfig.key]"
                class="right-wrap"
              >
                <a-checkbox
                  class="right-checkbox-wrap"
                  :checked="
                    selectedValueArr &&
                      selectedValueArr.includes(
                        treeSecondItem[selectOptionsConfig.value].toString()
                      )
                  "
                  @change="
                    e => handleCheckBoxChange(e, treeDataSecondList, index)
                  "
                >
                  <span
                    class="right-tree-text"
                    :title="treeSecondItem[selectOptionsConfig.text]"
                  >
                    {{ treeSecondItem[selectOptionsConfig.text] }}
                  </span>
                </a-checkbox>
              </div>
            </div>
          </div>
        </div>
      </template>
      <a-select-option
        v-for="item in treeDataAllSecondList"
        :key="item[selectOptionsConfig['key']]"
        :value="item[selectOptionsConfig['value']].toString()"
      >
        {{ item[selectOptionsConfig["text"]] }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { Empty } from "ant-design-vue";
const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
export default {
  name: "gbAntSelectTwoCascader",
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => {
        return ctx.props.vnodes;
      }
    }
  },
  directives: { clickoutside },
  props: {
    allowClear: {
      type: Boolean,
      default: true
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    },
    treeData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    dropdownClassName: {
      type: String
    },
    selectOptionsConfig: {
      type: Object,
      default: () => {
        return {
          key: "id",
          value: "value",
          text: "title",
          children: "children"
        };
      }
    },
    maxTagCount: {
      type: Number
    },
    maxTagTextLength: {
      type: Number
    },
    placeholder: {
      type: String,
      default: "请搜索"
    },
    selectedIndex: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  computed: {
    treeDataFirstList() {
      return this.treeData.filter(
        item =>
          item[this.selectOptionsConfig.children] &&
          item[this.selectOptionsConfig.children].length > 0
      );
    },
    treeDataSecondList() {
      const currentIndex = this.firstTreeSelectedIndex;
      return (
        this.treeData[currentIndex] && this.treeData[currentIndex].children
      );
    },
    treeDataAllSecondList() {
      const treeDataFirstList = this.treeData.filter(
        item =>
          item[this.selectOptionsConfig.children] &&
          item[this.selectOptionsConfig.children].length > 0
      );
      let allSecondTreeDataList = [];
      treeDataFirstList.forEach(item => {
        if (
          item[this.selectOptionsConfig.children] &&
          item[this.selectOptionsConfig.children].length > 0
        ) {
          allSecondTreeDataList = allSecondTreeDataList.concat(
            item[this.selectOptionsConfig.children]
          );
        }
      });
      return allSecondTreeDataList;
    }
  },
  data() {
    return {
      isOpen: false,
      isClickOutSide: true,
      firstTreeSelectedIndex: this.selectedIndex,
      selectedValueArr: this.value || undefined
    };
  },
  watch: {
    value(newVal) {
      this.selectedValueArr = newVal;
      return newVal;
    }
  },
  methods: {
    handleClearAll() {
      this.isOpen = false;
      this.isClickOutSide = true;
      this.selectedValueArr = undefined;
      this.firstTreeSelectedIndex = this.selectedIndex;
      this.$emit("change", this.selectedValueArr);
      this.handleSelectedRows(this.selectedValueArr);
    },
    handleCheckBoxChange(e, currentArr, currentIndex) {
      const checked = e.target.checked;
      const selectedValueArrClone = Array.from(this.selectedValueArr);
      const currentValue = currentArr[currentIndex][
        this.selectOptionsConfig.value
      ].toString();
      if (checked) {
        selectedValueArrClone.push(currentValue);
      } else {
        const index = selectedValueArrClone.findIndex(
          item => item === currentValue
        );
        if (index > -1) {
          selectedValueArrClone.splice(index, 1);
        }
      }
      this.selectedValueArr = selectedValueArrClone;
      this.$emit("change", this.selectedValueArr);
      this.handleSelectedRows(selectedValueArrClone);
    },
    handleFirstTreeClick(firstTreeIndex) {
      this.firstTreeSelectedIndex = firstTreeIndex;
    },
    handleFocus() {
      this.isOpen = true;
      this.isClickOutSide = false;
    },
    handleDeselect(value) {
      const selectedValueArrClone = Array.from(this.selectedValueArr);
      const index = selectedValueArrClone.findIndex(item => item === value);
      selectedValueArrClone.splice(index, 1);
      this.selectedValueArr = selectedValueArrClone;
      this.$emit("change", this.selectedValueArr);
      this.handleSelectedRows(selectedValueArrClone);
    },
    handleSelectedRows(selectedValueArr) {
      let selectedRows = [];
      if (selectedValueArr && selectedValueArr.length > 0) {
        selectedValueArr.forEach(key => {
          const currentRows = this.treeDataAllSecondList.find(
            item =>
              item[this.selectOptionsConfig.value].toString() === key.toString()
          );
          if (currentRows) {
            selectedRows.push(currentRows);
          }
        });
      } else {
        selectedRows = undefined;
      }
      this.$emit("handleCheckboxChange", selectedRows);
    },
    handleDropdownOutside() {
      this.isOpen = false;
      this.isClickOutSide = true;
    }
  }
};
</script>
<style lang="less">
.gb-ant-select-two-cascader {
  &.two-cascader-outside {
    .ant-select-arrow {
      transform: rotate(180deg);
    }
  }
  .ant-select-arrow {
    margin-top: -8px;
    transition: transform 0.3s;
  }
  .ant-select-dropdown-menu-root {
    display: none;
  }
  .cascader-content-right {
    .right-wrap {
      .ant-checkbox {
        top: 0;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.gb-ant-select-two-cascader {
  // 从组件props中传过来的类名
  .customer-multiple-cascader {
    height: 190px;
    min-width: 433px;
  }
  .cascader-content-wrap {
    display: flex;
    flex-direction: row;
    height: 100%;
    .cascader-content-left {
      height: 100%;
      overflow: auto;
      width: 150px;
      border-right: 1px solid rgba(222, 223, 226, 0.3);
      box-sizing: border-box;
      padding: 8px 0;
      .left-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 8px 14px;
        &.is-active {
          color: #1d47aa;
          .left-tree-arrow {
            color: #1d47aa;
          }
        }
        &:hover {
          color: #1d47aa;
          .left-tree-arrow {
            color: #1d47aa;
          }
        }
      }
      .left-tree-text {
        cursor: default;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        white-space: nowrap;
      }
      .left-tree-arrow {
        font-size: 10px;
        color: #7d8292;
        width: 16px;
      }
    }
  }
  .cascader-content-right {
    flex: 1;
    padding: 8px 0;
    height: 100%;
    overflow: auto;
    .right-wrap {
      padding: 8px 14px;
      .right-checkbox-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      &.is-active {
        color: #1d47aa;
      }
      &:hover {
        color: #1d47aa;
      }
      .right-tree-text {
        cursor: default;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .cascader-not-content {
    padding: 10px;
  }
}
</style>
