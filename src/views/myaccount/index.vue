<template>
  	<div class="myaccount">
  	<!-- header -->
	   <!--  <div class="wrap">
			<h1 class="suLogo">
				<a href=""></a>
			</h1>
			<p class="topInfo">订购咨询热线：400-820-6499</p>
			<ul class="topNav">
				<li class="sayHello">
					<span v-if='nickName'>您好，{{nickName}}</span>
					<span v-if='!nickName'>您好，{{email}}</span>
					<span><a href="">我的账户</a></span>
					<span><a href="">登出</a></span>
				</li>
				<li class="shopLink">
					<a href="">我的购物袋</a>
				</li>
			</ul>
	    </div>	 -->
	    <!-- content -->
	    <div class="core">
			<div class="content">
				<div class="subNav">
					<ul>
						<li><router-link to="/myaccount/Profileindex" @click='test()'
						>植村秀专区</router-link></li>
						<li><router-link to="/myaccount/MyProfile">个人信息</router-link></li>
						<li><router-link to="/myaccount/OrderHistory">我的订单</router-link></li>
						<li><router-link to="/myaccount/Subscription">订阅电子报</router-link></li>
					</ul>
				</div>
				
				<router-view></router-view>
			
			</div>
	    </div>
	    <!-- footer -->
	   <!--  <div class="wraps">
			<a href="" class="suContactLink"></a>
			<a href="" class="forumLink">植村秀社区</a>
			<ul>
				<li><a href="">帮助中心</a></li>
				<li><a href="">条款和协议</a></li>
				<li><a href="">关于我们</a></li>
				<li><a href="">工作</a></li>
				<li><a href="">网站地图</a></li>
				<li><a href="">产品列表</a></li>
			</ul>
			<div class="footForm">
				<input type="text" name='mail' class='orderMail' value="输入您的邮件地址">
				<input type="button" value="订阅" class='orderSubmit'>
			</div>
	    </div> -->
 	</div>
</template>

