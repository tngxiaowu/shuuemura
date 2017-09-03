<template>
  <div>
   <router-link tag='div' to='/rank'>
		<span>
			rank
		</span>
   </router-link>
   <router-link tag='div' to='/recommand'>
		<span>
			recommand
		</span>
   </router-link>
   <router-link tag='div' to='/search'>
   		<span>
			search
		</span>
   search
   </router-link>

   <router-link tag='div' to='/singer'>
		<span>
			singer
		</span>
   </router-link>
   <hr>
  </div>
</template>

<script>
export default {
  name: 'tab',
  
}
</script>

<style type="text/css">
	.router-link-active{
		color:red;
	}
</style>

