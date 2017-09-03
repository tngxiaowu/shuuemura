<template>
  <div class="starproduct">
   <div class="best-product-logo">
   		<a href="##">
   			<img src="./../../static/img/index/promotion-banner-best-product-logo.jpg" height="42" width="356">
   		</a>
   </div>
        <div class="wrap">
        <transition name="fold">
		   <ul class='starproduct-box clearfix'>
			   	<li v-for='(item,index) in starProduct' v-if='slide?index>=5:index<5' class='box1'>
			   		<img :src='"static/img/index/"+item.img'>
			   		<p class="keywords">
			   			{{ item.keyWords }}
			   		</p>
			   		<p class="name">
			   			{{ item.productName }}
			   		</p>
			   		<p class="price">
			   			{{ item.productPrice }} / {{ item.productWeight }}
			   		</p>
			   		<button>立即购买</button>
			   	</li>
		   </ul>
		 </transition>
		 </div>
   <div class="more-product clearfix">
   	<a href="##">
   		更多明星产品 >	
   	</a>
   </div>
   <div class="page-1"
	@click='turnToPage(1)'
	:class='{"checked":!slide}'
   ></div>
   <div class="page-2"
   @click='turnToPage(2)'
	:class='{"checked":slide}'
   ></div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'starproduct',
  data(){
  	return{
  		slide:true,
  		starProduct:[
  		{
  			productName:'绿茶新肌洁颜油1',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油2',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'

  		},
  		{
  			productName:'绿茶新肌洁颜油3',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油4',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油5',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油6',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油7',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油8',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油9',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		{
  			productName:'绿茶新肌洁颜油10',
  			productPrice:725,
  			productWeight:'450ml',
  			keyWords:'抗氧化 焕亮肌肤',
  			img:'hotproductSHU2015092301.jpg'
  		},
  		]
  	}
  },
  methods:{
  	test(){
  		alert('haha');
  	},
  	turnToPage(index){
  			if(index == 2){
  				this.slide = true;
  			}else{
  				this.slide = false;
  			}
  		}
  }
  
}
</script>

<style scoped>
	.clearfix:after {    
	    content:".";   
	    display:block; 
	    height:0; 
	    visibility:hidden;     
	    clear:both; }
	.clearfix {     
		*zoom:1; 
	}

	.best-product-logo{
		margin-left: 40px;
	}

	a{
		color: black;
		text-decoration: none;
	}

	.wrap{


	}

	ul{
		padding-left: 0px;
		height: 400px;
		transform: translate(0px,0px);
	}

	ul li{
		list-style: none;
		float: left;
	}

	ul li img{
		width: 256px;
	}

	ul li button{
		border: none;
		background-color: #000000;
		color: #ffffff;
		width: 90px;
		height: 24px;
		margin-top: 10px;
		cursor: pointer;
	}

	.starproduct{
		margin-top: 70px;
		position: relative;
		margin-bottom: 25px;

		/*border: 1px solid pink;*/
	}

	.starproduct-box{
		text-align: center;
		margin-bottom: 40px;
		height: 360px;
		overflow: hidden;
		padding-top: 95px;
		margin-top: 0px;
		
	}

	.starproduct-box li{
		float: left;

	}
	
	.keywords{
		font-size: 14px;
		color: #999999;
		margin: 0px;
	}

	.name{
		margin-top: 0px;
		margin-bottom: 0px;
		font-size: 15px;

	}

	.price{
		margin-top: 25px;
		font-size: 14px;
		margin-bottom: 0px;
	}

	
	.more-product{
		text-align: center;
		margin-top: 50px;
		font-size: 18px;
		font-weight: bold;
		padding-bottom: 5px;
		border-bottom: 1px solid #000000;
		width: 150px;
		margin: 0 auto;

	}

	.page-1{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: #cccccc;
		position: absolute;
		top: 20px;
		right: 50px;
	}

	.page-2{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: #cccccc;
		position: absolute;
		top: 20px;
		right: 75px;
	}

	.checked{
		background-color: #000000;
	}

	.box1{
		transition: all 1s linear;
	}

	.fold-enter-active {
  	transition: all 0.5s ease
	}
	
	.fold-leave-active {
	 transition: all 0.5s ease
	}

	.fold-enter{
		transform: translate(-1280px,0px);
	}

	.fold-leav-activity{
		transform: translate(-1280px,0px);
	}





</style>

