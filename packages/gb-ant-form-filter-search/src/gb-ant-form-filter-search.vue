<template>
  <div class="gb-ant-form-filter-search">
    <a-form :ref="refFormName" :form="filterForm">
      <div class="gb-ant-form-filter-search-wrap">
        <div class="gb-ant-form-filter-search-wrap-left">
          <div
            v-for="(item, index) in selectArr"
            :key="index"
            class="gb-ant-form-filter-item-wrap"
          >
            <a-form-item>
              <a-input
                v-if="item.type === 'input'"
                v-decorator="[
                  item.formData.decorator,
                  {
                    initialValue: item.formData.initialValue
                  }
                ]"
                :style="item.style"
                :placeholder="item.placeholder"
                :allowClear="item.allowClear"
                :maxLength="item.maxLength"
                :type="item.inputType"
              />
              <single-select
                v-if="item.type === 'singleSelect'"
                v-decorator="[
                  item.formData.decorator,
                  {
                    initialValue: item.formData.initialValue
                  }
                ]"
                :hideAfterLine="item.hideAfterLine"
                :placeholder="item.placeholder"
                :dataList="item.dataList"
                :selectOptionsConfig="item.selectOptionsConfig"
                :selectedStyle="item.selectedStyle"
                :allowClear="item.allowClear"
                :mode="item.mode"
                :className="item.className"
                :maxTagCount="item.maxTagCount"
                :maxTagTextLength="item.maxTagTextLength"
              />
              <multiple-cascader
                v-if="item.type === 'multipleCascader'"
                v-decorator="[
                  item.formData.decorator,
                  {
                    initialValue: item.formData.initialValue
                  }
                ]"
                :hideAfterLine="item.hideAfterLine"
                :maxTagCount="item.maxTagCount"
                :maxTagTextLength="item.maxTagTextLength"
                :placeholder="item.placeholder"
                :treeData="item.dataList"
                :selectOptionsConfig="item.selectOptionsConfig"
                :selectedStyle="item.selectedStyle"
                :checkAll="item.checkAll"
                :dropdownClassName="item.dropdownClassName"
                :allowClear="item.allowClear"
                :noDataText="item.noDataText"
              ></multiple-cascader>
              <range-picker
                v-if="item.type === 'rangePicker'"
                v-decorator="[
                  item.formData.decorator,
                  {
                    initialValue: item.formData.initialValue
                  }
                ]"
                :hideAfterLine="item.hideAfterLine"
                :placeholder="item.placeholder"
                :selectedStyle="item.selectedStyle"
                :defaultWidth="item.defaultWidth"
                :allowClear="item.allowClear"
                :labelText="item.labelText"
                :border="!!item.border"
              ></range-picker>
              <date-picker
                v-if="item.type === 'datePicker'"
                v-decorator="[
                  item.formData.decorator,
                  {
                    initialValue: item.formData.initialValue
                  }
                ]"
                :hideAfterLine="item.hideAfterLine"
                :placeholder="item.placeholder"
                :defaultWidth="item.defaultWidth"
                :selectedStyle="item.selectedStyle"
                :allowClear="item.allowClear"
              ></date-picker>
              <cascader
                v-if="item.type === 'singleCascader'"
                :id="index.toString()"
                :key="index"
                v-decorator="[
                  item.formData.decorator,
                  {
                    initialValue: item.formData.initialValue
                  }
                ]"
                :onlyShowLastLabel="item.onlyShowLastLabel"
                :limitTextLength="item.limitTextLength"
                :noLimitCodeTag="item.noLimitCodeTag"
                :noDataText="item.noDataText"
                :labelSplit="item.labelSplit"
                :cascaderStyle="item.cascaderStyle"
                :hideAfterLine="item.hideAfterLine"
                :placeholder="item.placeholder"
                :dataList="item.dataList"
                :cascaderOptionsConfig="item.cascaderOptionsConfig"
                :allowClear="item.allowClear"
              ></cascader>
            </a-form-item>
          </div>
          <a-button
            type="primary"
            style="margin-left:20px"
            @click="handleFilterSearch"
            >{{ searchBtnText }}</a-button
          >
          <div v-if="hasAdvanceQuery" class="gb-ant-form-advance-fitler-wrap">
            <span
              class="advance-fitler-query-text"
              @click="handleAdvanceQuery"
              >{{ advanceQueryText }}</span
            >
            <span
              v-if="advanceQueryCount > 0"
              class="advance-fitler-query-count"
              >{{ advanceQueryCount }}</span
            >
            <span
              v-if="advanceQueryCount > 0"
              class="advance-fitler-query-clear-text"
              @click="handleAdvanceClear"
              >{{ advanceQueryClearText }}</span
            >
          </div>
          <div
            class="gb-ant-form-filter-search-wrap-right"
            v-if="hasInputSearch"
          >
            <a-form-item>
              <gb-ant-input-enter-search
                v-decorator="[inputConfig.key]"
                :placeholder="inputConfig.placeholder"
                :style="inputConfig.style"
                @pressEnter="handleInputPressEnter"
              />
            </a-form-item>
          </div>
        </div>
        <a-drawer
          v-show="showAdvanceDrawer"
          placement="top"
          :closable="false"
          :visible="showAdvanceDrawer"
          height="230"
          :getContainer="getAdvanceContainer"
          :wrapStyle="{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            width: 'auto'
          }"
          :maskStyle="{
            background: 'transparent',
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }"
          @close="handleAdvanceQueryClose"
        >
          <slot name="advance"></slot>
        </a-drawer>
      </div>
    </a-form>
  </div>
