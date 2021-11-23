<template>
  <div class="gb-ant-pagination">
    <a-pagination
      v-model="currentPage"
      :size="size"
      :defaultCurrent="currentPage"
      :showTotal="totalDesc"
      :pageSizeOptions="pageSizeOptions"
      :total="total"
      :showQuickJumper="showQuickJumper"
      :showSizeChanger="showSizeChanger"
      :pageSize.sync="pageSize"
      @showSizeChange="handleShowSizeChange"
      @change="handleChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span class="pagination-select-item">{{ props.value }}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
export default {
  name: "gbAntPagination",
  props: {
    size: {
      type: String,
      default: "small"
    },
    total: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    },
    defaultPageSize: {
      type: Number,
      default: 20
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    showQuickJumper: {
      type: Boolean,
      default: true
    },
    defaultPageSizeOptions: {
      type: Array,
      default: () => {
        return ["10", "20", "50"];
      }
    },
    // 用来统计全选中选中的数量
    selectedItems: {
      type: Number
    }
  },
  data() {
    return {
      currentPage: this.current,
      pageSizeOptions: this.defaultPageSizeOptions,
      pageSize: this.defaultPageSize
    };
  },
  methods: {
    handleChange(current, pageSize) {
      this.$emit("paginationChange", current, pageSize);
    },
    handleShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      if (this.total === 0) {
        this.$emit("paginationChange", current, pageSize, true);
      } else {
        this.currentPage = 1;
        this.$emit("paginationChange", this.currentPage, pageSize);
      }
    },
    totalDesc(total) {
      if (this.selectedItems && this.selectedItems >= 0) {
        return (
          <span class="gb-ant-pagination-selected-text">
            <span>
              共 {total} 条数据，已选{" "}
              <span class="gb-ant-pagination-selected-number-text">
                {this.selectedItems}
              </span>{" "}
              个
            </span>
          </span>
        );
      }
      return `共 ${total} 条数据`;
    }
  }
};
</script>
<style lang="less">
.gb-ant-pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .gb-ant-pagination-selected-number-text {
    color: #1d47aa;
  }
}
</style>
