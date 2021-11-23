<template>
  <div class="gb-ant-table-tr-form">
    <div class="gb-ant-table-tr-form-btn-wrap">
      <a-button type="primary" @click="handleAdd">新增</a-button>
    </div>
    <a-table
      class="gb-ant-table-tr-form-wrap"
      v-bind="$attrs"
      :pagination="false"
    >
      <template slot="formatText" slot-scope="text, record, index">
        <span :title="text">{{ textEllipsis(text, record, index) }}</span>
      </template>
      <template
        v-if="useDefaultOperate"
        slot="operation"
        slot-scope="text, record, index"
      >
        <a
          v-if="record.$isEdit"
          href="javascript:void(0);"
          class="link-text"
          @click="handleOperate('save', { text, record, index })"
          >保存</a
        >
        <a
          v-if="record.$isEdit"
          href="javascript:void(0);"
          class="link-text"
          style="margin-left:10px;"
          @click="handleOperate('cancel', { text, record, index })"
          >取消</a
        >
        <a
          v-if="!record.$isEdit"
          href="javascript:void(0);"
          class="link-text"
          @click="handleOperate('edit', { text, record, index })"
          >编辑</a
        >
        <a
          v-if="!record.$isEdit"
          href="javascript:void(0);"
          class="link-text"
          style="margin-left:10px;"
          @click="handleOperate('delete', { text, record, index })"
          >删除</a
        >
        <slot v-if="!record.$isEdit" name="operationOther"></slot>
      </template>
      <template
        v-for="item in $attrs.columns"
        :slot="item.slots && item.slots.title ? item.slots.title : ''"
      >
        <slot
          :name="item.slots && item.slots.title ? item.slots.title : ''"
        ></slot>
      </template>
      <template
        v-for="item in $attrs.columns"
        :slot="
          item.scopedSlots &&
          item.scopedSlots.customRender &&
          item.scopedSlots.customRender !== formatText &&
          item.scopedSlots.customRender !== operation
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
  </div>
</template>

<script>
export default {
  name: "gbAntTableTrForm",
  props: {
    useDefaultOperate: {
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
      operation: "operation",
      ellipsisKeys: keys
    };
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
    handleAdd() {
      this.$emit("handleAdd");
    },
    handleOperate(type, item) {
      this.$emit("handleOperate", type, item);
    }
  }
};
</script>
<style lang="less">
.gb-ant-table-tr-form {
  .gb-form-item {
    margin-bottom: 0;
  }
  .gb-ant-table-tr-form-btn-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .gb-ant-table-tr-form-wrap {
    margin-top: 20px;
  }
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
}
</style>
