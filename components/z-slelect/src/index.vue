<template>
  <div class="selectWrap">
    <div class="select-wrapper">
      <div class="select" @click="triggerOption">
        <div class>
          <span></span>
          <input
            type="text"
            autocomplete="off"
            class="z-input"
            v-model="selectValue"
            :placeholder="selectContent.text"
          />
        </div>
        <div class="triangle-wrapper">
          <div
            id="triangle-down"
            :style="{ transform: 'rotate(180deg)' }"
          ></div>
        </div>
      </div>
      <div class="option-wrapper" style="display: none;">
        <!-- 渲染父组件传来的值 -->
        <div
          class="option-item"
          v-for="(item, index) in options"
          :key="index"
          @mouseout="out($event)"
          @mouseover="move($event)"
          @click="choose(item)"
        >
          {{ item[optionProps.label] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectWidth: {
      type: Number,
      default: 240
    },
    //   接受父组件传过来的值
    options: {
      type: Array
    },
    optionProps: {
      type: Object,
      default: () => ({ value: "value", label: "label" })
    },
    selectContent: {
      type: Object,
      default: function() {
        return { value: 0, text: "请选择" };
      }
    }
  },
  data() {
    return {
      selectValue: ""
    };
  },
  mounted() {
    document.querySelector(".selectWrap").style.width = this.selectWidth + "px";
  },
  computed: {
    optionWrapper() {
      return document.querySelector(".option-wrapper");
    },
    selectCon() {
      return document.querySelector(".select-content");
    },
    subjectList() {
      return document.getElementsByClassName("option-item");
    }
  },
  methods: {
    move(event) {
      for (let item of this.subjectList) {
        item.classList.remove("hover");
      }
      event.currentTarget.classList.add("hover");
    },
    out(event) {
      event.currentTarget.classList.remove("hover");
    },
    triggerOption() {
      if (this.optionWrapper.style.display == "none") {
        this.optionWrapper.style.display = "block";
      } else {
        this.optionWrapper.style.display = "none";
      }
      for (var item of this.subjectList) {
        if (item.innerHTML == this.selectContent.text) {
          item.classList.add("hover");
        } else {
          item.classList.remove("hover");
        }
      }
    },
    choose(item) {
      this.selectContent.text = item.text;
      this.optionWrapper.style.display = "none";
      this.$emit(
        "changeSelect",
        this.selectContent.text,
        this.selectContent.value
      );
      this.selectValue = item.value;
    }
  }
};
</script>
<style lang="less">
.select-wrapper {
  position: relative;
}
.select {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.z-input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 35px 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  &:hover {
    border: 1px solid #409eff;
  }
  &:focus {
    border: 1px solid #409eff;
  }
}
.select-content {
  text-align: left;
}
.triangle-wrapper {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}
#triangle-down {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: rotate(180deg);
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 6px solid #000;
}
.option-wrapper {
  margin-top: 2px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  position: relative;
  overflow: scroll;
  min-width: 80px;
  width: 100%;
  max-height: 204px;
}
.option-item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.hover {
  background-color: #f5f7fa;
}
</style>
