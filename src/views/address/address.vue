<template>
<div class="shopcar">
	<!-- header -->
   	<div class="header">
		<div class="headwrap">
			<div class="logo">
				<a href="">shu uemura</a>
			</div>
			<a href="" class="shopcart">
				<span>我的购物车</span>
			</a>
		</div>
   	</div>
   	<!-- content -->
   	<div id="content" class='clearfix'>
		<div class="steps_nav">
			<ul class='steps png'>
				<li class='step1'>
					<span></span>
				</li>
				<li class='step2'>
					<a href=""><span></span></a>
				</li>
				<li class='step3'>
					<span></span>
				</li>
			</ul>
		</div>
		<div class="core">
			<div class="viewhead">
				<div class="ptitle ptitle_cart">
					<h1>支付方式及送货信息</h1>
				</div>	
			</div>
			<div class="mainContent">
				<table class="productList">
					<tr class="list" v-for="(item,index) in list">
					</tr>
				</table>
			</div>
			<div class="totalwrap">
				<div class="info_box">
					<div class="form transport">
						<div>
							<div class="thead">
								<div class="tpay">送货信息</div>
							</div>
							<div class="radioGroup">
								<table>
									<tbody>
										<tr v-for='(item,index) in addressList'>
											<td><input type="radio" name="addresslist" v-model='checkedAddress'
											:value='item.addressId'
												></td>
											<td> {{ item.addressShortcut }} </td>
											<td> {{ item.addressee }} </td>
											<td> {{ item.province }} </td>
											<td> {{ item.city }} </td>
											<td> {{ item.detailAddress }} </td>
											<td> {{ item.postCode }} </td>
											<td> {{ item.telPhone }} </td>
											<td> <span @click='editAddress(item.addressId)'>修改</span> </td>
											<td> <span @click='openModalBox(index)'>删除</span> </td>
										</tr>
									</tbody>
								</table>
								<address-add @add-adress-suc='closeAddressAdd'   v-if='showAddressAdd'></address-add>
								<address-edit @edit-address-suc='closeAddressEdit' v-if='showAddressEdit' :AddressId='checkedAddress'></address-edit>
								
								<button @click='addNewAddress()' v-if='showAddBtn'>添加新的地址</button>
							</div>
						</div>
					</div>

					<div class="form transport">
						<div>
							<div class="thead">
								<div class="tpay">发票信息</div>
							</div>
							<div class="chooseBillAddress">
								<span class="billrecepit">
									<input type="radio" name="transport" class='radiobox' value='1' checked="checked">
									<label for="">不需要发票</label>
								</span>
								<span>
									<input type="radio" name="transport" class='radiobox' value='2'>
									<label for="">需要发票(寄送至送货地址)</label>
								</span>
								<span>
									<input type="radio" name="transport" class='radiobox' value='2'>
									<label for="">需要发票(寄送至新地址)</label>
								</span>
							</div>
						</div>
					</div>

					<div class="form transport">
						<div>
							<div class="thead">
								<div class="tpay">支付方式</div>
							</div>
							<div class="chooseBillAddress">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="fl">
				
				
				
				<div class="submits">
					<div class="continue">
						<a href="shopCart" class="goBack" >返回上一步</a>
					</div>
					<div class="sample_part">
						<a class='btn2_complete' @click='createOrderList()'> 确认购买 </a>
					</div>
				</div>
			</div>
		

			<div class="aside">
				<div class="asidebox asidebottom">
					<div class="shophelp">
						<div class="ptitle ptitle_help">
							<h2>购物帮助指南</h2>
						</div>
						<div class="item service_help">
							<p>
								<a href="" class='icon_online_idle' title="如果你有任何技术问题或美容问题。请点击这里咨询我们的美容顾问。我们的服务时间是从9点到21点。"></a>
							</p>
							<p>
								<span class="icon icon_tel" title="如果你有任何技术问题或美容问题。请拨打美丽热线咨询我们的美容顾问。我们的服务时间是从9点到21点。"></span>
							</p>
						</div>
						<div class="item service_payment">
							<div class="ptitle ptitle_pay">
								<h3>支付安全保障</h3>
							</div>
							<p class='info'>安全支付系统采用SSL加密。</p>
							<div class="info_img">
								<p class="ptitle1 yinlian"></p>
								<p class="ptitle1 caifutong"></p>
								<p class="ptitle1 zhifubao"></p>
							</div>
						</div>
						<div class="item service_delivery">
							<div class="ptitle ptitle_delivery">
								<h3>全国配送</h3>
							</div>
							<p class="icon icon_express" title="送货承诺：若您没有收到订单货品，货款将退入您当时支付的在线支付账户中。"></p>
							<p class='icon icon_time'></p>
						</div>
					</div>
				</div>
			</div>
		</div>
   	</div>
   	<!-- footer -->
   	<div class="footer">
		<div class="footerlinks">
			<div class="links-l">
				<ul>
					<li><span>© shu uemura 2017</span></li>
					<li><span>关于植村秀</span></li>
					<li><span>植村秀国际网站</span></li>
					<li><span>帮助中心</span></li>
					<li><span>条款协议</span></li>
					<li><span>网站地图</span></li>
					<li><span>沪ICP备06001333号-1</span></li>
				</ul>
			</div>
			<div class="links-r">
				<ul>
					<li class='link_weibo'><a href=""></a></li>
					<li>
						<div class="subscription">
							<input type="text" class="txt" placeholder="请输入您的电子邮箱" name="subscription_email">
							<input type="text" class="submit" value="订阅">
						</div>
					</li>
				</ul>
			</div>
		</div>
   	</div>

   	<!-- 删除模态框 -->
	<modal v-if="showDeleetBox" @close="changeModal">
		<div slot="main" class="change">
			<p>确认是否删除？</p>
			<button @click = 'deleteAddress()'>确定</button><button @click='showDeleetBox=false' >取消</button>
		</div>
	</modal>
