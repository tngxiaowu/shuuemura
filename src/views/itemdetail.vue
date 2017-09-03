<template>
  <div class="itemdetail-view">
	<nav-bread>
		<li slot='family'>
			<a :href='familyPath'> {{ family }}	</a>
		</li>
		<li slot='productChineseName'> {{ productChineseName}} </li>
	</nav-bread>
  	<!-- 基本信息部分 -->
 	<div class="basic-information clearfix"> 
 	<!-- 基本信息-左部分 -->
 		<div class="basic-information-header">
			<h3 class="productChName">{{ productChineseName }}</h3>
			<span class="productEnName"> {{ prodcutEnglishName }} </span>
		</div>
		<div class="basic-information-left">
			<div class="productTab none-gap-span">
				<span @click='truntocontent("Des")' :class='{"span-checked":showDes == true}'>
					<a>
						描述
					</a>
				</span>
				<span @click='truntocontent("Com")' :class='{"span-checked":showCom == true}'>
					<a>
						所含成分	
					</a>
				</span>
				<span @clock='turntocontent("Use")' :class='{"span-checked":showUse == true}'>
					<a>
						使用方法
					</a>
				</span>
			</div>
				<div class="productTab-area">
					<p v-if='showDes'>
						{{ productDescripition }}
					</p>
					<p v-if='showCom'>
						{{ productComposition }}	
					</p>
					<p v-if='showUse'>
						{{ productUsage }}		
					</p>
				</div>
		
			<div class="product-star-bar">
				<div class="star-bar small-font-size">
					<span> 
						5
					</span>
				</div>
				<div class='read-and-write small-font-size'>
					<span>阅读
						<a href="">
							{{ productCommentNum }}	
						</a>条评论&nbsp|	
					</span><a>书写评论</a> 
					
				</div>
			</div>
		</div>

		<!-- 基本信息-中间部分 -->
		<div class="basic-information-middle">
			<img 
			v-for='item in ProductStanard'
			:src='"static/img/goods/"+item.imgLink'
			v-if=""
			>
		</div>

		<!-- 基本信息-右边部分 -->
		<div class="basic-information-right">
			<div class="colorWrap">
				
			</div>
			<div class="ProductStanard">
				<label>规则:</label>
				<select @change='onSelect($event)'>
					<option v-for='item in ProductStanard' :value='item.name'>
						{{ item.name }}
					</option>
				{{ ProductStanard }}
				</select>	
			</div>
			<div class="BuyAmount">
				<label>数量:</label><select></select>	
			</div>
			<div class="price-area">
				<span class="true-price">
					￥ {{ ProductTruePrice}}	
				</span>
			</div>
			<div class="add-to-cart-area">
				<button v-if='0' class="add-to-cart-btn">放入购物车 > </button>
				<button v-else class="goods-arrival-notification">到货通知 > </button>	
			</div>
			<div class="promotion-area">
				
			</div>
			<div class="share-to-network-area small-font-size">
				分享:	
			</div>
			
			
		</div>
 	</div>

 	<!-- 产品详情部分 -->
 	<div class="item-detail">
 		<h2>产品详情</h2>
		<img :src='"static/img/goods/"+ productDetailImg'> 		
 	</div>

	<!-- 评论部分 -->
 	<div class="item-productComment clearfix">
 		<h2>产品评论</h2>
 		<div class="normal-btn-spe">
 			<button class="normal-btn">书写评论</button>		
 		</div>
 		<div class="productComment-area">
 			<ul>
 				<li v-for='item in productComment' class="productComment-area-style clearfix">
 					<div class="productComment-area-left">
 						<div class="rate">
 								{{ item.rate }}
 						</div>
 						<div>
 							<span v-if='item.isAnonymous'>
 								{{ item.userNickname }}
 							</span>
 							<span v-else>
 								匿名用户
 							</span>
 						</div>
 						<span> {{ item.date }} </span>
 					</div>
 					<div class="productComment-area-right">
 						<div>
 							{{ item.comment }}
 						</div>

 						<div>
 							这条评论对您有用么？<span>是</span><span>否</span>
 						</div>
 						
 					</div>
 				</li>
 			</ul>
 			
 		</div>


 		
 	</div>

 	<!-- 建议搭配使用部分 -->
 	<div class="item-mix">
 		<h2>建议搭配使用</h2>
 		<p>待做</p>
 	</div>

 	<!-- 浏览历史使用部分 -->
 	<div class="item-history">
 		<h2>浏览过的产品</h2>
 		<p>待做</p>
 	</div>
    
  </div>
