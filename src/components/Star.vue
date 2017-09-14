<template>
  <div id="star">
    <p class="all">
      <input type="radio" name="b" value="0" />
      <span>★</span>
      <input type="radio" name="b" value="1" ref='input1' @mouseover='starHover(1)'/>
      <span :class='{"checked":value1<=currentIndex}'>★</span>
      <input type="radio" name="b" value="2" ref='input2' @mouseover='starHover(2)'/>
      <span :class='{"checked":value2<=currentIndex}'>★</span>
      <input type="radio" name="b" value="3" ref='input3' @mouseover='starHover(3)'/>
      <span :class='{"checked":value3<=currentIndex}' >★</span>
      <input type="radio" name="b" value="4" ref='input4' @mouseover='starHover(4)'/>
      <span :class='{"checked":value4<=currentIndex}'>★</span>
      <input type="radio" name="b" value="5" ref='input5' @mouseover='starHover(5)'/>
      <span :class='{"checked":value5<=currentIndex}'>★</span>
      <em v-if='!currentIndex'>0星</em>
      <em v-if='value1==currentIndex'>1星</em>
      <span v-if='value1==currentIndex'>完全不适合我！</span>
      <em v-if='value2==currentIndex'>2星</em>
      <span v-if='value2==currentIndex'>有些不合适我！</span>
      <em v-if='value3==currentIndex'>3星</em>
      <span v-if='value3==currentIndex'>还不错的产品！</span>
      <em v-if='value4==currentIndex'>4星</em>
      <span v-if='value4==currentIndex'>产品很好！</span>
      <em v-if='value5==currentIndex'>5星</em>
      <span v-if='value5==currentIndex'>满意！愿意推荐给大家！</span>
      <div>
        <span class="add-comment-notice" :class='{"warn": isRated}'>
          点击星星进行评论  
        </span>
      </div>
    </p>
  </div>
</template>
<!-- v-model="inputdata" -->
<script>
  export default {
    name:'star',
    data(){
      return {
        inputdata:'0',
        //中间值 判断class的分布
        currentIndex:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        rate:''
      }
    },
    props:{
      isRated:'',

    },
    methods:{
      starHover(index){
        this.currentIndex = index;
        this.$emit('addStar',this.currentIndex);
      },
      setValue(){
        this.value1 = this.$refs.input1.value
        this.value2 = this.$refs.input2.value
        this.value3 = this.$refs.input3.value
        this.value4 = this.$refs.input4.value
        this.value5 = this.$refs.input5.value
      }
      
    },
    watch: {
    inputdata(value) {
    console.log(value)
    }
  },
  mounted(){
    this.setValue();

  }
  }
</script>

<style scoped>
  p{ margin: 0;}
  .add-comment-notice{ font-size: 12px; display: inline-block; margin-top: 10px; }
  .warn{ color: red; }
  .all>input{opacity:0;position:absolute;width:1em;height:1em;margin:0;cursor: default;}
  .all>input:nth-of-type(1),
  .all>span:nth-of-type(1){display:none;}
  .all>span{font-size:1em;color:#666; -webkit-transition:color .2s;transition:color .2s;}
  .all>input{color:#666;}
  .all>.checked{color:gold;}
</style>

