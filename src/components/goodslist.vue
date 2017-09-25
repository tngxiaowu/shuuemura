<template>
  <div id="details">
   	<div class="details-name" >
	   	<div v-for="(item,index1) in list">
	   		<h6>{{item.type}}</h6>
	   		<ul class="first">
	   			<li  v-for="(type,index2) in item.typeo"  @click="change(index1,index2)"><router-link :to="{path:'/goodList',params:{familyCode:item.router}}">{{type.name}}</router-link>
					<ul v-show="type.num">
						<li  v-for="itmes in type.main"><router-link to="/">{{itmes.name}}</router-link></li>
					</ul>
	   			</li>
	   		</ul>
	   	</div>
   	</div>


   	<div class="details-img">
   		<div class="image">
   			<img src="../../static/images/xiangqing.jpg" alt="">
   		</div>
   		<div class="list">
   			<ul>
   				<li class="list-item"  v-for="item in productList" :style="{color:color[0]}">
   					<div class="new" v-show="item.new"><img src="../../static/images/ICN_New_BG.png" height="46" width="62" alt=""></div>
   					<div class="list-left">
   						<img :src="`../../static/images/${item.ModelCoverImg}`" alt="">
   					</div>
   					<div class="list-right" >
   						<p>{{item.ModelChName}}</p>
   						<p class="price">￥{{item.ModelOriginPrice}}</p>
   						<!-- <div>{{item.ModeRate}}</div> -->
						<router-link to="/"><img src="../../static/images/BTN_VwDtls.gif" alt=""></router-link>
						<router-link to="/"><img src="../../static/images/BTN_QckShp.png" alt=""></router-link>
   					</div>
   				</li>
   			</ul>
   		</div>
   	</div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'app',
  data(){
  	return {
  		list:null,
  		productList:null,
  		color:["#000"]
  	}
  },
  methods:{ 
  	change(index1,index2){
  		// this.list.forEach(function(item,index){
  		// 		// console.log(item);

  		// 	item.typeo.forEach(function(items,indexs){
  		// 		// console.log(items);
  		// 	})
  		// })
  		this.list[index1].typeo[index2].num=!this.list[index1].typeo[index2].num;
  		var parameter=this.list[index1].router;
  		this.getgoods(parameter);
  	},
  	getList(){
  		axios.get("/family").then((response)=>{
  			var res =  response.data;
  			if(res.status == "0"){
  				this.list=res.result[0].list;
  			}
  		});
  	},
  	getgoods(parameter){
  		axios.get(`/goods?subDepartmentCode=${parameter}`).then((response)=>{
  			var res=response.data;
  			if(res.status=="0"){
  				this.productList=res.msg;
  			}
  		});
  	}
  },
  created:function(){
  	this.getgoods("face");
  	this.getList();
  	console.log(Boolean(-1));
  }
}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#details{
		width: 951px;
		margin: 0 auto;
		height: auto;
	}
	#details:after{
		display: block;
		clear: both;
	}
	.details-name{
		width: 190px;
		float: left;
		/*border-right: 1px solid #000;*/
		height: 100%;
	}
	.details-img{
		width: 760.8px;
		float: right;
	}
	h6{
		font-size: 14px;
		margin: 10px 0px;
	}
	ul{
		list-style: none;
	}

	.first>li{
		font-weight: lighter;

	}
	.first>li>a:hover{
		background-color: #ccc;
	}
	a{
		text-decoration:none;
		font-size: 8px;
		color: #000;
		padding: 0 10px;
		display: block;
		padding-left: 20px;
	}
	li ul li a{
		color: #ccc;
		margin-left: 20px;
	}
	li ul li a:hover{
		color: #000;
	}
	/*.list{
		display: flex;
	}*/
	.list:after{
		display: block;
		content: " ";
		clear: both;
	}
	.list ul{
		width: 100%;
		/*display: flex;*/
	}
	.list li{
		width: 248px;
		padding:20px 0px;
		float: left;
		border: 1px solid #000;
		margin: 2px;
		height: 200px;
	}
	.list a{
		padding: 0;
	}
	.list-right{
		width: 50%;
		float: right;
		padding-left: 10px;
	}
	.list-right p{
		margin:10px 0px;
		font-size: 12px;
	}
	.price{
		font-size: 14px !important;
		font-weight: bolder;
	}
	.list-left{
		width: 50%;
		float: left;
		padding-left: 20px;
	}
	.image{
		height: 337px;
		border-bottom: 1px solid #000;
		border-left: 1px solid #000;
		background:url("../../static/images/xiangqing.jpg") no-repeat center;
	}
	.list-item{
		position: relative;
	}
	.new{
		position: absolute;
		top: -1px;
		left: -1px;
	}

</style>
