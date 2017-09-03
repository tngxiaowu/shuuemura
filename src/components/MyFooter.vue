<template>
  <div class="hello">
    <div class="suFooter">
		<ul class='bottomNav'>
			<li><a href="">专柜中心</a></li>
			<li><a href="">帮助中心</a></li>
			<li><a href="">使用条款</a></li>
			<li><a href="">使用条款</a></li>
			<li><a href="">COOKIES政策</a></li>
			<li><a href="">隐私声明</a></li>
			<li><a href="">网站地图</a></li>
			<li><a href="">产品列表</a></li>
			<li><a href="">会员权益</a></li>
			<a href="" class='linkToMemberfoot'>风尚会员直通车<div class="block"></div></a>
		</ul>
		<div class="category-list">
			<ul class='category-list-UL'>
				<span class="category-list-title"><a href="">护肤</a></span>
				<li><a href="">洁颜油/洁颜啫喱</a></li>
				<li><a href="">爽肤水/柔肤水</a></li>
				<li><a href="">精华</a></li>
				<li><a href="">滋润乳液</a></li>
				<li><a href="">面霜</a></li>
				<li><a href="">眼唇护理</a></li>
				<li><a href="">面膜</a></li>
				<li><a href="">面部喷雾</a></li>
			</ul>
			<ul class="category-list-UL">
				<span class="category-list-title"><a href="">彩妆</a></span>
				<li><a href="">面部</a></li>
				<li><a href="">眼部</a></li>
				<li><a href="">唇部</a></li>
			</ul>
			<ul class="category-list-UL">
				<span class="category-list-title"><a href="">工具</a></span>
				<li><a href="">假睫毛</a></li>
				<li><a href="">刷具</a></li>
				<li><a href="">其他工具</a></li>
			</ul>
			<ul class="category-list-UL">
				<span class="category-list-title"><a href="">产品系列</a></span>
				<li><a href="">洁颜油系列</a></li>
				<li><a href="">晶萃溢采系列</a></li>
				<li><a href="">深海养护系列</a></li>
				<li><a href="">海洋深层水系列</a></li>
				<li><a href="">植村秀礼盒</a></li>
				<li><a href="">村上隆 &nbsp;限定</a></li>
				<li><a href="">KYE &nbsp;自由宣言限定</a></li>
				<li><a href="">景泰蓝 &nbsp;新年限定</a></li>
			</ul>
		</div>
		<div class="media">
			<ul class="media-wrap">
				<li class="media-weixin-icon"><img src="./../../static/img/index/media-weixin.jpg" alt="植村秀官方微信"></li>
				<li class="media-sina-icon"><img src="./../../static/img/index/media-sina.jpg" alt="植村秀官方微博"></li>
				<li class="media-mobile-icon">
					<img src="./../../static/img/index/media-mobile.jpg" alt="植村秀手机版" class='phone'>
					<div class='media-item media-mobile'>
						<img src="./../../static/img/index/media-weixin.jpg" alt="二维码" class='phonesao'>
					</div>
				</li>
			</ul>
		</div>
		<a href="" class='cxwz-logo'><img src="./../../static/img/index/cert.png"></a>
    </div>
    <div class="benan">
		<p>通过浏览这个网站，你接受才能使用cookies为您提供的广告适合您的利益，进行流量统计数据，并促进信息在社交网络上的共享。点击<a href="">Cookies政策</a>了解详情</p>
		<p class="margin10_T">
			<a href="" class="margin05_R">沪ICP备06001333号-1</a>
			<a href="" class="margin05_R">
				<img src="./../../static/img/index/beian.png" alt="沪公网安备">沪公网安备 31010602001532号
			</a>
			© L'Oreal China 欧莱雅（中国）有限公司版权所有
		</p>
    </div>
  </div>
</template>

<script>
	export default {
  name: 'MyFooter',
  data(){
  	return{

  	}
  }
  
  
}

</script>

<style scoped>
	li {
		list-style: none;
	}
	a {
		text-decoration: none; 
		color: #A2A2A2;
	}
	a:hover {
		text-decoration: underline;
	}
	.suFooter {
		clear: both;
	    overflow: hidden;
	    position: relative;
	    width: 1280px;
	    background: #000;
	    margin: 0 auto;
	    margin-top: -5px;
	    z-index: 2;
	}
	.suFooter .bottomNav {
	    margin-left: 40px;
	    position: relative;
	    margin-left: 10px;
	    margin-top: 6px;
	}
	.suFooter .bottomNav li {
		float: left;
	    height: 70px;
	    line-height: 70px;
	    padding: 0 24px;
	    font-size: 14px;
	}
	.suFooter .bottomNav li a {
		font-size: 13px;
	}
	.suFooter .bottomNav .linkToMemberfoot {
		width: 110px;
	    height: 20px;
	    right: 0px;
	    top: 5px;
	    position: absolute;
	    display: block;
	    background: red;
	    font-size: 12px;
	    color: #FFFFFF;
	    line-height: 20px;
	    border-top-left-radius: 5px;
	    border-top-right-radius: 5px;
	    margin-right: 10px;
	}
	.suFooter .bottomNav .linkToMemberfoot .block {
		border-right: 1px solid #FF0000;
	    border-top: 1px solid #FF0000;
	    width: 5px;
	    height: 5px;
	    transform: rotate(45deg);
	    position: absolute;
	    top: 6px;
	    right: -3px;
   		background: #FF0000;
	}
	.suFooter .category-list {
		clear: both;
	    border-top: 1px solid #323232;
	    background: #000;
	    padding: 35px 40px;
	    padding-bottom: 55px;
	    width: 1280px;
	    height: 279px;
	    overflow: hidden;
	    text-align: left;
	    padding-top: 22px;
	    padding-left: 10px;
	}
	.category-list .category-list-UL {
	    float: left;
	    font-size: 14px;
	    line-height: 1;
	    margin-left: 30px;
	    margin-right: 30px;
	}
	.category-list-UL .category-list-title {
	    display: block;
	    margin-bottom: 20px;
	}
	.category-list .category-list-UL li {
	    margin-bottom: 15px;
	}
	.category-list .category-list-UL li a {
		font-size: 13px;
	}
	.media {
	    position: absolute;
	    right: 135px;
	    top: 70px;
	    margin-top: 40px;
	}
	.media .media-wrap li {
	    float: left;
	    margin-right: 30px;
	    position: relative;
	}
	.media .media-wrap li .media-item {
		display: none;
	}
	.cxwz-logo {
		position: absolute;
		top: 30px;
		right: 20px;
		padding-top: 5px;
		margin-right: 10px;
	}
	.cxwz-logo img {
		width: 89px;
		height: 31px;
	}
	.benan {
		width: 1280px;
	    text-align: center;
	    font-size: 13px;
	    color: #ADADAD;
	    background: #000;
	    padding-top: 25px;
	    margin: 0 auto;
	    border-top: 1px solid #323232;
	    height: 50px;
	    padding-bottom: 70px;
	    line-height: 1;
	}
	.benan p {
		font-size: 12px;
    	color: #ADADAD;
	}
	.benan .margin10_T {
		margin-top: 10px;
	}
</style>