<template>
  <div class="navheader">
   	<div class="news">
   		{{ msg }}
   	</div>
  </div>
</template>

<script>
export default {
  name: 'navhader',
  data(){
  	return{
  		shoppingBag:1,
  		msg:'植村秀官方商城 正品保证 | 8.29-9.4在线支付免运费'
  	}
  }  
}
</script>

<style scoped>
	a{
		text-decoration: none;
		color: #999999;
	}
	.navheader{
		width: 1280px;
		height: 40px;
		background-color: #db0792;
		margin: 0 auto;
		font-size: 14px;
	}
	.news{
		text-align: center;
		color: #ffffff;
		line-height: 40px;
	}
</style>

