<template>
	<div class="container">
		<div class="image">
			<a href="#/11">
				<img :src="'/static/img/MyCarousel/'+images[index].src" >
				<!-- src=images[index].src -->
			</a>
		</div>

		<div class="btn">
			<li v-for="(item,index) in images" @mouseenter="change(index)"></li>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				timer:null,
				index:0,
				images:[
					{
						src:"2017062001kv.jpg",
						url:"##"
					},
					{
						src:"2017062004kv.jpg",
						url:"##"
					},
					{
						src:"2017062901kv.webp",
						url:"##"
					},
					{
						src:"2017062902kv.jpg",
						url:"##"
					},
					{
						src:"2017071202kv.jpg",
						url:"##"
					},
					{
						src:"2017081501KV.webp",
						url:"##"
					},
					{
						src:"2017062801kv.jpg",
						url:"##"
					}
				]
			}
		},
		methods:{
			next(){
				this.index++;
				if(this.index==this.images.length){
					this.index=0;
				}			
			},
			play(){
				var that = this
				this.timer = setInterval(function(){
					that.next()
				},2000);
			}
			,
			change(e){
				this.index=e;
			}
		},
		created(){
			this.play();
		}
	}
</script>
<style scoped>
	.container{
		position: relative;
		max-width: 1280px;
		margin: 0 auto;
		z-index: 1;
	}
	.btn{
		position: absolute;
		right: 50px;
		top: 480px;
		z-index: 1;
		
	}
	.btn li{
		list-style: none;
		float: left;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		margin: 0 10px;
		background-color: rgba(0,0,0,.4);
	}
	.btn li:hover{
		background-color: rgba(0,0,0,1);
	}
</style>