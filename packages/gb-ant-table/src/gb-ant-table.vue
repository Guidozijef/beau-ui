<template>
  <div class="gb-ant-table">
    <a-table v-bind="$attrs" :pagination="false" @change="handleTableChange">
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
    <gb-ant-pagination
      v-if="paginationData.total > 0 && showPagination"
      :style="paginationWrapStyle"
      v-bind="paginationData"
      :showSizeChanger="paginationShowSizeChanger"
      :showQuickJumper="paginationShowQuickJumper"
      @paginationChange="handlePaginationChange"
    />
  </div>
</template>

<script>
import gbAntPagination from "../../gb-ant-pagination/src/gb-ant-pagination";
export default {
  name: "gbAntTable",
  props: {
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
      formatText: "formatText",
      ellipsisKeys: keys
    };
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
    }
  }
};
</script>
<style lang="less">
.gb-ant-table {
  .ant-table {
    &.ant-table-bordered {
      border-left: none;
      border-right: none;
      border-top: none;
    }
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
  }
  table {
    border-radius: 0;
  }
  .ant-table-fixed {
    .ant-table-thead {
      > tr {
        > th {
          .ant-table-header-column {
          }
        }
      }
    }
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
}
</style>
