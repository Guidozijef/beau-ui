<script>
const hiddenAttr = "v-hidden";
const li = document.createElement("li");
li.className = "ant-select-selection__choice ant-select-selection_overflow";
li.style.display = "none";
export default {
  name: "over_flow",
  data() {
    return {
      key: 0
    };
  },
  computed: {
    dom () {
      const self = this.$refs.selfRef;
      if (!self) return ''
      const parent = self.querySelector(".ant-select-selection__rendered ul");
      return parent.children
    }
  },
  watch: {
    dom: {
      handler() {
        this.deriveCounter()
      },
      deep: true,
      immediate: true,
    }
  },
  mounted() {
    const self = this.$refs.selfRef;
    const parent = self.querySelector(".ant-select-selection__rendered ul");
    parent.querySelector(
      ".ant-select-search.ant-select-search--inline"
    ).textContent = "";
    // while (parent.firstChild) {
    //   parent.removeChild(parent.firstChild)
    // }
    parent.appendChild(li);
    this.deriveCounter();
  },
  render(h) {
    const { $slots } = this
    setTimeout(() => {
      this.deriveCounter()
    }, 500)
    return h(
      "div",
      {
        class: "v-overflow",
        ref: "selfRef"
      },
      $slots.default ? $slots.default : null
    );
  },
  methods: {
    getTail() {
      const self = this.$refs.selfRef;
      return self.querySelector(
        ".ant-select-selection__choice.ant-select-selection_overflow"
      );
    },
    onUpdateOverflow(isShow) {
      li.style.display = isShow ? "block" : "none";
      // if (isShow) {
      //   this.deriveCounter()
      // }
    },
    updateCounter(num) {
      console.log(num);
      li.textContent = `+${num}`;
    },
    deriveCounter() {
      const ref = this.$refs.selfRef;
      if (!ref) return false;
      const self = ref.querySelector(".ant-select-selection__rendered");
      const parent = ref.querySelector(".ant-select-selection__rendered ul");
      const { children } = parent;
      if (!children.length) return false;
      const containerWidth = self.offsetWidth;
      const childWidths = [];
      const tail = this.getTail();
      let childWidthSum = tail ? tail.offsetWidth : 0;
      let overflow = false;
      const len = children.length - (tail ? 1 : 0);
      for (let i = 0; i < len - 1; ++i) {
        if (i < 0) continue;
        const child = children[i];
        if (overflow) {
          if (!child.hasAttribute(hiddenAttr)) {
            child.setAttribute(hiddenAttr, "");
          }
          continue;
        } else if (child.hasAttribute(hiddenAttr)) {
          child.removeAttribute(hiddenAttr);
        }
        const childWidth = child.offsetWidth + 4;
        childWidthSum += childWidth;
        childWidths[i] = childWidth;
        if (childWidthSum > containerWidth) {
          const { updateCounter } = this;
          for (let j = i; j >= 0; --j) {
            const restCount = len - 1 - j;
            if (updateCounter !== undefined) {
              updateCounter(restCount);
            }
            childWidthSum -= childWidths[j];
            if (childWidthSum <= containerWidth || j === 0) {
              overflow = true;
              i = j - 1;
              if (tail) {
                // tail too long or 1st element too long
                // we only consider tail now
                if (i === -1) {
                  tail.style.maxWidth = `${containerWidth}px`;
                  tail.style.boxSizing = "border-box";
                } else {
                  tail.style.maxWidth = "";
                }
              }
              break;
            }
          }
        }
      }
      const { onUpdateOverflow } = this;
      if (!overflow) {
        if (onUpdateOverflow !== undefined) {
          onUpdateOverflow(false);
        }
        // counter.setAttribute(hiddenAttr, "");
      } else {
        if (onUpdateOverflow !== undefined) {
          onUpdateOverflow(true);
        }
      }
    }
  },
  // updated() {
  //   setTimeout(() => {
  //     console.log("1111");
  //     this.deriveCounter();
  //   }, 500);
  // }
};
</script>

<style lang="less">
.v-overflow {
  width: 100%;
  display: flex;
  overflow: hidden;
}
[v-hidden] {
  display: none !important;
}
.self-select /deep/ .ant-select-selection__rendered ul {
  height: 100%;
  display: flex;
}
</style>
