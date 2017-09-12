<template>
  <div class="register">
    <a href="" class="promotion-bar">
		<img src="../../static/img/welcome/promotion-bar-20170905.jpeg" height="60" width="1280">
    </a>
    <div class="core">
		<div class="breadcrumb" v-if='status == 1'>
			<ul>
				<li>
					<a href="" title="首页">首页</a>
				</li>
				<li class='last'>注册成功</li>
			</ul>
		</div>
		<div class="breadcrumb" v-if='status == 2'>
			<ul>
				<li>
					<a href="" title="首页">首页</a>
				</li>
				<li class='last'>绑定成功</li>
			</ul>
		</div>
		<div class="welcome" v-if='status == 1'>
			<div class="inner-l">
				<h1>欢迎您注册加入植村秀官网!</h1>
				<p class="info">尊敬的用户,您用邮箱 {{ email }} 为用户名的帐号已成功注册。</p>
				<div>
					<p>
						系统已向您的邮箱
						<span> {{ email }} </span>
						发送了一封验证邮件，请前往我的邮箱
						<a @click="refresh()">立即验证。</a>
						<br>
						如果还未收到邮件,点击
						<a href="">重新发送。</a>
					</p>
						验证您的邮箱地址，您将在第一时间获得植村秀最新产品资讯、礼品促销信息以及其他优惠，
						<br>						
						奢享更加愉悦的线上购物体验。
				</div>
				<div class="submit">
					<a href="" title="继续购物">
						<span></span>
					</a>
				</div>
			</div>
		</div>

		<div class="welcome" v-if='status == 2'>
			<div class="inner-l">
				<h1>账号绑定成功!</h1>
				<div>
					感谢您链接，您可以用植村秀帐号{{ email }}或的连接账号登录本站。
				</div>
				<div class="submit">
					<a href="" title="继续购物">
						<span></span>
					</a>
				</div>
			</div>
		</div>
		
    </div>
   
  </div>
</template>

<script>
 export default {
  name: 'welcome',
  data(){
  	return{
  		email: '',
  		status:'',
  		productList:[
  		{name:"laowang",
  			age:18
  		},
  		{
  			name:"laowang",
  			age:18
  		}
  		]
  	}
  },
  mounted(){
  	this.getQuery();
  },

  methods:{
  	getQuery(){
  		//获取字符串内的参数email
  		this.email = this.$route.query.email
  		//获取注册的状态
  		this.status = this.$route.query.status
  	},
  	refresh(){
  		this.$router.push({path:'/welcome',query:{'status':2,'email':this.email}})
  		window.location.reload();
  	}

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a{
		cursor: pointer;
	}
	.register .promotion-bar {
	    width: 1280px;
	    height: 60px;
	    margin: 0 auto;
	    line-height: 60px;
	    display: block;
	    text-decoration: none;
	}
	.register .core {
	    clear: both;
	    font-family: Simhei;
	    margin: 0 auto;
	    overflow: hidden;
	    width: 890px;
	    padding-top: 50px;
	}
	.register .core .breadcrumb {
		margin-left: -38px;
	}
	.register .core .breadcrumb ul {
		display: block;
	}
	.register .core .breadcrumb ul li {
		float: left;
		list-style: none;
	}
	.register .core .breadcrumb ul li a {
		background-image: url(../../static/img/welcome/breadcrumb_slash.jpg);
	    background-repeat: no-repeat;
	    margin-right: 12px;
	    padding-right: 18px;
	    background-position: 100%;
	    color: #6F506A;
    	text-decoration: none;
	}
	.register .core .welcome {
		font-size: 12px;
	    line-height: 22px;
	    margin: 0 auto 100px;
	    width: 890px;
	    font-family: SimHei;
	    padding-top: 0;
	    text-align: left;
	    overflow: hidden;
	}
	.welcome div {
	    margin-top: 45px;
	}
	.register .core .welcome .inner-l {
	    width: 580px;
	}
	.register .core .welcome .inner-l h1 {
		height: 38px;
		font-size: 36px;
		color: #000;
	}
	.register .core .welcome .inner-l .info {
		color: #9d9d9d;
		padding: 0px 5px;
		font-size: 14px;
	}
	.register .core .welcome .inner-l div {
		line-height: 22px;
	}
	.register .core .welcome div p {
	    color: #323232;
	    font-size: 12px;
	}
	.register .core .welcome div p a {
		color: #9D9D9D;
	}
	.register .core .welcome div p a {
		color: #ae0218;
		text-decoration: none;
	}
	.register .core .welcome .inner-l .submit a span {
	    background-image: url(../../static/img/welcome/welcome-shu.png);
	    background-position: 0px -120px;
	    background-repeat: no-repeat;
	    color: #AE0218;
	    height: 25px;
	    width: 95px;
	    display: inline-block;
	}
</style>