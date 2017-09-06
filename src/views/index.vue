<template>
  <div class="index">
    <!-- 轮播图组件 -->
    <!-- <my-carousel></my-carousel> -->
    <div class="promotion-banner">
      <a href="">
        <img src="./../../static/img/index/promotion-banner-try.jpg">  
      </a>
      <a href="">
        <img src="./../../static/img/index/promotion-banner-new.jpg">
      </a>
      <a href="">
        <img src="./../../static/img/index/promotion-banner-gift.jpg" class="last-img">
      </a>
    </div>

    <!-- 明星单品组件 -->
    <star-product></star-product>

    <div class="promotion-banner promotion-banner-bottom">
      <a href="">
        <img src="./../../static/img/index/promotion-bannerStory.jpg">  
      </a>
      <a href="">
        <img src="./../../static/img/index/promotion-bannerLook.jpg">
      </a>
      <a href="">
        <img src="./../../static/img/index/promotion-bannerLove.jpg" class="last-img">
      </a>
    </div>

    <div class="subscription">
      <ul>
        <li class="maggize">
          <h3>订阅电子杂志</h3>
          <p>提交您的邮箱地址，获取值村秀最新资讯，官网特惠礼遇</p>
          <input type="email" placeholder="请输入您的电子邮箱" class="subMail"> <button>立即订阅</button><br>
          <input type="checkbox" class="confirmrules"  >
          <span class="privaterules">我已阅读和了解植村秀官网的使用条款和隐私声明，并同意接受使用条款。</span>
        </li>
        <li>
          <h3>扫描二维码，预约眉妆服务</h3>
          <p>即刻预约您身边的明星塑眉师，免费体验源自东京的东瀛塑眉服务</p>
          <ul class="line-brows">
            <li>
              <p>
                <span>15</span>分钟
              </p>
              <span>快速眉妆定制服务</span>
            </li>
            <li>
              <p>
                <span>30</span>分钟
              </p>
              <span>精细眉妆定制服务</span>
            </li>
            <li>
             <img src="./../../static/img/index/brows-scanqrcode.jpg">
            </li>
          </ul>
         
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import MyCarousel from './../components/MyCarousel.vue'
import StarProduct from './../components/StarProduct.vue'
export default {
  name: 'index',
  data () {
    return {
      
  
    }
  },
  components:{
    // MyCarousel,
    StarProduct
  }
}
</script>


<style scoped>
.index{
  width: 1280px;
  margin: 0 auto;
}

.promotion-banner{
  padding-top: 40px;
  padding-bottom: 40px;
}

.promotion-banner img{
 margin-right: 20px;
 margin-left: 20px;
}

.promotion-banner .last-img{
   margin-right: 0px;
}

.promotion-banner-bottom{
  background-color: #f6f6f6;
  padding: 40px 0px;
}

.subscription ul li{
  list-style: none;
  float: left;
  margin-left: 80px;
}

.subscription ul .maggize{
  margin-right: 110px;

}
.subscription{
  width: 1280px;
  height: 365px;
}

.subscription ul li h3{
  margin-top: 60px;
  font-size: 18px;
}

.subscription ul li p{
  font-size: 16px;
  margin-bottom: 50px;
}

.subscription ul li .subMail{
  border: none;
  border-bottom: 1px solid #000000;
  width: 300px;
  margin-right: 20px;
  margin-bottom: 10px;
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {  
display: inline-block;
font-size: 14px;
padding-bottom: 5px;
color: #cccccc;   
}

input:focus{
  outline: none;
}

.subscription ul li button{
  border: none;
  background-color: #000000;
  color: #ffffff;
  width: 90px;
  height: 24px;
  font-size: 14px;
}

.subscription ul li .confirmrules{
  margin-left: 0px;
}

.subscription ul li .privaterules{
  font-size: 12px;
  color: #cccccc;
}

.subscription ul li .line-brows{
  padding-left: 0px;

}

.subscription ul li .line-brows li{
  font-size: 14px;
  float: left;
  margin-left: 0px;
  margin-right: 50px

}

.subscription ul li .line-brows li p {
  text-align: center;
  margin: 0px;
  padding-bottom: 5px;
  border-bottom: 2px solid #000000;
}

.subscription ul li .line-brows li p span {
  font-size: 20px;
}

.subscription ul li .line-brows li span {
  display: inline-block;
  padding-top: 10px;
}

subscription ul li .line-brows li img{
  display: inline-block;
  margin-right: 0px

}



</style>
