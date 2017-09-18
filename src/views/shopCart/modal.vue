<template>
  <div >
  	<div id="app" v-show="show">
	    <div class="modal-container-box" >
	    	<transition name="fade">
		    	<div class="modal-container"  transition="fade">
		   			 <div class="close" @click="close">X</div>
		   			 <slot name="main"></slot>
		    	</div>
	   		 </transition>
	    </div>	
  	</div>
  </div>
</template>

<script>

export default {
	data(){
		return{
			show:true
		}
	},
  	components:{
    	 
  	},
  	methods:{
  		close(){
  			this.$emit("close");
  		}
  	}
}
</script>

<style scoped>
	.modal-container-box{
		position: relative;
		top: 50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	.modal-container{
		padding: 20px;
		background-color: #fff;
		position: absolute;
		top: 50%;
		left:50%;
		transform: translate(-50%,-50%);
		border-radius: 5px;
	}
	#app{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		z-index: 10;
	}
	.close{
		width: 26px;
		height: 26px;
		font-size: 26px;
		line-height: 26px;
		color: #fff;
		text-align: center;
		background-color: #000;
		cursor: pointer;
		position: absolute;
		right: 10px;
		top: 10px;
		border-radius: 50%;
	}
	.fade-enter-active, .fade-leave-active {
 	    transition: opacity 1s
    }
    .fade-enter, .fade-leave-active {
    	opacity: 0
    }
</style>