</template>

<script>
import NavBread from './../components/navbread/navbread.vue'
export default {

  name: 'itemdetail',

  data () {
    return {
    	currentIndex:0,
    	itemList:["描述","成分","用途"],
    	showDes: true,
    	showUse: false,
    	showCom: false,
    	productList:[

    	],

    	productId:'10000000000000',
    	productChineseName: '绿茶新肌洁颜油',
    	prodcutEnglishName: 'Anti oxi 450ml',
    	productDescripition: `
    	植村秀第1款抵御污染、抗击氧化的洁颜油
		尊享美丽，抵御污染侵袭，造就无尘肌肤！
		植村秀突破性的抗氧化配方卓有成效的清除肌肤浊质，令肌肤回复自然纯净，焕发美丽年轻光彩。
		难以置信的强大功效
		全新绿茶新肌洁颜油，高效清除环境污染物，还肌肤以自然健康神彩，能有效去除隐匿在肌肤中的污染杂
		质。
		

		您可前往最近的植村秀专柜免费体验专业塑眉服务。
		`,
    	productComposition: `
		描述
		所含成分
		使用方法
		天然青木瓜酵素--溶解老废角质，帮助肌肤排毒，澄净明亮肌立现
		辣木精粹 -- 有效对抗污染，强力吸附污染物，带来有效洁净体验


    	`,
    	productUsage:'usage',
    	productCommentNum:15,
    	ProductStanard:[
    		{   
    			name: '450ml（常规版）',
    			imgLink:'item-10000001-001.jpg',
    			productStockNum:1
    		},
    		{
    			name: '450ml (Ambush限量）',
    			// imgLink:'item-10000001-002.jpg',
    			productStockNum:0
    		}
    	],
    	ProductTruePrice: 725,
    	productDetailImg:'item-10000001-detail.jpg',
    	productComment:[
    		{
    			userId: 100001,
    			userNickname: 'laowang',
    			isAnonymous: true,
    			rate: 5,
    			date: '2017-8-31',
    			comment:'哈哈哈',

    		},

    		{
    			userId: 100001,
    			userNickname: 'laowang',
    			isAnonymous: true,
    			rate: 5,
    			date: '2017-8-31',
    			comment:'哈哈哈',

    		}

    	],
    	family: '眉妆',
    	familyPath:'/'
    }
  },
  components:{
  	NavBread
  },
  methods:{
  	truntocontent(index){
  		if(index == "Des")
  		{
  			this.showDes = true;
  			this.showCom = false;
  			this.showUse = false;
  		}else if(index == "Com")
  			{
  				this.showDes = false;
  				this.showCom = true;
  				this.showUse = false;
  			}
  		else
  			{

  				this.showDes = false;
  				this.showCom = false;
  				this.showUse = true;
  			}
  	},
  	onSelect(event){
  		console.log(event);
  	}

  }
}
</script>


