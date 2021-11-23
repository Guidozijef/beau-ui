import gbErrorStatus from "./gb-error-status";
import gbSeamlessScroll from "./gb-seamless-scroll";
import gbTinymce from "./gb-tinymce";
import gbAntSectionTitle from "./gb-ant-section-title";
import gbLabelValueText from "./gb-label-value-text";
import gbAntPreviewImage from "./gb-ant-preview-image";
import gbAntButtonCountDown from "./gb-ant-button-count-down";
import gbAntFormFilterSearch from "./gb-ant-form-filter-search";
import gbAntInputNumberUnit from "./gb-ant-input-number-unit";
import gbAntInputTextareaLimit from "./gb-ant-input-textarea-limit";
import gbAntInputEnterSearch from "./gb-ant-input-enter-search";
import gbAntSelectDatePicker from "./gb-ant-select-date-picker";
import gbAntSelectRangePicker from "./gb-ant-select-range-picker";
import gbAntSelectPagination from "./gb-ant-select-pagination";
import gbAntSelectPaginationMultiple from "./gb-ant-select-pagination-multiple";
import gbAntSelectTwoCascader from "./gb-ant-select-two-cascader";
import gbAntSelectNoLimitCascader from "./gb-ant-select-no-limit-cascader";
import gbAntSelectMultipleCascader from "./gb-ant-select-multiple-cascader";
import gbAntFormItem from "./gb-ant-form-item";
import gbAntTable from "./gb-ant-table";
import gbAntTableMultiple from "./gb-ant-table-multiple";
import gbAntTableTrForm from "./gb-ant-table-tr-form";
import gbAntPagination from "./gb-ant-pagination";
const components = [
  gbErrorStatus,
  gbSeamlessScroll,
  gbTinymce,
  gbAntSectionTitle,
  gbAntPreviewImage,
  gbLabelValueText,
  gbAntButtonCountDown,
  gbAntFormFilterSearch,
  gbAntInputNumberUnit,
  gbAntInputTextareaLimit,
  gbAntInputEnterSearch,
  gbAntSelectDatePicker,
  gbAntSelectRangePicker,
  gbAntSelectPagination,
  gbAntSelectTwoCascader,
  gbAntSelectNoLimitCascader,
  gbAntSelectMultipleCascader,
  gbAntSelectPaginationMultiple,
  gbAntFormItem,
  gbAntTable,
  gbAntTableMultiple,
  gbAntTableTrForm,
  gbAntPagination
];
const install = function(Vue) {
  if (install.installed) {
    return;
  }
  components.map(component => {
    Vue.use(component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export {
  gbErrorStatus,
  gbSeamlessScroll,
  gbTinymce,
  gbAntSectionTitle,
  gbAntPreviewImage,
  gbLabelValueText,
  gbAntButtonCountDown,
  gbAntFormFilterSearch,
  gbAntInputNumberUnit,
  gbAntInputTextareaLimit,
  gbAntInputEnterSearch,
  gbAntSelectDatePicker,
  gbAntSelectRangePicker,
  gbAntSelectPagination,
  gbAntSelectTwoCascader,
  gbAntSelectNoLimitCascader,
  gbAntSelectMultipleCascader,
  gbAntSelectPaginationMultiple,
  gbAntFormItem,
  gbAntTable,
  gbAntTableMultiple,
  gbAntTableTrForm,
  gbAntPagination,
  install
};
export default {
  install
};