<script>
	import ProfileIndex from "./Profileindex.vue"
	export default {
		name: 'welcome',
		data(){
		  	return{		
		  				
		  		
		    
  		}
  	},

			components:{
				ProfileIndex
			},
			computed:{
				nickName(){
      				return this.$store.state.nickName;  
    			}
			},
			methods:{
			//请求数据方法

				test(){
					alert('哈哈哈')
				},
				
				getCookie(){
				var cookieName = document.cookie.split(";")
				var newArray = [];
				cookieName.forEach((item)=>{
					newArray.push(item.split('='));
				});
				newArray.forEach((item)=>{
					if(item[0] == " userName") {
						this.userName = item[1];

					}
				})

				console.log(cookieName);
				console.log(newArray);
			}
			}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.myaccount {
		background: #757575;
		margin: 0 auto;
		padding: 0;
		width: 1280px;
	}
	/*header*/
	.myaccount .wrap {
	    position: relative;
	    color: #fff;
	    height: 115px;
	    background: #000;
	    width: 950px;
    	margin: 0 auto;
    	padding-bottom: 20px;
	}
	.myaccount .wrap .suLogo {
	    position: absolute;
	    top: 55px;
	    left: 335px;
	    width: 290px;
	    height: 35px;
	}
	.myaccount .wrap .suLogo a {
	    overflow: hidden;
	    display: block;
	    width: 100%;
	    height: 35px;
	    background: url(../../../static/img/myacconut/suSprite.png) no-repeat scroll 0 0;
	}
	.topInfo {
	    position: absolute;
	    top: 10px;
	    right: 30px;
	    font-size: 12px;
	}
	.topNav {
	    top: 65px;
	    height: 42px;
	    position: absolute;
	    right: 30px;
	    font-size: 12px;
	}
	.topNav li {
	    display: inline;
	    float: left;
	    padding: 11px 0;
	    height: 20px;
	}
	.topNav .sayHello {
	    position: absolute;
	    top: -66px;
	    right: 170px;
	    width: 300px;
	    text-align: right;
	}
	.topNav .sayHello span {
	    margin: 0 5px;
	}
	.topNav .sayHello span a:hover {
		text-decoration:underline;
	}
	.topNav a {
	    color: #fff;
	    text-decoration: none;
	}
	.topNav .shopLink {
	    width: 143px;
	    text-align: right;
	    background: url(../../../static/img/myacconut/suSprite.png) no-repeat scroll -212px -157px;
	}
	.topNav .shopLink a:hover {
		text-decoration: underline;
	}
	/*content*/
	.myaccount .core {
		width: 950px;
		height: 735px;
		position: relative;
		padding-bottom: 30px;
		background: #fff;
		overflow: hidden;
    	clear: both;
    	margin: 0 auto;
	}
	.subNav {
	    padding-top: 10px;
	    background: #f3f3f3;
	    width: 212px;
   		float: left;
	}
	.subNav ul {
	    overflow: hidden;
	    margin: 0;
	    padding: 0;
	    height: auto!important;
	    min-height: 195px;
	    font-size: 14px;
	}
	.subNav ul li {
	    margin: -2px 24px 0 24px;
	    padding: 2px 0;
	    background: url(../../../static/img/myacconut/icon_dotter.png) #f3f3f3 0 0 no-repeat;
	    list-style: none;
	}
	.subNav ul li a {
	    display: block;
	    overflow: hidden;
	    padding: 9px 0;
	    background: url(../../../static/img/myacconut/icon_arrow.png) right 11px no-repeat;
	    color: #434343;
	    text-decoration: none;
	}
	.subNav ul li a:hover {
		text-decoration: underline;
	}
	.core .content .mainContent {
	    width: 698px;
	    margin-right: 20px;
	    display: inline;
	    float: right;
	}
	.mainContent .item_title {
	    clear: both;
	    overflow: hidden;
	    margin-bottom: 25px;
	    border-bottom: 2px solid #e5e5e5;
	}	
	.mainContent .item_title .sectionTitle {
	    float: left;
	    margin: 0;
	    position: relative;
	}
	.mainContent .item_title .more {
	    font-family: simsun;
	    font-size: 14px;
	    color: #676767;
	    float: right;
	    margin: 22px 24px 0 0;
	    text-decoration: none;
	}
	.mainContent .item_title .more:hover {
		text-decoration: underline;
	}
	/*植村秀专区*/
	.info .myOrdersList {
	    color: #666666;
	    text-align: center;
	    width: 100%;
	}
	.myOrdersList .first th {
		font-size: 18px;
	    color: #8b8b8b;
		width: 687px;
		height: 42px;
	}
	.myOrdersList .second {	 
	    font-size: 14px;
	}
	.myOrdersList .second .td { 
		padding: 10px 0 10px 0;
		text-align: center;
		width: 712px;
	}
	.myOrdersList hr {
		width: 698px;
		color: #E5E5E5;
		height: 2px;
	}
	.content .mainContent .linkPoints {
	    margin-top: 0;
	    position: relative;
	    margin: 0 0 20px 0;
	}
	.content .mainContent .linkPoints .divContent {
	    position: absolute;
	    top: 18px;
	    right: 0;
	    width: auto;
	}
	.content .mainContent .linkPoints .divContent .tips {
		position: absolute;
	    color: #676767;
	    padding: 3px 0 0 0;
    	line-height: 18px;
    	font-size: 14px;
    	width: 126px;
    	height: 21px;
    	top: 0;
    	right: 10px;
	}
	/*个人信息*/
	.mainContent-second {
		width: 698px;
	    margin-right: 20px;
	    display: inline;
	    float: right;
	}
	.mainContent-second .item_title-second {
	    clear: both;
	    overflow: hidden;
	    margin-bottom: 25px;
	    border-bottom: 2px solid #e5e5e5;
	}
	.mainContent-second .item_title-second .sectionTitle-second {
	    float: left;
	    margin: 0;
	    position: relative;
	    height: 49px;
	}
	.mainContent-second .item_title-second .buttonBox {
		margin-top: 15px;
		float: right;
	}
	.mainContent-second .item_title-second .buttonBox .actions {
		position: absolute;
		top: 0px;
		right: 100px;
	    width: 105px;
	    height: 25px;
	    margin-right: 10px;
	}
	.mainContent-second .item_title-second .buttonBox .actions p a {
		height: 21px;
	    line-height: 22px;
	    padding: 0 10px;
	    text-align: left;
	    background: #2c2c2c;
	    text-decoration: none;
	    color: #fff;
	    font-size: 12px;
	}
	.mainContent-second .item_title-second .buttonBox .tips-second {
		float: left;
		background: #b2b2b2;
		line-height: 18px;
	}
	.mainContent-second .item_title-second .buttonBox .tips-second a {
		display: inline-block;
	    width: 65px;
	    height: 21px;
	    line-height: 21px;
	    padding: 0 10px;
	    color: #ffffff;
	    font-size: 12px;
	    text-decoration: none;
	}
	.accountProfile {
	    overflow: hidden;
	   	margin-bottom: 15px;
	}
	.accountProfile .appellation,.accountProfile .birthday, .accountProfile .name, .accountProfile .mobile, .accountProfile .email {
	    float: none;
	    height: 20px;
	    width: auto;
	    position: relative;
	    margin-bottom: 10px;
	    padding-right: 19px;
	}
	.accountProfile .dt {
		width: 140px;
	    margin-right: 0;
	    padding-left: 20px;
	    padding-right: 10px;
	    display: inline;
	    float: left;
	    font-size: 16px;
	    font-weight: normal;
	    color: #000000;
	    line-height: 1.2em;
	    display: inline-block;
    	vertical-align: top;
	}
	.accountProfile .dd {
	    display: inline-block;
	    vertical-align: top;
	    font-size: 16px;
    	color: #918e8f;
	    line-height: 1.2em;
	}
	.accountProfile .email .emailverify {
	    left: 380px;
	    position: absolute;
	    top: -5px;
	    white-space: nowrap;
	    line-height: 12px;
	    display: inline-block;
	    width: 250px;
	    padding-left: 10px;
	}
	.accountProfile .email .emailverify a {
		color: #FFFFFF;
		background: #B71922;
	    height: 15px;
	    width: 58px;
	    font-size: 12px;
	    line-height: 26px;
	    margin-right: 15px;
	    padding: 4px 8px;
	    text-align: left;
	    text-decoration: none;
	    padding-top: 6px;
	}
	.accountProfile .email .emailverify em {
		margin-left: 10px;
		font-size: 12px;
	}
	.mainContent-second .item_title-second {
		height: 51px;
	}
	.mainContent-second .item_title-second .actions {
	    width: 105px;
	    margin-top: 0px;
	    float: right;
	}
	.mainContent-second .actions a {
	    height: 21px;
	    line-height: 22px;
	    padding: 0 10px;
	    text-align: left;
	    background: #2c2c2c;
	    text-decoration: none;
	    color: #fff;
	    font-size: 12px;
	    background: #000;
	}
	.shippingInformation label {
	    width: 140px;
	    margin-right: 0;
	    padding-left: 20px;
	    padding-right: 10px;
	    float: left;
	    font-size: 16px;
	    font-weight: normal;
	    color: #000000;
	    line-height: 18px;
	}
	.item_binding {
	    width: 100%;
	}
	.item_binding .item_binding_text {
	    font-size: 14px;
	    height: 23px;
	    line-height: 23px;
	    padding-bottom: 20px;
	    padding-left: 20px;
	    padding-right: 480px;
	}
	.item_binding_text .actions {
	    width: 85px;
		float: right;
		margin-top: -13px;
	}
	.mainContent-second .item_binding .item_binding_text .actions a {
	    height: 21px;
	    line-height: 22px;
	    padding: 0 10px;
	    text-align: left;
	    background: #2c2c2c;
	    text-decoration: none;
	}
	/*我的订单样式*/
	.mainContent-third {
	    width: 698px;
	    margin-right: 20px;
	    display: inline;
	}
	.mainContent-third .item_title-third {
	    overflow: hidden;
	    margin-bottom: 25px;
	    position: relative;
	}
	.mainContent-third .item_title-third .myorder {
		padding-top: 10px;
		padding-left: 20px;
		padding-bottom: 20px;
	}
	.mainContent-third .item_title-third .sectionTitle-third {
	    float: left;
	    margin: 0;
	}
	.mainContent-third .item_title-third .sectionTitlePhone {
	    margin: 20px 0 0 550px;
	    font-size: 15px;
	    width: 151px;
	}
	.mainContent-third .item_title-third .sectionTitlePhone a {
	    text-decoration: underline;
	    color: #000;
	}
	.mainContent-third .item_title-third .order {
		width: 698px;
		margin: 0 auto;
		font-size: 10px;
		border-top: 2px solid #e5e5e5;
		padding-top: 20px;
	}
	/*订阅电子报*/
	.mainContent-fourth {
	    width: 698px;
	    margin-right: 20px;
	    display: inline;
	    float: right;
	}
	.mainContent-fourth .item_title-fourth {
		position: relative;
	}
	.newsletterSubscription {
		border-top: 2px solid #e5e5e5;
		padding-top: 25px;
	}
	.newsletterSubscription .tips {
	    font-size: 14px;
	    display: block;
	    color: #b2b2b2;
	}
	.newsletterSubscription span {
	    line-height: 24px;
	    color: #303030;
    	padding: 3px 0 0 0;
    	font-size: 12px;
	}
	.newsletterSubscription span a {
	    font-size: 14px;
	    font-weight: bold;
	    text-decoration: underline;
	    color: #000;
	}
	.newsletterSubscription span a:hover {
		text-decoration: none;
	}
	/*footer*/
	.wraps {
	    clear: both;
	    overflow: hidden;
	    margin-top: 10px;
	    height: 28px;
	    width: 950px;
    	margin: 10px auto;
    	padding-bottom: 2px;
	}
	.wraps .suContactLink {
	    float: left;
	    overflow: hidden;
	    height: 28px;
	    width: 88px;
	    background: url(../../../static/img/myacconut/suSprite.png) no-repeat scroll 0 -220px;
	}
	.wraps .forumLink {
	    line-height: 28px;
	    padding-left: 38px;
	    margin-left: -685px;
	    color: #2121e8;
	    background: url(../../../static/img/myacconut/suSprite.png) no-repeat scroll -140px -226px;
	}
	.wraps a {
	    color: #4D47B5;
	    text-decoration: none;
	    font-size: 12px;
	}
	.wraps ul {
	    float: left;
	    margin: 6px 0 0 195px;
	    overflow: hidden;
	    height: 20px;
	}
	.wraps ul li {
	    float: left;
	    height: 15px;
	    line-height: 16px;
	    padding: 0 15px;
	    border-left: 1px solid #333;
	    margin-left: -1px;
	    list-style: none;
	}
	.wraps ul li a {
	    color: #232323;
	    line-height: 16px;
   		text-align: center;
	}
	.footForm {
	    float: right;
	    height: 22px;
	    background: #000;
	    font-size: 12px;
	    display: block;
	    margin-top: -25px;
	}
	.footForm .orderMail {
	    height: 16px;
	    width: 120px;
	    padding: 1px 5px;
	    color: #404040;
	    border: none;
	    background: #000;
	}
	.footForm .orderSubmit {
	    width: 40px;
	    height: 20px;
	    margin: 1px;
	    color: #838383;
	    line-height: 20px;
	    border: none;
	    background: #232323;
	}
</style>
