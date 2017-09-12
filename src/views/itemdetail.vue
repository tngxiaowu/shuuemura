<template>
  <div class="itemdetail-view">
	<!-- <nav-bread>
		<li slot='family'>
			<a :href='familyPath'> {{ family }}	</a>
		</li>
		<li slot='productChineseName'> {{ model.ModelChName }} </li>
	</nav-bread> -->
  	<!-- 基本信息部分 -->
 	<div class="basic-information clearfix"> 
 	<!-- 基本信息-左部分 -->
 		<div class="basic-information-header">
			<h3 class="productChName">{{ model.ModelChName }}</h3>
			<span class="productEnName"> {{ model.ModelEngName }} </span>
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
						{{ model.ModelDescripition }}
					</p>
					<p v-if='showCom'>
						{{ model.ModelComposition }}	
					</p>
					<p v-if='showUse'>
						{{ model.ModelUsage }}		
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
					</span>
					<a @click='showCommentBox = true'>
					书写评论
					</a> 
					
				</div>
			</div>
		</div>

		<!-- 基本信息-中间部分 -->
		<div class="basic-information-middle">
			<img 
			:src='"static/img/goods/"+relatedItem[0].itemImg'
			v-if=""
			>
		</div>

		<!-- 基本信息-右边部分 -->
		<div class="basic-information-right">
			<div class="colorWrap">
				
			</div>
			<div class="ProductStanard">
				<label>规格:</label>
				<select v-model='value'>
					<option 
					v-for='(item,index) in model.item' 
					v-model='item.itemStandard'
					>
						{{ item.itemStandard }}
					</option>
				
				</select>	
			</div>
			<div class="BuyAmount">
				<label>数量:</label>
				<select v-model='buyAmount' v-if='relatedItem[0].itemNumber'>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>	
				<select v-else>
					<option>1</option>
				</select>
			</div>
			<div class="price-area">
				<span 
				class="true-price"
				>
					￥ {{ model.ModelOriginPrice}}	
				</span>
			</div>
			<div class="add-to-cart-area">
				<button v-if='relatedItem[0].itemNumber' class="add-to-cart-btn" @click='addCart(relatedItem[0].itemStandard)'>放入购物车 > </button>
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
		<img :src='"static/img/goods/"+ model.ModelDetailImg'> 		
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

 	<!-- 打分组件 -->
   <madol-box v-if="showCommentBox" @close-modal-box='showCommentBox = false'>
     <div slot='content' class="main-content">
     	<div class="comment-left" >
     		<h3> {{ model.ModelChName }} </h3>
     		<img :src='"static/img/goods/"+relatedItem[0].itemImg'>
     	</div>
     	<div class="comment-right">
     		<div>
     			<h3>发表评论</h3>
     			<div>
					
     			</div>
     		  </div>
     		<div v-if='showComemt'>
     			<h3>详细评论</h3>
     			<span>评论：</span>
     			<textarea v-model='commentContent'></textarea>
     			<button @click='addComment()'>提交</button>
     		</div>
			<div v-if='showAddpic' class="addPic">
				<span>上传图片：</span>
				<input type="file" name="" @change='getFile' >
				<input type="file" name="" @change='getFile'>
				<input type="file" name="" @change='getFile'>
				<img src=path>
				<button @click='uploadImg()'>提交</button>
			</div>

     		<div v-if='showThanks'>
     			感谢您的评论
     		</div>
     		
     	</div>
     </div>
   </madol-box>
    
  </div>
</template>

