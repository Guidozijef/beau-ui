<template>
  <div class="gb-ant-preview-image-wrap" @click="handlePreviewImage">
    <div class="gb-ant-preview-image-container">
      <img
        v-if="coverImage"
        :src="coverImage"
        alt=""
        class="gb-ant-preview-image"
      />
    </div>
    <div v-if="showDescription" class="gb-ant-preview-image-desc-row">
      <div class="gb-ant-preview-image-desc-text">{{ descText }}</div>
      <div class="gb-ant-preview-image-desc-count">
        {{ imageList.length }}{{ descUnit }}
      </div>
    </div>
    <slot name="modal">
      <a-modal
        :visible="previewModal"
        :footer="null"
        @cancel="previewModal = false"
        class="gb-ant-preview-image-modal"
      >
        <a-carousel
          arrows
          class="gb-ant-preview-image-modal-carousel"
          dots-class="gb-ant-preview-image-modal-slick-dots gb-ant-preview-image-modal-slick-thumb"
        >
          <div
            slot="prevArrow"
            class="gb-ant-preview-image-slick-arrow gb-ant-preview-image-prev-slick-arrow"
          >
            <a-icon type="left-circle"></a-icon>
          </div>
          <div
            slot="nextArrow"
            class="gb-ant-preview-image-slick-arrow gb-ant-preview-image-next-slick-arrow"
          >
            <a-icon type="right-circle"></a-icon>
          </div>
          <a slot="customPaging" slot-scope="props">
            <img :src="getImgUrl(props.i)" />
          </a>
          <div v-for="item in imageList" :key="item[optionsConfig.key]">
            <img :src="item[optionsConfig.src]" />
          </div>
        </a-carousel>
      </a-modal>
    </slot>
  </div>
</template>

<script>
// 还存在点问题，当图片数量超出时，滚动条不能自动滚动到对应位置
export default {
  name: "gbAntPreviewImage",
  props: {
    coverImage: {
      type: String
    },
    imageList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    optionsConfig: {
      type: Object,
      default: () => {
        return {
          key: "id",
          src: "src"
        };
      }
    },
    showDescription: {
      type: Boolean,
      default: true
    },
    descText: {
      type: String,
      default: "相册"
    },
    descUnit: {
      type: String,
      default: "张"
    }
  },
  data() {
    return {
      previewModal: false
    };
  },
  methods: {
    getImgUrl(index) {
      return this.imageList[index][this.optionsConfig.src];
    },
    handlePreviewImage() {
      this.previewModal = true;
      this.$emit("click");
    }
  }
};
</script>
<style lang="less">
.gb-ant-preview-image-wrap {
  display: inline-block;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #e2e3e6;
  border-radius: 3px;
  .gb-ant-preview-image-container {
    width: 150px;
    height: 150px;
    background-color: #eee;
    .gb-ant-preview-image {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .gb-ant-preview-image-desc-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .gb-ant-preview-image-desc-count {
      color: #9d9fa7;
    }
  }
}
.gb-ant-preview-image-modal {
  .gb-ant-preview-image-modal-carousel {
    /deep/.gb-ant-preview-image-slick-arrow {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #000;
      opacity: 0.3;
      z-index: 1;

      &.gb-ant-preview-image-prev-slick-arrow {
        left: 0;
      }
      &.gb-ant-preview-image-next-slick-arrow {
        right: 0;
      }
      &:before {
        content: "";
      }
    }

    /deep/.gb-ant-preview-image-modal-slick-dots {
      height: 60px;
      position: relative;
      bottom: 0;
      margin-top: 20px;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      // 滚动条样式修改
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        // 滚动槽
        &-track {
          box-shadow: inset 0 0 4px rbga(0, 0, 0, 0.2);
          border-radius: 4px;
          background-color: #fff;
        }
        &-thumb {
          box-shadow: inset 0 0 4px rbga(0, 0, 0, 0.2);
          border-radius: 4px;
          background-color: #d2d2d2;
        }
      }
    }

    /deep/.slick-slide {
      img {
        display: block;
        margin: auto;
        max-width: 80%;
      }
    }
    /deep/.gb-ant-preview-image-modal-slick-thumb {
      li {
        width: 60px;
        height: 45px;
        img {
          width: 100%;
          height: 100%;
          filter: grayscale(100%);
        }
      }
      .slick-active {
        img {
          filter: grayscale(0%);
        }
      }
    }
  }
}
</style>
