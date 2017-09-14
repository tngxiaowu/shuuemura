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
			   	<li v-for='(item,index) in starProduct' v-if='slide?index<5:index>=5' class='box1'>
			   		<img :src='"static/img/StarProduct/"+item.img'>
			   		<p class="keywords">
			   			{{ item.keyWords }}
			   		</p>
			   		<p class="name">
			   			{{ item.productName }}
			   		</p>
			   		<p class="price">
			   			￥{{ item.productPrice }} / {{ item.productWeight }}
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
  			img:'hotproductSHU2013052701.webp'
  		},
  		{
  			productName:'自动看到眉笔',
  			productPrice:260,
  			productWeight:'0.3g',
  			keyWords:'双头妆效 自动便携',
  			img:'hotproductSHU2015092301.jpg'

  		},
  		{
  			productName:'砍刀眉笔',
  			productPrice:200,
  			productWeight:'4g',
  			keyWords:'根根分明，栩栩如"真"',
  			img:'hotproduct10113.jpg'
  		},
  		{
  			productName:'无色限柔雾唇膏',
  			productPrice:215,
  			productWeight:'3.4g',
  			keyWords:'雾面哑光 持久显色',
  			img:'hotproductSHU2013011601.jpg'
  		},
  		{
  			productName:'毛孔柔焦泡沫CC隔离液',
  			productPrice:390,
  			productWeight:'50g',
  			keyWords:'轻盈柔焦 隐形毛孔',
  			img:'hotproductSHU2013012201.jpg'
  		},
  		{
  			productName:'如胶似漆眼线笔',
  			productPrice:250,
  			productWeight:'0.12g',
  			keyWords:'胶装质地 一笔成型',
  			img:'hotproductSHU2013071101.webp'
  		},
  		{
  			productName:'小灯泡塑颜光感粉底液',
  			productPrice:485,
  			productWeight:'27ml',
  			keyWords:'光感无暇 轻松上妆',
  			img:'hotproductSHU2013090401.webp'
  		},
  		{
  			productName:'琥珀臻萃洁颜油',
  			productPrice:870,
  			productWeight:'450ml',
  			keyWords:'臻萃精油 8重功效',
  			img:'hotproductshu2015121502.jpg'
  		},
  		{
  			productName:'樱花轻肤洁颜油',
  			productPrice:685,
  			productWeight:'450ml',
  			keyWords:'洗净油光 紧致毛孔',
  			img:'hotproductCSSH028.jpg'
  		},
  		{
  			productName:'专业睫毛夹',
  			productPrice:180,
  			productWeight:'',
  			keyWords:'柔软胶垫 自然卷翘肤',
  			img:'hotproduct10062.jpg'
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

