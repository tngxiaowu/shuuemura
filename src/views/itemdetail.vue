<template>
  <div class="itemdetail-view">
  	<!-- <button @click='getHistoryMode()'>看一看</button> -->
	<nav-bread>
		<li slot='family'>
			<router-link :to='model.subDepartmentCode+"/"+model.familyCode'> {{ model.familyName }} </router-link>
		</li>
		<li slot='productChineseName'> {{ model.ModelChName }} </li>
	</nav-bread>
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
					 <span :class='{"checked":this.rateScore == 1}'>★</span>
					 <span :class='{"checked":this.rateScore == 2}'>★</span>
					 <span :class='{"checked":this.rateScore == 3}'>★</span>
					 <span :class='{"checked":this.rateScore == 4}'>★</span>
					 <span :class='{"checked":this.rateScore == 5}'>★</span>
				</div>
				<div class='read-and-write small-font-size'>
					<span>阅读
						<a @click='scrollToComment'>
							{{ model.ModelComment.length }}	
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
				<select v-model='selectStandard'>
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
		<img :src="'/static/img/goods/'+model.ModelDetailImg"> 		
 	</div>

	<!-- 评论部分 -->
 	<div class="item-productComment clearfix" id="comment">
 		<h2>产品评论</h2>
 		<div class="normal-btn-spe">
 			<button class="normal-btn">书写评论</button>		
 		</div>
 		<div class="productComment-area">
 			<ul>
 				<li v-for='(item,index) in model.ModelComment' 
 				class="productComment-area-style clearfix"
				v-if='index>=(pageStart-1)*pageSize&index<(pageStart)*pageSize'
 				>
 					<div class="productComment-area-left">
 						<div class="rate">
 							<span v-if='item.rate>=1' style='color:gold'>★</span>
					 		<span v-if='item.rate>=2' style='color:gold'>★</span>
					 		<span v-if='item.rate>=3' style='color:gold'>★</span>
					 		<span v-if='item.rate>=4' style='color:gold'>★</span>
					 		<span v-if='item.rate>=5' style='color:gold'>★</span>
 						</div>
 						<div>
 							<span v-if='!item.isAnonymous'>
 								用户UID：{{ item.userID }}
 							</span>
 							<span v-else>
 								匿名用户
 							</span>
 						</div>
 						<span> {{ item.date }} </span>
 					</div>
 					<div class="productComment-area-right">
 						<div class="productComment" 	>
 							{{ item.comment }}
 						</div>

 						<div class="commentUseful">
 							这条评论对您有用么？<span>是</span><span>否</span>
 						</div>
 						
 					</div>
 				</li>
 			</ul>
 		</div>
 		<div class="page-size">
 			<ul class="clearfix">
 				<li v-for='(item,index) in pageNumber' 
 				@click='pageStart = index+1'
				:class='{"selected": currentIndex == index}'
 				>
 					<a>
 					{{ item }} 		
 					</a>
 				</li>
 			</ul>
 		</div>
 	</div>

 	<!-- 建议搭配使用部分
 	<!-- <div class="item-mix">
 		<h2>建议搭配使用</h2>
 		<p>待做</p>
 	</div> --> 

 	<!-- 浏览历史使用部分 -->
 	<div class="item-history">
 		<h2>浏览过的产品</h2>
 		<ul class="clearfix">
 		 	<li v-for='item in historyItemModel' class="clearfix">
 				<div>
 				</div>
 				<div class="name">{{ item.ModelChName }}</div>	
 				<div>
					<span class="price"> ￥ {{ item.ModelOriginPrice }}</span>		
 				</div>
 				
				<button class="wacth">查看</button>
				<button class="immate-buy">立即购买</button>
 			</li>
 		</ul>
 	</div>

 	
   <!-- 打分组件 -->
   <madol-box v-if="showCommentBox" @close-modal-box='closeModalBox'>
  
     <div slot='content' class="main-content">
     	<div class="comment-left" >
     		<h3> {{ model.ModelChName }} </h3>
     		<!-- <img :src='"static/img/goods/"+relatedItem[0].itemImg'> -->
     	</div>
     	<div class="comment-right">
     		<div>
				<div>
					<h3>发表评论</h3>	
				</div>
     			
     			<div class="star-area">
     				<div class="star-left">
     					<span>*总体评价</span>
     				</div>
					
					<div class="star-right">
						<star @addStar='starComment' :isRated='isRated' ></star>	
					</div>
					
     			</div>
     		 </div>
     		<div v-if='showComemt' class="clearfix">
     			<h3>详细评论</h3>
     			<div class="star-left">
     			<span>评论：</span>
     			</div>
     			<div class="star-left">
     			<span class="comment-notice">请在下方留下您的评论（您还可输入500个字符）</span>
     			<textarea v-model='commentContent'></textarea>
          <em class="over-length-warn" v-if='showOverWords'>输入字数不能超过500字</em>
     			</div>
     			<!-- <button @click='addComment()'>提交</button> -->
     		</div>
			<div v-if='showAddpic' class="addPic" >
				<div class="star-left">
					<span>上传图片：</span>
				</div>
					<input type="file" name="" @change='getFile($event,1)' >
					<span @click='deleteImg(1)'> x </span>
					<input type="file" name="" @change='getFile($event,2)'>
					<span @click='deleteImg(2)'> x </span>
					<input type="file" name="" @change='getFile($event,3)'>
					<span @click='deleteImg(3)'> x </span>
					<img :src="dataUrl1" class="privew-img privew-img-1" v-if='dataUrl1'>
					<img :src="dataUrl2" class="privew-img privew-img-2" v-if='dataUrl2'>
					<img :src="dataUrl3" class="privew-img privew-img-3" v-if='dataUrl3'>
				</div>
			<div class="submit" >
				<button @click='submit()'>提交</button>
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
import Star from './../components/Star.vue'

