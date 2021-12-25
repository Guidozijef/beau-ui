<template>
  <div style="position:relative">
    <a-select v-model="value" :mode="'multiple'" :maxTagCount="0" ref="a-select" style="width: 100%" :open="isOpen" @change="handleChange" :labelInValue="true" placeholder="select one country">
      <a-select-option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item[optionProps.label] }}
      </a-select-option>
    </a-select>
    <div class="select-self-container" @mousedown="handleClick">
      <overflow :getTail="getTail" :updateCounter="updateCounter" :onUpdateOverflow="onUpdateOverflow">
        <li class="select-multi_tags-box" v-for="(item, index) in selectValue" :key="index">
          <div class="select-multi_tags">
            <span>{{ item[optionProps.label] }}</span>
            <a-icon type="close" class="close" @click="closeTag(item)" />
          </div>
        </li>
        <li v-show="isShow" class="select-multi_tags-box" slot="tail" ref="tail">
          <div class="select-multi_tags"></div>
        </li>
      </overflow>
    </div>
  </div>
</template>

<script>
import overflow from "../../overflow/src/overflow.vue";
export default {
  components: { overflow },
  name: "selectMulti",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionProps: {
      type: Object,
      default: () => ({ value: "value", label: "label" }),
    },
  },
  data() {
    return {
      selectValue: [],
      value: undefined,
      isOpen: false,
      isShow: false,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.selectValue = value;
    },
    handleClick() {
      this.isOpen = true;
    },
    getTail() {
      return this.$refs.tail;
    },
    updateCounter(value) {
      let Dom = this.$refs.tail
      Dom.querySelector('.select-multi_tags').textContent = `+${value}`;
    },
    onUpdateOverflow(isShow) {
      this.isShow = isShow;
    },
    closeTag(item) {
      let index = this.selectValue.findIndex((f) => f.key === item.key);
      // this.value.splice(index, 1);
      this.selectValue.splice(index, 1);
    },
  },
  directives: {
    clickOutside: {
      // 初始化指令
      bind(el, binding) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler;
        document.addEventListener("click", clickHandler);
      },
      update() {},
      unbind(el) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      },
    },
  },
};
</script>

<style lang="less">
.select-multi_tags-box{
    flex-shrink: 0;
    position: relative;
    float: left;
    padding-top: 3px;
    padding-right: 4px;
  .select-multi_tags {
    height: 24px;
    line-height: 22px;
    max-width: 99%;
    padding: 0 20px 0 10px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    cursor: default;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .close{
      position: absolute;
      top: calc(50% - 5.5px);
      right: 8px;
      cursor: pointer;
    }
  }

}

.select-self-container {
  height: 100%;
  position: absolute;
  width: calc(100% - 6px);
  top: 1px;
  left: 6px;
}
</style>
