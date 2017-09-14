<template>
  <div id="bread" class="clearfix">
  	<ul>
  		<li>
  			<a href="/">首页</a>
  		</li>
  		<li>&nbsp/</li>
  		 <slot name='family'></slot> 
  		<li>/&nbsp</li>
		<slot name='productChineseName'></slot> 		
  	</ul>
  </div>
</template>

<script>
export default {
  name: 'navbread',
  
}
</script>

<style scoped>
	ul{
		font-size: 12px;
		color: #999;
		padding: 0px;
	}
	li{
		list-style: none;
		float: left;

	}

	a{
		text-decoration: none;
		color: #999;

	}
</style>