<style scoped>
	a{
		color: #000;
		cursor: pointer;
		text-decoration: none;
	}

	a:hover{
		text-decoration: underline;
		cursor: pointer;
	}
	.small-font-size{
		font-size: 12px;
	}

	.true-price{
		font-family: Arial;
		font-size: 18px;
		font-weight: bold;
	}

	label{
		display: inline-block;
		width: 65px;
		font-size: 14px;
		
	}
	select{
		width: 125px;
		height: 17px;
		font-size: 10px;
		line-height: 17px;		
		
	}

	

	li{
		list-style: none;
	}

	.clearfix:after {    
	  content:".";        
	  display:block;     
	  height:0;    
	  visibility:hidden;     
	  clear:both; 
	}
	.clearfix { 
	  *zoom:1;
	}

	
	.none-gap-span{
		letter-spacing: -0.5em;
	}

	.none-gap-span span{
		letter-spacing: normal;
	}

	/*公共样式*/
	.add-to-cart-btn{
		background-color: #c02523;
		border: none;
		color: #ffffff;
		font-size: 12px;
		width: 118px;
		height: 24px;
	}

	.goods-arrival-notification{
		background-color: #dedede;
		border: none;
		color: #000000;
		font-size: 12px;
		width: 118px;
		height: 24px;
		box-shadow: 5px 5px 3px #888888;
		cursor: pointer;
	}


	.itemdetail-view{
		width: 890px;
		margin: 10px auto;
		padding-top: 12px;
	}

	.itemdetail-view>div{
		margin-bottom: 30px;
	}

	/*产品基本信息*/
	.basic-information>div{
		float: left;
		width: 30%;
	}

	.basic-information .basic-information-header{
		width: 890px;
	}

	.basic-information .basic-information-left{
		width: 300px;
	}

	.basic-information .basic-information-middle{
		width: 349px;
		text-align: center;
	}
	.basic-information .basic-information-right{
		width: 240px;
	}

	.basic-information-right>div{
		padding-bottom: 16px;
	}

	.productChName{
		font-size: 28px;
		padding-bottom: 10px;
	}

	.productEnName{
		font-size: 12px;
		line-height: 12px;
		font-weight: normal;
	}

	.productTab{
		margin-top: 42px !important;
		width: 300px;
	}

	

	.productTab>span{
		display: inline-block;
		font-size: 12px;
		line-height: 20px;
		text-align: center;
		width: 100px;
		height: 20px;
		cursor: pointer;
		background:url('./../../static/img/goods/productpage_sprite_shu.png') -200px -150px no-repeat;
	}

	.productTab .span-checked{
		background:url('./../../static/img/goods/productpage_sprite_shu.png') -200px -100px no-repeat;
	}

	

	.productTab-area{
		height: 200px;
		width: 300px;
		border-bottom: 1px solid #ccc;
		font-size: 14px;
	}

	.productTab-area>p{
		/*height: 180px;
		overflow: hidden;*/
	}

	.product-star-bar{
		margin-top: 10px;

	}

	.product-star-bar .star-bar{
		float: left;
	}

	.product-star-bar .read-and-write{
		float: right;
	}

	.ProductStanard{
		height: 18px;
	}

	.BuyAmount{
		border-bottom: 1px solid #999;
	}

	.BuyAmount select{
		width: 50px;
	}

	.promotion-area{
		width: 240px;
		height: 69px;
		border-bottom: 1px solid #999;
	}

	.colorWrap{
		width: 240px;
		height: 55px;	
	}

	.price-area{
		margin-top: 10px;
		padding-bottom: 15px;
	}

	.share-to-network-area{
		padding-top: 10px;
	}

	
	.itemdetail-view div>h2{
		font-size: 26px;
		padding-bottom: 10px;
		border-bottom: 1px solid #999;
		margin-bottom: 25px;
		font-size: normal;
		font-family: Times;
		font-stretch: normal;
	}

	/*产品详情*/
	.item-detail img{
		margin: 0 auto;
	}

	.normal-btn-spe{
		display: block;
		padding-bottom: 20px;
		border-bottom: 1px solid #999;
	}

	/*评论页面*/
	.productComment-area-style{
		padding-bottom: 20px;
		border-bottom: 1px solid #999;
		padding-top: 30px;
	}


	.productComment-area-left{
		width: 30%;
		float: left;
		text-align: center;
		
	}




</style>
