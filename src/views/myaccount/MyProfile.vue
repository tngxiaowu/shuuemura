<template>
	<div class="mainContent-second">
		<div class="item_title-second">
			<div class="sectionTitle-second">
				<img src="../../../static/img/myacconut/sectiontitle_pi.jpg" alt="">
			</div>
			<div class="buttonBox">
				<div class="actions">
					<p>
						<a href=""><span>编辑个人资料 ></span></a>
					</p>
				</div>
				<div class="tips-second">
					<a href="">更改密码 ></a>
				</div>
			</div>
		</div>
		<div class="accountProfile">
			<div class="appellation">
				<span class="dt">称谓</span>
				<span class="dd">{{ user.male }}</span>
			</div>
			<div class="birthday">
				<span class="dt">生日</span>
				<span class="dd">{{ user.brithDay }}</span>
			</div>
			<div class="name">
				<span class="dt">姓名</span>
				<span class="dd">{{ user.name }}</span>
			</div>
			<div class="mobile">
				<span class="dt">手机号码</span>
				<span class="dd">{{ user.mobPhone }}</span>
			</div>
			<div class="email">
				<span class="dt">您的电子邮件</span>
				<span class="dd">{{ user.userEmail }}</span>
				<div class="emailverify">
					<a href="" class='btn submit' title="邮箱验证"><span>邮箱验证 ></span></a>
					<em>尊享更多会员礼遇</em>
				</div>
			</div>	
		</div>
		<div class="item_title-second">
			<div class="sectionTitle-second">
				<img src="../../../static/img/myacconut/sectiontitle_ra.jpg" alt="">
			</div>
			<div class="actions">
				<p>
					<a href=""><span>新增收货地址 ></span></a>
				</p>
			</div>
		</div>
		<div class="form shippingInformation">
			<div class="shoppingAddressFields">
				<label>请输入新地址</label>
			</div>
		</div>
		<div class="item_title-second">
			<div class="sectionTitle-second">
				<img src="../../../static/img/myacconut/sectiontitle_social.jpg" alt="">
			</div>
		</div>
		<div class="item_binding">
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				新浪微博
			</div>
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				腾讯QQ
			</div>
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				网易
			</div>
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				人人网
			</div>
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				开心网
			</div>
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				豆瓣
			</div>
			<div class="item_binding_text">
				<div class="actions">
					<p>
						<a href=""><span>立即绑定 ></span></a>
					</p>
				</div>
				支付宝
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
		name: 'Profileindex',
		data(){
		  	return{		
		  		user:{},
		  		userName:''	
  			}
		},
		methods:{
			getAddressList(){
				axios.post('/users/getAddressList').then((response)=>{
						var res = response.data;
						if(res.status == '0'){
							this.user = res.result;
						}else{
							console.log(res.msg);
						}
					})

			},
		},
		mounted(){
			this.getAddressList();
		}
	}

</script>

<style scoped>
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
</style>

