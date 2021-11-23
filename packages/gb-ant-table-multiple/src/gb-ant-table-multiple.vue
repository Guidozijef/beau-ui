<template>
  <div class="gb-ant-table-multiple">
    <a-table
      v-bind="$attrs"
      :rowSelection="rowSelection"
      :pagination="false"
      @change="handleTableChange"
    >
      <template slot="formatText" slot-scope="text, record, index">
        <span :title="text">{{ textEllipsis(text, record, index) }}</span>
      </template>
      <template
        v-for="item in $attrs.columns"
        :slot="
          item.scopedSlots &&
          item.scopedSlots.customRender &&
          item.scopedSlots.customRender !== formatText
            ? item.scopedSlots.customRender
            : ''
        "
        slot-scope="text, record, index"
      >
        <slot
          :name="
            item.scopedSlots &&
            item.scopedSlots.customRender &&
            item.scopedSlots.customRender !== formatText
              ? item.scopedSlots.customRender
              : ''
          "
          v-bind="{ text, record, index }"
        ></slot>
      </template>
    </a-table>
    <div
      v-if="
        (paginationData.total > 0 &&
          paginationData.total > paginationData.defaultPageSize) ||
          (paginationData.total > 0 && showPagination)
      "
      class="gb-ant-table-multiple-pagination-wrap"
      :class="{
        'gb-ant-table-multiple-pagination-wrap-right':
          paginationData.total > 0 &&
          paginationData.total <= paginationData.defaultPageSize
      }"
    >
      <a-checkbox
        v-if="
          paginationData.total > 0 &&
            paginationData.total > paginationData.defaultPageSize
        "
        v-model="checkedAll"
        :indeterminate="checkedAllIndeterminate"
        @change="handleSelectAll"
      >
        <span class="gb-ant-table-multiple-select-all-text"
          >全选</span
        ></a-checkbox
      >

      <gb-ant-pagination
        v-if="paginationData.total > 0 && showPagination"
        :style="paginationWrapStyle"
        v-bind="paginationData"
        :selectedItems="selectedRowKeys.length"
        :showSizeChanger="paginationShowSizeChanger"
        :showQuickJumper="paginationShowQuickJumper"
        @paginationChange="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script>
