<template>
  <div class="goodslist">
    <nav class="crumbs">
      <a href=""></a>
      <a href="">彩妆 /</a>
      <a href="" class="current">隔离系列</a>
    </nav>
    <div class="content-padded">
      <ul class="grid-view">
        <!-- <li class="grid-view-item">
          <router-link to='/infos/' class="item-image">
            <img src="http://m.clarisonic.cn/uploadfile//20150901/5457142288615876.png" alt="毛孔柔焦CC泡隔" class="image">
          </router-link>
          <ol class="item-info">
            <li class="name">毛孔柔焦CC泡隔</li>
            <li class="price">￥390/50g</li>
            <li class="opt">
              <router-link to='/infos' class="btn-buy">立即购买</router-link>
            </li>
          </ol>
        </li> -->
        <li v-for="item in detailsList" class="grid-view-item">
          <router-link :to='`/infos/${item.ModeCode}`' class="item-image">
            <img :src="`../../static/images/${item.imgUrl}`" class="image">
          </router-link>
          <ol class="item-info">
            <li class="name">{{item.productName}}</li>
            <li class="price">{{item.productPrice}}</li>
            <li class="opt"><router-link to='/infos' class="btn-buy">立即购买</router-link></li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'goodslist',
  data () {
    return {
      detailsList:[
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20160425/7167454776216777.png",
      //     productName:"超模心机修颜乳 SPF30 PA++",
      //     productPrice:"￥360/30ml",
      //     productBuy:"立即购买"
      //   },
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20140915/201406251134070_main_B.png",
      //     productName:"超模心机焕颜霜",
      //     productPrice:"￥450/50ML",
      //     productBuy:"立即购买"
      //   },
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20141016/164484730927977.png",
      //     productName:"新超模心机柔焦底霜",
      //     productPrice:"￥320/22ML",
      //     productBuy:"立即购买"
      //   },
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20160425/7167675593961926.png",
      //     productName:"超模心机水感润泽霜",
      //     productPrice:"￥360/自然02",
      //     productBuy:"立即购买"
      //   },
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20170713/4261339962482952.png",
      //     productName:"轻薄微光妆套组",
      //     productPrice:"￥610/套组",
      //     productBuy:"立即购买"
      //   },
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20170713/4260986975656822.png",
      //     productName:"明星泡隔底妆收藏组",
      //     productPrice:"￥435/套组",
      //     productBuy:"立即购买"
      //   },
      //   {
      //     imgUrl:"http://m.clarisonic.cn/uploadfile//20140915/201401221454270_main_B.jpg",
      //     productName:"五角形海绵 4PCS",
      //     productPrice:"￥45/4PCS",
      //     productBuy:"立即购买"
      //   }
       ]
    }
  },
  created(){
    console.log(this.$route.params.type);
    this.getdata(this.$route.params.type);
  },
  methods:{
    getdata(types){
      var _this=this;
      axios.get("/goods/goodsList",{params:{subDepartmentCode:types}}).then((response)=>{
       var res=response.data;
          if(res.status=="0"){
            console.log(res.result);
            // console.log(res.msg);
            res.result.forEach((item)=>{
              var items={};
              items.imgUrl=item.ModelCoverImg;
              items.productName=item.ModelChName;
              items.productPrice=item.ModelOriginPrice;
              items.ModeCode=item.ModeCode;
              _this.detailsList.push(items);
            })
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodslist {
  max-width: 640px;
  margin: 0 auto;
  background-color: #fff;
}
.crumbs {
  padding: 0.4rem 0.6rem 0 2.5rem;
  position: relative;
  height: 1.75rem;
  text-align: left;
  background-color: #666;
  overflow: hidden;
}
.crumbs a:first-child {
  position: absolute;
  left: 0;
  top: 0;
  width: 2.2rem;
  height: 100%;
  display: block;
  font-size: 13px;
  line-height: 1.75rem;
  background-color: #333;
}
.crumbs a {
  text-decoration: none;
  color: #919191;
  margin-right: 0.6rem;
}
.crumbs a:first-child:before {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.3rem;
  margin-left: -0.2rem;
  content: "\20";
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  vertical-align: 1px;
  border-top: 1px #fff solid;
  border-left: 1px #fff solid;
  transform: rotate(-45deg);
}
.crumbs a.current {
  color: #fff;
}
.content-padded {
  margin: 0.6rem 0.56rem 0.6rem 0.56rem;
}
.content-padded .grid-view {
  margin-left: 0!important;
  margin-right: 0!important;
  margin: 0.6rem 0.6rem 0 0.6rem;
  padding: 0.3rem 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.grid-view-item {
  list-style: none;
  padding: 0 0.3rem 1.25rem 0.3rem;
  width: 46%;
  text-align: center;
  margin-bottom: 0.6rem; 
}
.grid-view-item .image {
  margin: 0 auto;
  max-width: 9.4rem;
  height: 9rem;
  display: block;
}
.grid-view-item .item-info>li.name {
  font-size: 13px;
  overflow: hidden;
  height: 2.1rem;
  line-height: 1rem;
  text-align: center;
  color: #646464;
}
.grid-view-item .item-info>li.price {
  /*padding-right: 2.5rem;*/
  color: #393939;
  font-size: 15px;
}
.grid-view-item .item-info>li {
  padding: 0.2rem 0;
  list-style: none;
}
/*.grid-view-item .item-info>li.opt {
  padding-right: 1.9rem;
}*/
a.btn-buy {
  text-decoration: none;
  color: #fff;
  background-color: #cf3537;
  position: relative;
  display: inline-block;
  padding: 0.4rem 0.9rem 0.4rem 0.87rem;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  vertical-align: top;
  background-clip: padding-box;
  border: 1px #cf3537 solid;
}

ol{
  padding-left: 0px; 
}
</style>
