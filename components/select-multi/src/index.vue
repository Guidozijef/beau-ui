<template>
  <div style="position:relative">
    <a-select v-model="value" :mode="'multiple'" :maxTagCount="0" ref="a-select" style="width: 100%" :open="isOpen" @change="handleChange" :labelInValue="true" placeholder="select one country">
      <a-select-option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item[optionProps.label] }}
      </a-select-option>
    </a-select>
    <div class="ant-select-selection--multiple select-self-container" @mousedown="handleClick">
      <overflow :getTail="getTail" :updateCounter="updateCounter" :onUpdateOverflow="onUpdateOverflow">
        <li class="ant-select-selection__choice select-multi_tags" v-for="(item, index) in selectValue" :key="index">
          <span>{{ item[optionProps.label] }}</span>
        </li>
        <li v-show="isShow" slot="tail" ref="tail" class="ant-select-selection__choice select-multi_tags"></li>
      </overflow>
    </div>
  </div>
</template>

<script>
import overflow from '../../overflow/src/overflow.vue';
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
      isShow: false
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
    getTail () {
      return this.$refs.tail
    },
    updateCounter (value) {
      this.$refs.tail.textContent = `+${value}`
    },
    onUpdateOverflow (isShow) {
      this.isShow = isShow
    }
  },
  directives: {
    clickOutside: {
      // 初始化指令
      bind(el, binding, vnode) {
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
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      },
    },
  },
};
</script>

<style lang="less">
.select-multi_tags {
  height: 24px;
  margin-top: 3px;
  line-height: 22px;
}
.select-self-container {
  position: absolute;
  width: 100%;
  top: 1px;
  left: 6px;
}
</style>