</div>
</template>

<script>
import axios from "axios"
import modal from "./modal"
import AddressEdit from './addressEdit.vue'
import AddressAdd from './addressAdd.vue'
	export default {
	  	name: 'shopcar',
	  	components:{
	  		modal
	  	},
	  	computed:{
	  	},
		data(){
			return{
				addressList:[],
				showDeleetBox:false,
				currentAddress:'',
				checkedAddress:'',
				itemValue:null,
				defaultNumber:null,
				defaultStandard:null,
				showchange:false,
				showAddBtn: true,
				showAddressEdit:false,
				showAddressAdd:false,				
				itemone:null,
				showmodal:false,	
				totalPrice:[],
				list:null,
				commodityListsId:null,
				freight:0,
				discount:0,
				shopbtn:true,
				options:[{value:1},{value:2},{value:3},{value:4},{value:5}],
				item:{}
			}
		},

		methods:{
			changeModal(){
				this.showDeleetBox = false;
			},
			saveModal(id){
				var Standard=this.defaultStandard;
				var num=this.defaultNumber;
				axios.get('/save',{
						params:{
								id:id,
								itemStandard:Standard,
								itemNumber:num
							}
						}).then((response)=>{
						    var res=response.data;
							if(res.status=="0"){
								console.log(res.msg)
							}
						})
			
			},
			dele(id){
                var user = this.getCookie("userID");
				axios.get("/delete",{
					params:{
						index:id,
						userID:user
					}
				}).then((response)=>{
				    var res=response.data;
					if(res.status=="0"){
						console.log(res.msg)
					}
				})
			},
			getCartList(){
				var _this=this;
                var userID = this.getCookie("userID");
                console.log(userID);
				axios.post('/users/getCartList',{userID: userID}).then((response)=>{
					var res=response.data;
					if(res.status="0"){
						console.log(res.msg);
						this.list = res.result;

						// _this.list=res.msg[0];
						this.getshopId();
					}
				})
			},
			getshopId(){
		  		var commoditylist=[];
  				var total;
  				var _this=this;
  				this.list.forEach(function(item,index){
  					_this.totalPrice.push(item.price*item.itemNumber)
  					if(commoditylist.indexOf(item)==-1){
  						commoditylist.push(item.ModeCode);
  					}
  					_this.commodityListsId=commoditylist;
  					total=parseFloat(item.price)*parseFloat(item.itemNumber);
  					_this.Total+=total;
  				})
  			},
			modal(id){
				this.item=this.list[id];
				this.item.index=id;
				this.showmodal=true;
			},
			
			changeNumber(index,price,num){
				this.totalPrice[index]=price*num;
				var total=0;
				this.totalPrice.forEach((item,index)=>{
					total+=parseFloat(item);
				})
				this.Total=total;
			},

			setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + cvalue + "; " + expires);
                document.cookie = cname + "=" + cvalue + "; " + expires;
                console.info(document.cookie);
            },
            //获取cookie
            getCookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },
            //清除cookie
            clearCookie: function () {
                this.setCookie("userID", "1", -1);

            },

            closeAddressEdit(data){
            	this.showAddBtn = true;
            	this.showAddressEdit = false;
     			this.getAddressList();
            },

            closeAddressAdd(){
            	this.showAddBtn = true;
            	this.showAddressAdd = false;
            	this.getAddressList();
            },

            getAddressList(){
            	axios.post('/users/getAddressList').then((response)=>{
            		var res = response.data;
            		if(res.status == '0'){
            			this.addressList = res.result.adressList;
            			//设置默认状态
            			
            		}
            	})
            },
            openModalBox(id){
            	this.showDeleetBox = true;
            	this.currentAddress = id;
            
            },
            deleteAddress(){
            	axios.post('/users/deleteAddress',{index: this.currentAddress}).then((response)=>{
            		var res = response.data;
            		if(res.status == '0'){
            			this.showDeleetBox = false;
            			this.getAddressList();

            		}
            	})
            },

            editAddress(id){
            	this.showAddressAdd = true;
            	this.showAddressAdd = false;
            	this.checkedAddress = id;
            	this.showAddBtn = false;
            	this.showAddressEdit = true;
            	this.getAddressList();

            },

            addNewAddress(){
            	this.showAddBtn = false;
            	this.showAddressAdd = true;
            	this.getAddressList();

            },

            //创建订单
            createOrderList(){
            	axios.post('/users/createOrderList',{
            		addressId: this.checkedAddress

            	})
            	.then((response)=>{
            		var res = response.data;
            		if(res.status == '0')
            		{
            			console.log('订单创建成功')
            		}
            	})
            }
		},	
		created(){
			
		},
		mounted(){
			this.getAddressList();
			// this.checkedAddress = this.addressList[0].addressId;


		},
		components:{
			AddressEdit,
			AddressAdd,
			modal
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body{
		padding:0;
		margin: 0;
	}
	a {
		text-decoration: none;
		color: white;
		cursor: pointer;
	}
	.modal{
		width: 400px;
	}
	.modal .title{
		font-size: 16px;
	}
	.modal>div>div{
		font-size: 10px;
	}
	.modal .msg p{
		padding: 0;
		margin: 0;
	}
	.modal .msg span{
		color: #ccc;
	}
	.modal .bgimg{
		width: 40px;
		float: left;
		padding-right: 10px;
	}
	.modal img{
		width: 8px;
	}
	.modal .btn{
		padding-top: 20px;
		float: right;
	}
	.modal .btn span{
		display: inline-block;
		text-align: center;
		width: 54px;
		height: 24px;
		line-height: 24px;
		background-color: #000;
		color: #fff;
		cursor: pointer;
		margin-left: 10px;
	}
	.modal .btn .close{
		background-color: #7C7C7C ;
	}
	.shopcar {
		background: #000000;
	}
	.change{
		width: 486px;
	}
	.item-img{
		width: 40%;
		float: left;
	}
	.item-img .more{
		width: 82px;
		height: 24px;
		background-color: #7c7c7c;
		text-align: center;
		line-height: 24px;
		font-size: 12px;
		color: #fff;
		display: block;
		margin-left: 40px;

	}
	.item-img .more:hover{
		background-color: #ccc;
	}
	.item-img img{
		width: 160px;
		margin: 0 auto;
	}
	.text{
		float: right;
		width: 60%;
	}
	.select-modal{
		float: right;
	}
	.save-change-modal{
		cursor: pointer;;
		width: 94px;
		height: 24px;
		float: right;
		background: url("./../../../static/img/shopcar/shu_step1_sprite.png") no-repeat 0px -1200px;
	}
	.save-change-modal:hover{
		background-position: 0 -1105px;
	}
	.modal-option>div{
		margin-top: 20px;
	}
	.modal-option div:last-of-type{
		margin-bottom: 20px;
	}
	.color-img-modal div{
		float: right;
		margin-right: 150px;
		margin-top: 10px;
	}
	.color-img-modal span{
		display: inline-block;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
	.color-img-modal span img{
		width: 18px;
	}
	/*头部样式*/
	.header {
		width: 100%;
		height: 84px;
	}
	.header .headwrap {	
		width: 960px;
		height: 84px;
		margin: 0 auto;
		position: relative;
	}
	.header .logo {
	    display: block;
	    overflow: hidden;
	    position: absolute;
	    top: 0px;
	    left: 0;
	    width: 300px;
	    height: 90px;
	}
	.header .logo a {
	    display: block;
	    width: 100%;
	    height: 90px;
	    line-height: 90px;
	    overflow: hidden;
	    color: #FFFFFF;
	    font-size: 50px;
	    font-family: "黑体",Arial,Helvetica, sans-serif;
	    text-align: left;
	}
	.header .headwrap .shopcart {
		color: #fff;
		bottom: 20px;
	    padding: 9px 0 5px 40px;
	    position: absolute;
	    right: 0;
	    letter-spacing: 1px;
	    background-image: url(./../../../static/img/shopcar/checkout_navbg.png);
	    background-repeat: no-repeat;
	    background-position: 3px -441px;
	}
	.header .headwrap .shopcart span {
		font-size: 10px;
	}
	/*content样式*/
	.steps_nav {
	    background: #7C7C7C;
	    clear: both;
	    overflow: hidden;
	}
	.steps_nav .steps {
		background-image: url(./../../../static/img/shopcar/checkout_navbg.png);
    	background-repeat: no-repeat;
    	background-position: -3px -160px;
    	display: block;
    	width: 945px;
    	height: 40px;
    	margin: 0 auto;
  		border-left: 4px solid #000;		
	}
	.steps_nav ul li {
	    list-style: none;
	}
	.ptitle_cart {
	    border-bottom: 1px solid #A6A6A6;
	}
	.ptitle_cart h1 {
		color: #000000;
		font-size: 22px;
		padding-top: 40px;
		padding-left: 10px;
		font-weight:normal;
	}
	.core {
		width: 980px;
		min-height: 1058px;
		overflow: hidden;
		margin: 0 auto;
		background: #fff;
		position: relative;
	}
	.core .viewhead a {
		position: absolute;
		right: 295px;
		top: 42px;
		width: 99px;
		display: inline-block;
	    height: 24px;
	    line-height: 24px;
	    color: #fff;
	    text-align: center;
	    font-size: 12px;
	    letter-spacing: 2px;
	    background: linear-gradient(to right,#E13C3A,#B61C1A);
	}
	.list {
		position: relative;
	}
	.list .delete a {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
    	background-position: -440px -51px;
		display: block;
	    height: 11px;
	    width: 40px;
	}
	.list .product {
		width: 440px;
		padding-top: 20px;
		padding-left: 10px;
		position: relative;
	}
	.productName {
		position: absolute;
		left: 99px;
		top: 15px;
	    width: 320px;
	    height: 66px;
	    float: left;
	    padding-top: 20px;
	    font-size: 14px;
	}
	.productName .prdName a {
		color: #000000;
		font-size: 12px;
	}
	.variantName {
		color: #9d9d9d;
		font-size: 5px;
		width: 320px;
		height: 27px;
	}
	.variantName img {
		width: 12px;
		height: 12px;
		padding-left: 5px;
	}
	.variantName div{
		width: 30px;
	}
	.variantName div a {
		color: #000000;
		text-decoration: underline;
	}

	.chooseBillAddress{
		padding-top: 28px;
		padding-bottom: 30px;
	}

	.chooseBillAddress>span{
		margin-right: 30px;
	}

	.billrecepit{
		margin-right: 30px;
	}
	.unitPrice {
		font-size: 14px;
    	padding-left: 60px;
    	width: 90px;
	}
	.list .subtotal {
		padding-left: 65px;
	}
	/*totalwrap*/
	.totalwrap {
		width: 665px;
	}
	.totalwrap .info_box {
		height: 134px;
		margin-top: 20px;
		margin-left: 10px;
	}
	.totalwrap .info_box .transport {
		clear: both;
	    zoom: 1;
	    margin: 0 0 30px;
	    padding: 20px 30px 20px 30px;
	    font-size: 14px;
	    position: relative;
	    overflow: hidden;
	}
	.totalwrap .info_box .transport .radioGroup {
		padding-bottom: 3px;
	}
	.transport .thead {
	    overflow: hidden;
	    padding-bottom: 10px;
	    margin-bottom: 18px;
	    border-bottom: 1px solid #A6A6A6;
	}
	.totalwrap .info_box .transport .tpay {
		font-weight: bold;
	}
	.transport .legend {
	    height: 18px;
	    margin-bottom: 6px;
	    position: absolute;
	    right: 30px;
	    top: 22px;
		width: 95px;
		font-weight: bold;
	}
	.transport .item {
	    position: relative;
	    display: block;
	    margin-bottom: 5px;
	    padding: 0;
	    font-size: 14px;
	}
	.item .subtotal {
		position: absolute;
		right: 66px;
		top: 0;
	}
	.list .subtotal1 {
		position: absolute;
		padding-top: 35px;
	}
	.list .subtotal2 {
		position: absolute;
		padding-top: 35px;
	}
	.list .subtotal3 {
		position: absolute;
		padding-top: 35px;
	}
	.totalwrap .fl {
	    width: 256px;
	}
	.totalPrice {
		background: #EFEFEF;
		float: left;
	    width: 256px;
	    margin-right: 20px;
	    padding: 20px 14px 20px 30px;
	    -webkit-border-radius: 5px;
	    margin-top: 40px;
	    margin-left: 10px;
	    margin-bottom: 60px;
	}
	.legend {
		height: 15px;
    	margin: 0 0 10px;
    	font-size: 14px;
    	font-weight: bold;
	}
	.textbox {
		border: 0;
	}
	.codeFields {
		width: 176px;
	    height: 26px;
	    line-height: 26px;
	    border: 2px solid #e5e5e5;
	    background: #ffffff;
	}
	.input {
		position: relative;
	}
	.actions {
		position: absolute;
		right: 15px;
		top: 28px;
		width: 54px;
		height: 24px;
		line-height: 24px;
		background: #7C7C7C;
		text-align: center;
	}
	.actions a {
		color: #fff;
		font-size: 12px;
	}
	.discounts {
		font-size: 12px;
	}
	b {
		font-weight: bold;
		color: #000;	
	}
	.totalmain {
		float: left;
		width: 345px;
		margin-top: 40px;
	}
	.info_pro {
		position: relative;
	}
	.fr .totalmain .info {
	    border-top: 1px solid #A6A6A6;
	    border-bottom: 1px solid #A6A6A6;
	    margin-bottom: 17px;
   		padding-left: 29px;
   		font-size: 15px;
   		font-weight: bold;		
	}
	.info_transport {
		position: relative;
	}
	.info .price {
	 	position: absolute;
	 	top: 0px;
	 	right: 100px;
	 	font-weight: normal;
	 	font-size: 13px;
	}
	.info .price span {   
	    width: 112px;
	    right: 20px;
	}
	.info .price span .money {
		top: 10px;
	}
	.info .price span .free {
		top: 20px;
	}
	.zongPrice {
		padding-left: 29px;
		font-size: 22px;
		font-weight: bold;
	}
	.zongPrice dl {
		position: relative;
	}
	.zongPrice dl .price {
		position: absolute;
		top: 2px;
		right: 78px;
	}
	.fl {
		position: relative;
	}
	.points {
	    color: #7A7A7A;
	    position: absolute;
	    top: 184px;
	    right: 305px;
	    width: 353px;
	    margin-top: 10px;
	}
	.points .txt01 {
		font-size: 16px;
		color: #000;
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
	    height: 28px;
	    line-height: 26px;
	    background-position: 0 -834px;
	    padding-left: 38px;
	}
	.points .txt01 span {
	    background-color: #EFEFEF;
	    margin: 0 5px;
	    padding: 3px 10px 1px;
	    line-height: 16px;
	}
	.points .txt02 {
		font-size: 9px;
		color: #A39D9D;
		padding-left: 38px;
	}
	.fl .submits {
		position: absolute;
		float: left;
		display: block;

		top: 350px;
		left: 10px;
	}
	.fl .submits .continue {
		width: 81px;
		height: 24px;
		line-height: 24px;
		background: #000;
		color: #fff;
		font-size: 12px;
		text-align: center;
		letter-spacing: 2px;
	}
	.fl .submits .sample_part {
		width: 99px;
		height: 24px;
		position: absolute;
		cursor: pointer;
		top: -1px;
		left: 560px;
		background: linear-gradient(to right,#E13C3A,#B61C1A);
		font-size: 13px;
		text-align: center;
		line-height: 24px;
		letter-spacing: 2px;
	}
	.fl .submits .sample_part a{
		color: #fff;
	}
	.aside {
	    position: absolute;
	    width: 255px;
	    float: right;
	    color: #969696;
	    top: 110px;
	    right: 10px;
	    margin-right: 15px;
	}
	.aside .asidebox {
	    background: #EFEFEF;
	    margin: 0 0 20px 0;
    	padding: 20px 10px 10px;
    	border-radius: 5px;
	}
	.aside .asidebox h2 {
	    height: 16px;
	    margin: 0 0 10px 10px;
	    padding: 0;
	    font-size: 15px;
	    color: #000;
	}
	.aside .asidebox .section .lists dl {
	    overflow: hidden;
	 	margin: -1px 10px 0 10px;
	    padding: 20px 0;
	    background: #fff;
	}
	.aside .asidebox .section .lists dl img {
		margin-left: 10px;
	    width: 60px;
	    height: auto;
	}
	.aside .asidebox .section .lists .good1 dd {
	    position: absolute;
	    top: 70px;
	    right: 30px;
	    width: 112px;
	    display: block;
	    font-size: 11px;
	}
	.aside .asidebox .section .lists dl dd a {
		color: #000;
	}
	.aside .asidebox .section .lists dl dd a span {
		color: #B5B8B8;
		font-size: 5px;
	}
	.aside .asidebox .section .lists dl dd .prices {
		color: #3F371F;
		padding-top: 5px;
	}
	.aside .asidebox .section .lists dl dd .submits {
		background: #7C7C7C;
		width: 77px;
		height: 24px;
		text-align: center;
		line-height: 24px;
		margin-top: 5px;
	}
	.aside .asidebox .section .lists dl dd .submits a span {
		color: #FFFFFF;
	}
	.aside .asidebox .section .lists .good2 {
		border-top: 1px solid #A6A6A6;
	}
	.aside .asidebox .section .lists .good2 dd {
		position: absolute;
		top: 212px;
		left: 65px;
	}
	.aside .asidebox .section .lists .good2 dd .name a {		
		font-size: 11px;
	}
	.aside .asidebox .section .lists .good2 dd .name span {
		font-size: 11px;
	}
	.aside .asidebox .section .lists .good2 dd .prices {
		font-size: 11px;
	}
	.asidebottom .shophelp .ptitle_help {
	    height: 23px;
	    margin-bottom: 18px;
	    text-align: left;
	}
	.asidebottom .shophelp .ptitle_help h2 {
		font-size: 22px;
		font-weight: normal;
	}
	.aside .shophelp .item {
	    border-top: 1px solid #a6a6a6;
	    padding: 0;
	}
	.aside .shophelp .service_help {
	    padding-bottom: 2px;
	}
	.aside .shophelp .service_help p .icon_online_idle {
		background-color: #fff;
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
		background-repeat: no-repeat;
		background-position: -440px -592px;
		width: 235px;
	    height: 82px;
	    border-radius: 5px;
	    display: block;
	    margin-bottom: 10px;
	    text-align: center;
	}
	.aside .shophelp .service_help p .icon_tel {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
    	background-position: 0 -640px;
    	height: 20px;
    	display: block;
    	text-align: left;
    	margin-left: 10px;
	}
	.aside .service_payment {
		width: 215px;
		height: 134px;
		padding:0;
	}
	.aside .service_payment .ptitle {
	    text-align: left;
	    color: #000;
	    font-size: 13px;
	}
	.aside .service_payment .info {
		font-size: 12px;
		color: #7C7C7C;
	}
	.aside .service_payment .info_img .yinlian {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
    	background-position: -579px -1165px;
    	float: left;
	    height: 35px;
	    margin-right: 10px;
	    width: 56px;
	}
	.aside .service_payment .info_img .caifutong {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
		background-position: -659px -1165px;
		float: left;
	    height: 35px;
	    margin-right: 10px;
	    width: 56px;
	}
	.aside .service_payment .info_img .zhifubao {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
    	background-position: -739px -1165px;
    	float: left;
	    height: 35px;
	    margin-right: 10px;
	    width: 56px;
	}
	.aside .shophelp .service_delivery .ptitle_delivery h3 {
		font-size: 14px;
		color: #000;
		height: 15px;
	}
	.aside .shophelp .service_delivery .icon_express {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
    	background-position: 0 -715px;
    	margin-bottom: 13px;
    	height: 29px;
    	display: block;
    	text-align: left;
	}
	.aside .shophelp .service_delivery .icon_time {
		background-image: url(./../../../static/img/shopcar/shu_step1_sprite.png);
    	background-repeat: no-repeat;
    	background-position: 0 -755px;
    	display: block;
	    text-align: left;
	    height: 24px;
	}
	/*footer样式*/
	.footer {
	    background: #fff;
	    border-left: 10px solid #fff;
	    border-right: 10px solid #fff;
	    clear: both;
	    height: auto;
	    padding: 50px 0 0;
	    margin: 0 auto;
	    overflow: hidden;
	    width: 960px;
	}
	.footer .footerlinks {
	    overflow: hidden;
	    padding: 6px 0;
	    background-color: #EFEFEF;
	    clear: both;
	    margin: 0 auto;
	    position: relative;
	    width: 952px;
	}
	.footer .footerlinks .links-l {
	    float: left;
	    margin-top: 2px;
	}
	.footer ul {
	    margin: 0;
	    padding: 0;
	    width: auto;
	    display: block;
	}
	.footer .footerlinks .links-l li {
	    padding-right: 18px;
	    display: inline;
    	padding: 0 12px;
    	font-size: 12px;
    	font-family: "黑体",Arial,Helvetica, sans-serif;
	}
	.footer .footerlinks .links-r {
	    position: absolute;
	    right: 0;
	    top: 4px;
	}
	.footer .footerlinks .links-r li {
	    float: left;
	    padding-top: 1px;
	    vertical-align: top;
	    list-style: none;
		margin-right: 10px;
	}
	.footer .footerlinks .links-r li a {
		display: block;
	    height: 20px;
	    padding: 0;
	    text-align: left;
	    width: 20px;
	    background-image: url(./../../../static/img/shopcar/share_icon.png);
   		background-repeat: no-repeat;
   		background-position: 0 -26px;
   		margin-right: 11px;
	}
	.footer .subscription {
	    display: inline;
	    position: relative;
	}
	.footer .subscription .txt {
	    border: 1px solid #CACACA;
	    color: #000;
	    font-size: 12px;
	    height: 14px;
	    line-height: 14px;
	    margin-top: 0;
	    padding: 2px 0 2px 5px;
	    width: 160px;
	}
	.footer .subscription .submit {
	    background: none repeat scroll 0 0 #B7B7B7;
	    border: 0 none;
	    color: #FFFFFF;
	    height: 17px;
	    position: absolute;
	    right: 0;
	    top: 3px;
	    width: 36px;
	    text-align: center;
	}
</style>