</template>

<script>
import singleSelect from "./components/singleSelect";
import rangePicker from "./components/rangePicker";
import datePicker from "./components/datePicker";
import cascader from "./components/cascader";
import multipleCascader from "./components/multipleCascader";
import gbAntInputEnterSearch from "./../../gb-ant-input-enter-search/src/gb-ant-input-enter-search";
export default {
  name: "gbAntFormFilterSearch",
  components: {
    cascader,
    multipleCascader,
    singleSelect,
    rangePicker,
    datePicker,
    gbAntInputEnterSearch
  },
  props: {
    refFormName: {
      type: String
    },
    searchBtnText: {
      type: String,
      default: "查询"
    },
    selectArr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    hasInputSearch: {
      type: Boolean,
      default: true
    },
    inputConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否存在高级查询
    hasAdvanceQuery: {
      type: Boolean,
      default: false
    },
    advanceQueryText: {
      type: String,
      default: "高级查询"
    },
    advanceQueryClearText: {
      type: String,
      default: "清空"
    },
    advanceQueryCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      filterForm: this.$form.createForm(this, { name: "filterForm" }),
      showAdvanceDrawer: false
    };
  },
  methods: {
    handleFilterSearch() {
      const {
        filterForm: { validateFields }
      } = this;
      validateFields((errors, values) => {
        this.$emit("handleSearch", values);
      });
    },
    handleAdvanceQuery() {
      this.showAdvanceDrawer = true;
    },
    handleAdvanceQueryClose() {
      this.showAdvanceDrawer = false;
      this.$emit("handleAdvanceClose");
    },
    handleAdvanceClear() {
      this.$emit("handleAdvanceClear");
    },
    getAdvanceContainer() {
      return document.getElementsByClassName("gb-ant-form-filter-search")[0];
    },
    handleInputPressEnter() {
      this.handleFilterSearch();
    }
  }
};
</script>
<style lang="less">
.gb-ant-form-filter-search {
  position: relative;
  .ant-form-item {
    margin-bottom: 0 !important;
  }
  .ant-select-selection {
    .ant-select-selection__clear {
      opacity: 1;
    }
  }
  .ant-cascader-picker {
    .ant-cascader-picker-clear {
      opacity: 1;
    }
  }
  .ant-calendar-picker {
    .ant-calendar-picker-clear {
      opacity: 1;
    }
  }
  .gb-ant-form-filter-search-wrap {
    min-height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .gb-ant-form-filter-search-wrap-left {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      .gb-ant-form-advance-fitler-wrap {
        margin-left: 20px;
        cursor: pointer;
        .advance-fitler-query-text {
          color: #424656;
        }
        .advance-fitler-query-clear-text {
          color: #1890ff;
          margin-left: 4px;
        }
        .advance-fitler-query-count {
          margin-left: 4px;
          display: inline-block;
          width: 16px;
          height: 16px;
          background-color: #eaecf1;
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          font-size: 12px;
          color: #7d8292;
        }
      }
      .gb-ant-form-filter-search-wrap-right {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>