import gbAntPagination from "../../gb-ant-pagination/src/gb-ant-pagination";
import { cloneDeep } from "lodash";
export default {
  name: "gbAntTableMultiple",
  props: {
    // 查询完之后时候清空全选数据
    afterFilterNeedClearn: {
      type: Boolean,
      default: true
    },
    paginationData: {
      type: Object,
      default: () => {
        return {
          total: 0,
          current: 1,
          defaultPageSize: 20
        };
      }
    },
    paginationWrapStyle: {
      type: Object
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    paginationShowSizeChanger: {
      type: Boolean,
      default: true
    },
    paginationShowQuickJumper: {
      type: Boolean,
      default: true
    },
    defaultRowKey: {
      type: String,
      default: "id"
    },
    defaultTableSelectedRows: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultTableSelectedRowsKeys: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 当前全部的数据
    currentAllTableList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    // 找到需要格式化字符串的列名称
    const keys = [];
    if (this.$attrs && this.$attrs.columns) {
      this.$attrs.columns.forEach(item => {
        if (item.maxLength && item.maxLength > 0) {
          keys.push({
            key: item.dataIndex || item.key,
            maxLength: item.maxLength
          });
        }
      });
    }
    return {
      checkedAllIndeterminate: false,
      checkedAll: false,
      formatText: "formatText",
      ellipsisKeys: keys,
      selectedRowKeys: this.defaultTableSelectedRowsKeys,
      selectedRows: cloneDeep(this.defaultTableSelectedRows)
    };
  },
  watch: {
    selectedRowKeys: {
      handler(newVal) {
        if (
          newVal.length !== 0 &&
          newVal.length !== this.paginationData.total
        ) {
          this.checkedAllIndeterminate = true;
        } else {
          this.checkedAllIndeterminate = false;
        }
        if (newVal.length > 0 && newVal.length === this.paginationData.total) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      }
    },
    currentAllTableList(newVal) {
      if (this.afterFilterNeedClearn) {
        this.selectedRowKeys = [];
        return false;
      }
      // 如果查询数据从更多变成更少，并且选中的数据大于查询的最大数据，则需要处理当前选中的数据,多余的需要删除
      const selectedRowKeysClone = cloneDeep(this.selectedRowKeys);
      this.selectedRowKeys.forEach(key => {
        // 当前选中的key值，在新的查询列表中不存在的话，则删除
        if (newVal.every(item => item[this.defaultRowKey] !== key)) {
          const index = selectedRowKeysClone.findIndex(
            indexKey => indexKey === key
          );
          selectedRowKeysClone.splice(index, 1);
        }
      });
      this.selectedRowKeys = selectedRowKeysClone;
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        // 复选框的列的宽度
        // columnWidth: 50,
        onChange: this.handleTabelCheckboxChange,
        getCheckboxProps: record => {
          return {
            props: {
              disabled: !!record.disabled
            }
          };
        }
      };
    }
  },
  components: {
    gbAntPagination
  },
  methods: {
    textLength(text, maxLength) {
      if (text) {
        return text && text.length > maxLength
          ? text.slice(0, maxLength) + "..."
          : text;
      } else {
        return "-";
      }
    },
    textEllipsis(text, record) {
      let textStr = text;
      if (this.ellipsisKeys && this.ellipsisKeys.length > 0) {
        this.ellipsisKeys.forEach(item => {
          if (textStr === record[item.key]) {
            textStr = this.textLength(record[item.key], item.maxLength);
          }
        });
      }
      return textStr;
    },
    handleTableChange(pagination, filters, sorter, data) {
      this.$emit("change", pagination, filters, sorter, data);
    },
    handlePaginationChange(currentPage, pageSize, noRefresh) {
      this.$emit("handleTableRefresh", currentPage, pageSize, noRefresh);
    },
    handleSelectAll(e) {
      const checked = e.target.checked;
      const selectedRowKeys = [];
      const selectedRows = [];
      if (checked) {
        this.currentAllTableList.forEach(item => {
          selectedRowKeys.push(item[this.defaultRowKey]);
          selectedRows.push(item);
        });
      }
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
      this.$emit("handleTableChecked", selectedRowKeys, selectedRows);
    },
    handleTabelCheckboxChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      const selectedRowsClone = cloneDeep(this.selectedRows);
      selectedRows.forEach(item => {
        if (
          selectedRowsClone.every(
            cloneItem =>
              cloneItem[this.defaultRowKey] !== item[this.defaultRowKey]
          )
        ) {
          selectedRowsClone.push(item);
        }
      });
      const newSelectedRows = cloneDeep(selectedRowsClone);
      newSelectedRows.forEach(rowsItem => {
        // 当前选中的keys中不存在这一项，则删除
        if (!selectedRowKeys.includes(rowsItem[this.defaultRowKey])) {
          const index = selectedRowsClone.findIndex(
            indexItem =>
              indexItem[this.defaultRowKey] === rowsItem[this.defaultRowKey]
          );
          selectedRowsClone.splice(index, 1);
        }
      });
      this.selectedRows = selectedRowsClone;
      this.$emit("handleTableChecked", selectedRowKeys, selectedRowsClone);
    }
  }
};
</script>
<style lang="less">
.gb-ant-table-multiple {
  .ant-table {
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
  }
  table {
    border-radius: 0;
  }
  .ant-table-thead {
    > tr {
      > th {
        line-height: 40px;
        padding: 0 10px;
        color: #666;
        position: relative;
        &:last-child {
          &:after {
            width: 0;
          }
        }
        &:after {
          content: "";
          display: inline-block;
          background-color: #ededed;
          width: 1px;
          height: 12px;
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
  .ant-table-tbody {
    > tr {
      > td {
        line-height: 40px;
        padding: 0 10px;
        color: #666;
      }
    }
  }
  .gb-ant-table-multiple-pagination-wrap {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &.gb-ant-table-multiple-pagination-wrap-right {
      justify-content: flex-end;
    }
  }
  .gb-ant-table-multiple-select-all-text {
    font-size: 12px;
    color: #424656;
  }
}
</style>
