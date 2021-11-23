<template>
  <div class="gb-ant-select-pagination-multiple">
    <a-select
      :placeholder="placeholder"
      class="gb-ant-select"
      mode="multiple"
      :dropdownMatchSelectWidth="false"
      :filterOption="false"
      optionLabelProp="text"
      :value="inputValueArr"
      :maxTagTextLength="maxTagTextLength"
      :maxTagCount="maxTagCount"
      :getPopupContainer="tirggerNode => tirggerNode.parentNode"
      :notFoundContent="fetching ? undefined : noDataText"
      :allowClear="allowClear"
      :dropdownStyle="dropdownStyle"
      @search="val => hanldeDebounceGetData(val)"
      @change="val => handleDataChange(val)"
      @popupScroll="handleScroll"
      @dropdownVisibleChange="handleDropdownVisibleChange"
    >
      <a-spin v-if="fetching" size="small" slot="notFoundContent" />
      <a-select-option
        v-for="optionItem in dataList"
        :disabled="optionItem[selectOptionsConfig['value']].toString() === '-1'"
        :key="optionItem[selectOptionsConfig['key']]"
        :value="optionItem[selectOptionsConfig['value']].toString()"
        :text="optionItem[selectOptionsConfig['text']]"
      >
        <span
          v-if="optionItem[selectOptionsConfig['value']].toString() !== '-1'"
        >
          <span
            class="select-option-text"
            :class="{ [item.className]: item.className }"
            v-for="(item, index) in selectOptionsShowContent"
            :key="index"
          >
            {{ optionItem[item.key] }}
          </span>
        </span>
        <span v-else>
          <a-spin size="small"></a-spin>
        </span>
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { cloneDeep, debounce } from "lodash";
export default {
  name: "gbAntSelectPaginationMultiple",
  props: {
    defaultDataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    apiFn: {
      type: Function
    },
    // 请求的通用数据
    apiCommonSearchData: {
      type: Object,
      default: () => {
        return {
          page: 1,
          pageSize: 20
        };
      }
    },
    apiInputConditionName: {
      type: String,
      default: "key"
    },
    selectOptionsConfig: {
      type: Object,
      default: () => {
        return {
          key: "id",
          value: "value",
          text: "title"
        };
      }
    },
    // 下拉框的自定义显示字段和样式名称
    selectOptionsShowContent: {
      type: Array,
      default: () => {
        return [{ key: "name", className: "" }];
      }
    },
    placeholder: {
      type: String,
      default: "请搜索"
    },
    dropdownStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    debounceTime: {
      type: Number,
      default: 1500
    },
    paginationKeys: {
      type: Object,
      default: () => {
        return {
          page: "page",
          pageSize: "pageSize",
          totalPage: "totalPage",
          list: "list"
        };
      }
    },
    maxTagCount: {
      type: Number
    },
    maxTagTextLength: {
      type: Number
    },
    scrollTriggerHeight: {
      type: Number,
      default: 100
    },
    initDataList: {
      type: Array
    }
  },
  data() {
    this.hanldeDebounceGetData = debounce(
      this.hanldeDebounceGetData,
      this.debounceTime
    );
    this.lastScrollTop = 0;
    return {
      inputVal: "",
      lastFetchId: 0,
      fetching: false,
      inputValueArr: undefined,
      dataList: [],
      isLoading: false,
      isLoaded: false,
      pagination: {
        ...this.apiCommonSearchData,
        [this.paginationKeys.page]:
          this.apiCommonSearchData[this.paginationKeys.page] || 1,
        [this.paginationKeys.pageSize]:
          this.apiCommonSearchData[this.paginationKeys.pageSize] || 20
      }
    };
  },
  computed: {
    newList() {
      return {
        initDataList: this.initDataList,
        defaultDataList: this.defaultDataList
      };
    }
  },
  watch: {
    apiCommonSearchData(newVal) {
      this.pagination = {
        ...newVal,
        [this.paginationKeys.page]: newVal[this.paginationKeys.page] || 1,
        [this.paginationKeys.pageSize]:
          newVal[this.paginationKeys.pageSize] || 20
      };
    },
    newList(newVal) {
      let { initDataList, defaultDataList } = newVal;
      if (initDataList && initDataList.length > 0) {
        const defaultDataListClone = cloneDeep(defaultDataList);
        initDataList.forEach(item => {
          if (
            defaultDataList &&
            defaultDataList.every(
              defaultItem =>
                defaultItem[this.selectOptionsConfig.value] !==
                item[this.selectOptionsConfig.value]
            )
          ) {
            defaultDataListClone.unshift(item);
          }
        });
        this.dataList = defaultDataListClone;
        this.$nextTick(() => {
          let inputValueArr = [];
          initDataList.forEach(item => {
            inputValueArr.push(item[this.selectOptionsConfig.value].toString());
          });
          this.inputValueArr = inputValueArr;
          // 设置值
          this.$emit("change", this.inputValueArr);
        });
      } else {
        this.dataList = defaultDataList;
      }
    }
  },
  methods: {
    async hanldeDebounceGetData(val) {
      await this.hanldeGetData(val, true);
    },
    async hanldeGetData(val, isInit) {
      if (!this.apiFn) {
        return false;
      }
      if (isInit) {
        this.pagination[this.paginationKeys.page] = 1;
        this.dataList = [];
      }
      this.$nextTick(async () => {
        this.inputVal = val;
        this.fetching = true;
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        try {
          const res = await this.apiFn({
            ...this.pagination,
            [this.apiInputConditionName]: val
          });
          if (fetchId !== this.lastFetchId) {
            return;
          }
          // 删除加载中的数据
          let dataListClone = cloneDeep(this.dataList);
          const loadingItemIndex = dataListClone.findIndex(
            item => item[this.selectOptionsConfig["value"]].toString() === "-1"
          );
          if (loadingItemIndex !== -1) {
            dataListClone.splice(loadingItemIndex, 1);
          }
          if (
            this.pagination[this.paginationKeys.page] >=
            res[this.paginationKeys.totalPage]
          ) {
            this.isLoaded = true;
          } else {
            this.isLoaded = false;
          }
          let newArr = res[this.paginationKeys.list];
          // 如果下拉框的数据包含初始化的数据，那么之前的数据应该删除添加的
          if (this.initDataList && this.initDataList.length > 0) {
            this.initDataList.forEach(initItem => {
              if (
                newArr.some(
                  item =>
                    item[this.selectOptionsConfig.value] ===
                    initItem[this.selectOptionsConfig.value]
                )
              ) {
                const currentIndex = dataListClone.findIndex(
                  cloneItem =>
                    cloneItem[this.selectOptionsConfig.value] ===
                    initItem[this.selectOptionsConfig.value]
                );
                dataListClone.splice(currentIndex, 1);
              }
            });
          }
          this.dataList = dataListClone.concat(newArr);
          this.fetching = false;
        } catch (error) {
          // 删除数据
          const dataListClone = cloneDeep(this.dataList);
          const loadingItemIndex = dataListClone.findIndex(
            item => item[this.selectOptionsConfig["value"]].toString() === "-1"
          );
          if (loadingItemIndex !== -1) {
            dataListClone.splice(loadingItemIndex, 1);
          }
          this.dataList = dataListClone;
          this.fetching = false;
        }
      });
    },
    async handleDataChange(valArr) {
      const currentSelectedItemArr = [];
      valArr.forEach(item => {
        const currentItem = this.dataList.find(
          dataItem =>
            dataItem[this.selectOptionsConfig["value"]].toString() === item
        );
        if (currentItem) {
          currentSelectedItemArr.push(currentItem);
        }
      });
      const inputValArr = [];
      currentSelectedItemArr.forEach(item => {
        if (item && item[this.selectOptionsConfig["value"]]) {
          inputValArr.push(item[this.selectOptionsConfig["value"]].toString());
        }
      });
      this.inputValueArr = inputValArr;
      this.$emit("handleChangeSelected", currentSelectedItemArr);
      this.$emit("change", this.inputValueArr);
    },
    handleScroll(e) {
      if (this.isLoading || this.isLoaded) {
        return false;
      }
      const ele = e.srcElement;
      const currentScrollTop = ele.scrollTop;
      const delta = currentScrollTop - this.lastScrollTop;
      this.lastScrollTop = currentScrollTop;
      if (delta > 0) {
        // 向下滚动
        if (
          ele.scrollHeight - ele.scrollTop - ele.offsetHeight <
          this.scrollTriggerHeight
        ) {
          this.isLoaded = true;
          let loadingItem = {
            [this.selectOptionsConfig["text"]]: "-1"
          };
          if (
            this.selectOptionsConfig["key"].toString() !==
            this.selectOptionsConfig["value"].toString()
          ) {
            loadingItem[this.selectOptionsConfig["key"]] = "-1";
            loadingItem[this.selectOptionsConfig["value"]] = "-1";
          } else {
            loadingItem[this.selectOptionsConfig["key"]] = "-1";
          }
          const dataListClone = Array.from(this.dataList);
          const paginationClone = Object.assign({}, this.pagination);
          paginationClone[this.paginationKeys.page] += 1;
          dataListClone.push(loadingItem);
          this.pagination = paginationClone;
          this.dataList = dataListClone;
          this.$nextTick(() => {
            this.hanldeGetData(this.inputVal);
          });
        }
      } else {
        // 向上
        return false;
      }
    },
    handleDropdownVisibleChange(open) {
      if (!open) {
        const dataListClone = Array.from(this.dataList);
        const loadingItemIndex = dataListClone.findIndex(
          item => item[this.selectOptionsConfig["value"]].toString() === "-1"
        );
        if (loadingItemIndex !== -1) {
          dataListClone.splice(loadingItemIndex, 1);
        }
        this.isLoading = false;
        this.dataList = dataListClone;
      }
    }
  }
};
</script>
<style lang="less">
.gb-ant-select-pagination-multiple {
  .ant-select-dropdown-menu-item {
    text-align: left;
  }
  .icon-search {
    svg {
      transition: none !important;
      transform: none !important;
    }
  }
  .gb-ant-select {
    width: 100%;
  }
  .select-option-text {
    padding-right: 10px;
    color: #bfbfbf;
    &:last-child {
      padding-right: 0;
    }
    &.primary-text {
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
