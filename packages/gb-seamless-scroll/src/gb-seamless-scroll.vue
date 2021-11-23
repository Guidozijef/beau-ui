<template>
  <div class="gb-seamless-scroll-wrap">
    <vue-seamless-scroll
      :data="dataList"
      :class-option="scrollConfig"
      class="gb-seamless-scroll"
      :ref="refName"
    >
      <div class="gb-seamless-scroll-content-wrap">
        <div
          class="gb-seamless-scroll-content"
          v-for="item in dataList"
          :key="item[optionsConfig.key]"
          @click="handleClick(item)"
        >
          <template v-if="item.content" slot="content"></template>
          <template v-else>{{ item[optionsConfig.text] }}</template>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "gbSeamlessScroll",
  components: {
    vueSeamlessScroll
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    scrollConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    optionsConfig: {
      type: Object,
      default: () => {
        return {
          key: "id",
          text: "name"
        };
      }
    },
    refName: {
      type: String
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("handleClick", item);
    }
  }
};
</script>
<style lang="less">
.gb-seamless-scroll-wrap {
  .gb-seamless-scroll {
    height: 100%;
  }
}
</style>
