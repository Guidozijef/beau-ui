<template>
  <a-form :form="form">
    <a-form-item label="无默认值">
      <gb-ant-select-multiple-cascader
        v-decorator="[
          'menuIds',
          {
            rules: [{ required: true, message: '请选择' }]
          }
        ]"
        allowClear
        style="width:450px;"
        :maxTagCount="3"
        :maxTagTextLength="4"
        placeholder="请选择"
        :selectOptionsConfig="{
          key: 'fullPath',
          value: 'fullPath',
          text: 'name',
          children: 'children'
        }"
        allText="全选"
        noDataText="暂无数据"
        dropdownClassName="customer-multiple-cascader"
        :treeData="multipleTreeData"
        @search="handleSearch"
        @change="change"
        @handleCheckboxChange="handleCheckboxChange"
      />
    </a-form-item>
    <a-button type="primary" @click="handleSubmit">提交数据</a-button>
    <br />
    <div style="width:240px">
      <select-multi :options="options"></select-multi>
    </div>
  </a-form>
</template>
<script>
import SelectMulti from "../components/select-multi";
export default {
  components: { SelectMulti },
  data() {
    return {
      form: this.$form.createForm(this, { name: "form" }),
      multipleTreeData: [],
      options: [
        { label: "sdfgsdf1", value: "24" },
        { label: "sdfgsdf2", value: "34" },
        { label: "sdfgsdf3", value: "4665" },
        { label: "sdfgsdf4", value: "57" },
        { label: "sdfgsdf5", value: "686" }
      ]
    };
  },
  created() {
    // 获取下拉框数据
    this.getTreeData();
  },
  methods: {
    async getTreeData() {
      const treeMultipleData = await this.getData();
      this.multipleTreeData = [treeMultipleData];
    },
    async getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              fullPath: "01",
              name: "广东省",
              children: [
                {
                  fullPath: "0101",
                  name: "广州市",
                  children: [
                    { fullPath: "010101", name: "南沙区", children: [] },
                    { fullPath: "010102", name: "越秀区", children: [] }
                  ]
                },
                {
                  fullPath: "0102",
                  name: "深圳市",
                  children: [
                    { fullPath: "010201", name: "南山区", children: [] },
                    { fullPath: "010202", name: "福田区", children: [] },
                    { fullPath: "010203", name: "宝安区", children: [] },
                    { fullPath: "010204", name: "龙华区", children: [] },
                    { fullPath: "010205", name: "龙岗区", children: [] },
                    { fullPath: "010206", name: "盐田区", children: [] },
                    { fullPath: "010207", name: "光明新区", children: [] },
                    { fullPath: "010208", name: "罗湖区", children: [] }
                  ]
                }
              ]
            },
            {
              fullPath: "02",
              name: "江西省",
              children: [
                {
                  fullPath: "0201",
                  name: "南昌市",
                  children: [
                    { fullPath: "020101", name: "南昌县", children: [] }
                  ]
                },
                {
                  fullPath: "0202",
                  name: "宜春市",
                  children: [
                    { fullPath: "020201", name: "铜鼓县", children: [] },
                    { fullPath: "020202", name: "宜丰县", children: [] },
                    { fullPath: "020203", name: "上高县", children: [] },
                    { fullPath: "020204", name: "万载县", children: [] }
                  ]
                }
              ]
            }
          ]);
        }, 1000);
      });
    },
    handleCheckboxChange(selectedData) {
      console.log(selectedData);
    },
    handleSearch(value) {
      console.log(value);
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this;
      validateFields((errors, values) => {
        if (!errors) {
          console.log(values);
        }
      });
    },
    change(data) {
      console.log(data);
    }
  }
};
</script>
