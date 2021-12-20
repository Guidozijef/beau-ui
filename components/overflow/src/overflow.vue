<template>
  <div class="v-overflow" ref="selfRef">
    <slot></slot>
    <slot v-if="$slot.counter" name="counter"></slot>
    <span v-else style="display:inline-block" ref="counterRef"></span>
    <slot name="tail"></slot>
  </div>
</template>

<script>
const hiddenAttr = "v-hidden";
export default {
  name: "overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateOverflow: Function
  },
  data() {
    return {};
  },
  mounted() {
    this.deriveCounter();
  },
  methods: {
    deriveCounter() {
      const self = this.$refs.selfRef;
      const counterRef = this.$refs.counterRef;
      const { getCounter, getTail } = this.props;
      let counter = null;
      if (getCounter !== undefined) {
        counter = getCounter();
      } else {
        counter = counterRef;
      }
      if (!self || !counter) return;
      if (counter.hasAttribute(hiddenAttr)) {
        counter.removeAttribute(hiddenAttr);
      }
      const { children } = self;
      const containerWidth = self.offsetWidth;
      const childWidths = [];
      const tail = this.$slots.tail ? getTail() : null;
      let childWidthSum = tail ? tail.offsetWidth : 0;
      let overflow = false;
      const len = self.children.length - (this.$slots.tail ? 1 : 0);
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
        const childWidth = child.offsetWidth;
        childWidthSum += childWidth;
        childWidths[i] = childWidth;
        if (childWidthSum > containerWidth) {
          const { updateCounter } = this.props;
          for (let j = i; j >= 0; --j) {
            const restCount = len - 1 - j;
            if (updateCounter !== undefined) {
              updateCounter(restCount);
            } else {
              counter.textContent = `${restCount}`;
            }
            const counterWidth = counter.offsetWidth;
            childWidthSum -= childWidths[j];
            if (childWidthSum + counterWidth <= containerWidth || j === 0) {
              overflow = true;
              i = j - 1;
              if (tail) {
                // tail too long or 1st element too long
                // we only consider tail now
                if (i === -1) {
                  tail.style.maxWidth = `${containerWidth - counterWidth}px`;
                  tail.style.boxSizing = "border-box";
                } else {
                  tail.style.maxWidth = "";
                }
              }
              break;
            }
          }
        }
        const { onUpdateOverflow } = this.$props;
        if (!overflow) {
          if (onUpdateOverflow !== undefined) {
            onUpdateOverflow(false);
          }
          counter.setAttribute(hiddenAttr, "");
        } else {
          if (onUpdateOverflow !== undefined) {
            onUpdateOverflow(true);
          }
        }
      }
    }
  },
  updated() {
    this.deriveCounter();
  }
};
</script>

<style lang="scss">
.v-overflow {
  width: 100%;
  display: flex;
  overflow: hidden;
}
[v-hidden] {
  display: none !important;
}
</style>
