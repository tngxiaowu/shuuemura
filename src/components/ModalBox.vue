<template>
  <div >
  	<div id="app" v-show="show">
	    <div class="modal-container-box" >
	    	<transition name="fade">
		    	<div class="modal-container"  transition="fade">
		   			 <div class="close" @click="show=!show">X</div>
		   				hello,这是一个新的模态框组件~
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
		padding: 50px;
		
		background-color: #fff;
		position: absolute;
		top: 50%;
		left:50%;
		transform: translate(-50%,-50%);
		border-radius: 10px;
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
		width: 20px;
		height: 20px;
		font-size: 20px;
		line-height: 20px;
		color: #fff;
		text-align: center;
		background-color: #000;
		cursor: pointer;
		position: absolute;
		right: 5px;
		top: 5px;
		border-radius: 50%;
	}
	.fade-enter-active, .fade-leave-active {
 	    transition: opacity 1s
    }
    .fade-enter, .fade-leave-active {
    	opacity: 0
    }
</style>