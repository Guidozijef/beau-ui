<template>
  <div class="gb-ant-button-count-down">
    <a-button
      v-bind="$attrs"
      :disabled="btnDisabled"
      class="btn-count-down"
      @click="handleClick"
    >{{timeStartText}}</a-button>
  </div>
</template>

<script>
export default {
  name: "gbAntButtonCountDown",
  props: {
    startCountDown:{
      type:Boolean,
      default:false
    },
    text: {
      type: String,
      default:"发送验证码"
    },
    time:{
      type:Number,
      default:60
    },
    timeLastText:{
      type:String,
      default:"S后重新获取"
    }
  },
  data(){
    return {
      timeStartText:this.text,
      startTime:this.time,
      btnDisabled:false
    }
  },
  destroyed(){
    this.timer && clearInterval(this.timer);
    this.timer = null;
  },
  watch:{
    startCountDown(newVal){
      if(newVal){
        this.btnDisabled = true;
        let time = this.time;
        this.timer = setInterval(()=>{
          time--;
          if(time > 0){
            this.timeStartText = `${time}${this.timeLastText}`
          }else{
            clearInterval(this.timer);
            this.timeStartText = this.text
            this.startTime = this.time
            this.btnDisabled = false
            this.$emit("changeCountDown",false)
          }
        },1000)
      }
    }
  },
  methods:{
    handleClick(){
      this.$emit("btnClick");
    }
  }
};
</script>
<style lang="less">
.gb-ant-button-count-down {
}
</style>