export default {
  name: 'itemdetail',
  data () {
    return {
    	path:'',
    	rate:'',
    	showCommentBox:false,
    	showAddpic: true,
    	commentContent:'',
    	inv:'',
    	historyItem:[],
    	historyItemModel:[],
    	pageNumber:'',
    	pageSize:5,
    	pageStart:1,
    	currentIndex:0,
    	//图片预览的地址
      showOverWords:false,
    	isRated:false,
    	dataUrl:'',
    	dataUrl1:'',
    	dataUrl2:'',
    	dataUrl3:'',
    	pic1:'',
    	pic2:'',
    	pic3:'',
    	isAnonymous:false,
    	modelCode: '1001',
    	showComemt:true,
    	showThanks:false,
    	selectStandard:'',
    	selectValue:'',
    	currentStandard:0,
    	buyAmount:1,
    	showDes: true,
    	showUse: false,
    	showCom: false,
    	model:{},
    }
  },
  components:{
  	NavBread,
  	MadolBox,
  	Star
  },
  computed:{
  		relatedItem(){
  			var that = this;
  			return this.model.item.filter((item)=>{
  				return item.itemStandard == that.value;
  			})
  		},
  		rateScore(){
  			var rateScore = 0;
  			this.model.ModelComment.forEach((item)=>{
  			rateScore += item.rate;
  			})
  			return Math.floor((rateScore)/this.model.ModelComment.length)
  		},
  		cartCount(){
      		return this.$store.state.cartCount;  
    	}
  },
  methods:{
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

  	starComment(data){
  		this.rate = data;
  	},

  	//获取商品详情的方法
  	getModelDetail(){
  		var parma = {modelCode:this.$route.query.modelCode}
  		console.log(this.$route.query.modelCode);
  		axios.get('/goods/itemDetail',{params: parma}).then((response)=>{
  			var res =response.data;
  			if(res.status == '0'){
  				this.model = res.result;
  				this.value = this.model.item[0].itemStandard;
  				console.log('开始发送cookie')
  				this.sendItemCookie();
  				console.log(this.historyItem);
  				this.selectStandard = res.result.item[0].itemStandard;
          this.$store.commit('updateCartCount',res.cartCount)
  			}
  		})
  	},

  	//添加到购物车
  	addCart(){
  		//这里要传入三个参数 一个商品的数量 一个商品的id 还有商品的规格
  		axios.post('/goods/addCart',{
  			modelCode:this.$route.query.modelCode,
  			itemStandard:this.selectStandard,
  			itemNumber:this.buyAmount})
  			.then((response)=>{
  				var res = response.data;
  					if(res.status == '0'){
  					console.log(res.msg);
  					this.$store.commit('updateCartCount',res.cartCount)
  				}
  				else{
  					console.log(res.msg);
  			}
  		})
  	},

  	//提交评论
  	addComment(){
  		//如果输入内容为空
  			if(this.commentContent.length >500){
  				this.showOverWords = true;
  			}else{
  				axios.post('/goods/addComment',{
	  			//用户评论内容
	  			commentContent: this.commentContent,
	  			//商品款式
	  			modelCode: this.modelCode,
	  			//商品ModeCode
	  			//是否匿名
	  			isAnonymous: this.isAnonymous,
	  			//评论星级
	  			rate: this.rate,
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

  	//得到上传图片
  	getFile(e,index){
  		switch(index){
  			case 1:
  			this.pic1 = e.target.files[0]
  			this.imgPreview(this.pic1,1)
  			break;
  			case 2:
  			this.pic2 = e.target.files[0]
  			this.imgPreview(this.pic2,2)
  			break;
  			case 3:
  			this.pic3 = e.target.files[0]
  			this.imgPreview(this.pic3,3)
  			break;
  		}
  
  		
  	},

  	//图片预览
  	imgPreview(file,index){
  		let self = this;
  		//检查是否支持FileReader
  		if(!file || !window.FileReader){
  			return;
  		}

  		if(/^image/.test(file.type)){
  			var reader = new FileReader;
  			reader.readAsDataURL(file);
  			reader.onloadend = function(){
  				 switch(index){
		  			case 1:
		  			self.dataUrl1 = this.result;
		  			break;
		  			case 2:
		  			self.dataUrl2 = this.result;
		  			break;
		  			case 3:
		  			self.dataUrl3 = this.result;
		  			break;
  				}
  			}

  		}
  	},

  	//删除图片
  	deleteImg(index){
  		switch(index){
		  	case 1:
		  	this.dataUrl1 = '';
		  	break;
		  	case 2:
		  	this.dataUrl2 = '';
		  	break;
		  	case 3:
		  	this.dataUrl3 = '';
		  	break;
  			}
  	},

  	//上传图片
  	uploadImg(){
  		// event.preventDefault();
        var formData = new FormData()
        formData.append("file", this.pic1)
        formData.append("file", this.pic2)
        formData.append("file", this.pic3)
        var config = {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        //如果3张图片不全为空，那么就会发起这个请求
        if(this.pic1||this.pic2||this.pic3){
        	axios.post('/goods/uploadImg',formData,config).then((response)=>{
        	var res = response.data;
        	if(res.status == '0'){
        		console.log(res.msg);
        		this.path = res.result
        		console.log(res.result);
        	}
        })
    	}
    	else{
    	console.log('没有上传任何图片(from上传图片组件)')
  		}
  	},

  	//提交评论
  	submit(){
  		if(!this.rate){
  			this.isRated = true;
  		}else{
  			this.addComment();
  		}

  	},
  	
  	//关闭模态框
  	closeModalBox(){
  		  this.showCommentBox = false 
  		  //关闭模态框数据清空
  		  this.dataUrl1 = ''
  		  this.dataUrl2 = ''
  		  this.dataUrl3 = ''
  		  this.commentContent = ''
  		  this.rate = ''
  	},

  	//设定滚动条事件
  	scrollToComment(){
  		document.getElementById("comment").scrollIntoView();
  	},

  	//发送商品请求到服务器
  	sendItemCookie(){
		var modelCode = this.$route.query.modelCode;
		console.log(modelCode);
		if(!modelCode){
			console.log('请打开正确的商品详情页')
		}else{
			axios.get('/goods/browseHistory',{params:{modelCode:modelCode}})
			.then((response)=>{
			var res = response.data;
			var itemCookie = document.cookie;
				itemCookie = itemCookie.split(';');
				var newArray = [];
				var newArray2 = [];
				var newArray3 = [];
				itemCookie.forEach((item)=>{
					console.log('haha');
					newArray.push(item.split('='));
				})
				newArray.forEach((item)=>{
					if(item[0]==" itemCookie"){
						newArray3 = item[1].split('-').reverse();
					}
				})
				console.log(newArray3);
				this.historyItem = newArray3;
			if(res.status == '0'){
				console.log('添加成功');
			}else{
				this.getHistoryMode();
  				this.countPageNumber();
			}
			})  		
		}
  	},

  	//根据页数来传创建一个纯数组 作为分页
  	creatArray(n){
  		var newArray = [];
  		for(var i=0; i < n; i++){
  			newArray.push(i);
  		}
  		this.pageNumber = newArray;
  	},	

  	//计算加载页数
  	countPageNumber(){
  		var pageNumber = parseInt(Math.ceil(this.model.ModelComment.length/this.pageSize))
  		console.log('页数是',pageNumber);
  		this.creatArray(pageNumber);
  	},

  	//请求历史浏览商品
  	getHistoryMode(){
  		if(this.historyItem<=1){
  			console.log('不存在浏览记录')
  		}else{
  			
  		//请求的数据
  		var realLength =(this.historyItem.filter((item)=>{
  				return item != undefined
  			})).length;
  		
  		var parma = {}
  		for(var i=1; i<realLength; i++){
  				parma['item'+i] = this.historyItem[i]
  			}
  			console.log('现在的parms是',parma);
  		
  		if(realLength <= 1){
  			console.log('没有发送')
  		}else{
  			axios.get('/goods/getHistoryMode',{params:parma}).
  			then((response)=>{
  				var res = response.data;
  				if(res.status == '0'){
  					this.historyItemModel = res.result;
  				}
  			})
  		}	
  	}	
  },

      //检查cookie是否登录
      checkLogin(){

      }

	},
	//钩子函数
  	mounted:function(){
  		this.getModelDetail();
  		this.getHistoryMode();
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

	textarea{
		width: 330px;
		height: 90px;
		border: 1px solid #ccc;
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

	.productComment-area>ul{
		padding: 0px;
	}
	.productComment-area-style{
		padding-bottom: 20px;
		border-bottom: 1px solid #999;
		padding-top: 30px;
		font-size: 14px;
		width: 890px;
	}


	.productComment-area-left{
		width: 140px;
		float: left;
		text-align: center;
		padding: 0px 20px;
	}

	.productComment-area-left>div{
		padding-bottom: 8px;
	}

	.productComment-area-right{
		width: 690px;
		float: left;
		padding-left: 20px;
		color: #666;
	}
	
	.productComment{


	}

	.commentUseful{
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.commentUseful>span{
		display: inline-block;
		margin-right: 5px;
	}

	.addPic>input{
		width: 98px;
		height: 98px;
		display: inline-block;
		opacity: .3;
		border: 1px solid #ccc;
		cursor: pointer;
		opacity: 0;
	}



	.privew-img{
		width: 98px;
		height: 98px;
	}

	.star-area{
		width: 560px;
		height: 52px;
	}
	

	.star-left{
		float: left;
		font-size: 14px;
		width: 176px;
	}

	.star-right{
		float: left;
	}

	.comment-notice{
		font-size: 12px;
		display: inline-block;
		width: 400px;
	}

	.addPic img{
		position: absolute;
	}

	.addPic .privew-img-1{
		left: 325px;
	}

	.addPic .privew-img-2{
		left: 445px;

	}

	.addPic .privew-img-3{
		left: 562px;
	}

	.star-bar>span{
		color: gold;
	}

	.star-bar>.checked~span{
		color: #666;
	}

	.page-size ul{
		text-align: center;
		padding-left: 0px;
		width: 100px;
		margin: 0 auto;
	}

	.page-size ul li{
		float: left;
		display: inline-block;
		margin-left: 10px;
	}

	.normal-btn {
	  background-color: red;
	  border: none;
	  width: 93px;
	  height: 24px;
	  line-height: 12px;
	  font-size: 12px;
	  color: #ffffff;
	  background-color: black;
	}

	.item-history ul{
		text-align: center;
		padding-left: 0px;
	}

	.item-history ul li{
		float: left;
		width: 220px;
	}

	.item-history ul li button{
		border: none;
		display: inline-block;
		margin-top: 10px;
		margin-right: 10px;
		color: white;
	}

	.item-history ul li .wacth{
		background-color: #666666;
	}


	.item-history ul li .immate-buy{
		background-color: red;
		opacity: .6;
	}

	.item-history .name{
		font-size: 14px;
		width: 200px;
		height: 45px;
	}

	.item-history .price{
		font-size: 14px;
	}

  .over-length-warn{
    color: red;
  }

	



</style>
