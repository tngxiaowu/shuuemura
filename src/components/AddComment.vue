<template>
  <div class="addComent">
    <textarea v-model='commentContent'></textarea>
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
        currentIndex:'0',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
      }
    },
    methods:{
      starHover(index){
        this.currentIndex = index;
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
  .all>input{opacity:0;position:absolute;width:1em;height:1em;margin:0;cursor: default;}
  .all>input:nth-of-type(1),
  .all>span:nth-of-type(1){display:none;}
  .all>span{font-size:1em;color:#666;
  -webkit-transition:color .2s;
  transition:color .2s;
  }

.all>input{color:#666;}
.all>.checked{color:gold;}

/*.all>input:checked+span{color:gold;}*/
</style>