<script>
import axios from 'axios'
import MadolBox from './../components/ModalBox.vue'
import NavBread from './../components/NavBread.vue'
export default {

  name: 'itemdetail',

  data () {
    return {
    	path:'',
    	showCommentBox:false,
    	showAddpic: true,
    	commentContent:'',
    	files:'',
    	isAnonymous:false,
    	modelCode: '1001',
    	showComemt:true,
    	showThanks:false,
    	value:'米色50g常规版',
    	selectValue:'',
    	currentStandard:0,
    	buyAmount:1,
    	showDes: true,
    	showUse: false,
    	showCom: false,
    	model:{
    		"ModeCode" : 1001,
		    "ModelChName" : "毛孔柔焦CC泡沫隔离液 SPF30 PA+++",
		    "ModelEngName" : "UVUB PORERASER CC",
		    "ModelOriginPrice" : 390,
		    "ModelDescripition" : "hhhahah",
		    "ModelComposition" : "hhhhhhhh",
		    "ModelUsage" : "hhhhhhhh",
		    "ModelCoverImg" : "skin-face-base-cover-001.jpg",
		    "ModelDetailImg" : "item-10000001-detail.jpg",
		    "ModeRate" : 5,
		    "ModelComment" : [],
		    "item" : [ 
		        {
		            "itemStandard" : "米色50g常规版",
		            "itemNumber" : 3,
		            "itemImg" : "1.jpg"
		        }, 
		        {
		            "itemStandard" : "深色色50g常规版",
		            "itemNumber" : 0,
		            "itemImg" : "2.jpg"
		        }
		    ],
		    "departmentCode" : "skincare",
		    "subDepartmentCode" : "face",
		    "familyCode" : "base"
    	},
    	productCommentNum:15,
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
  	NavBread,
  	MadolBox
  },
  computed:{
  		relatedItem(){
  			var that = this;
  			return this.model.item.filter((item)=>{
  				return item.itemStandard == that.value;
  			})

  		}
  },
  methods:{
  	test(item){
  		// this.$router.push({path:'/index',query:{'status':1,'email':1001}})
  		console.log(this.value);
  		console.log(item);

  	},

  	//打开评论
  	openCommentBox(){
  		this.showComemtBox = true;
  	},

  	showIndex(index){
  		alert(index);
  	},

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
  	},

  	//获取商品详情的方法
  	getModelDetail(){
  		var parma = {modelCode:this.$route.query.modelCode}
  		console.log(this.$route.query.modelCode);
  		axios.get('/goods/itemDetail',{params: parma}).then((response)=>{
  			var res =response.data;
  			if(res.status == '0'){
  				this.model = res.reslut;
  			}
  		})
  	},

  	addCart(){
  		//这里要传入三个参数 一个商品的数量 一个商品的id 还有商品的规格
  		axios.post('/goods/addCart',{modelCode:1001,itemStandard:'450ml常规版',itemNumber:2}).then((response)=>{
  			var res = response.data;
  			if(res.status == '0'){
  				console.log(res.msg);
  			}else{
  				console.log(res.msg);
  			}
  		})
  	},

  	getId(){
  		console.log(this.$route.params.id1);
  		
  	},

  	//提交评论方法
  	addComment(){
  		//如果输入内容为空
  		if(!this.commentContent){
  			console.log('您输入内容为空，请输入内容！')
  		}
  		//输入内容不为空
  		else{
	  			axios.post('/goods/addComment',{
	  			//用户评论内容
	  			commentContent: this.commentContent,
	  			//商品款式
	  			modelCode: this.modelCode,
	  			//商品ModeCode
	  			//是否匿名
	  			isAnonymous: this.isAnonymous
	  			})
	  			.then((response)=>{
	  			var res = response.data
	  			if(res.status == '0'){
	  				this.showThanks = true;
	  				this.showComemt = false;
	  				console.log(res.msg);
	  			}else{
	  				console.log(res.msg);
	  			}
	  		})
  		}
  	},

  	getFile(e){
  		this.files = e.target.files[0];
  		console.log(e.target);
  		console.log(this.files);
  	},

  	uploadImg(){
  		// event.preventDefault();
        var formData = new FormData()
        formData.append("file", this.files)
        
        var config = {
              headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        
        axios.post('/goods/uploadImg',formData,config).then((response)=>{
        	var res = response.data;
        	if(res.status == '0'){
        		console.log(res.msg);
        		this.path = res.result
        		console.log(res.result);
        	}
        })

  	}



 	

  },
  created:function(){
   // this.getModelDetail();
  },
  

}
</script>


<style scoped>
	.main-content{
		height: 562px;
		width: 962px;
	}

	.comment-left{
		float: left;
		width: 240px;
	}

	.comment-right{
		float: left;
		width: 560px;
	}

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

	.addPic>input{
		width: 98px;
		height: 98px;
		display: inline-block;
		opacity: .3;
		border: 1px solid #ccc;
		cursor: pointer;
	}
	



</style>
