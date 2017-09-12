<template>
	 <div class="mainContent-fourth">
		<div class="item_title-fourth">
			<img src="../../../static/img/myacconut/sectiontitle_ns.jpg" alt="">
		</div>
		<div class="newsletterSubscription">
			<span class="tips">您已成功订阅Shuuemura电子期刊!</span>
			<span>如需退订，请<a href="" class="thickbox">点击此处</a></span>
		</div>
	</div>
</template>

<script>
export default {
		name: 'Profileindex',
		data(){
		  	return{		
		  		email: '45478988',  		
		  		user:{
		  		"userID" : "1",
			    "userName" : "Tom",
			    "userPwd" : 123456,
			    "userEmail" : "454789898@qq.com",
			    "orderList" : [
			    	{
			    		"orderNumber":"123456789",
				    	"orderTotal":"999",
				    	"products":"6",
				    	"orderTime":"2017/9/1",
				    	"orderStatus":"未完成",
				    	"orderDetails":"电脑下单"
				    },
				    {
			    		"orderNumber":"222222222",
				    	"orderTotal":"899",
				    	"products":"7",
				    	"orderTime":"2017/5/20",
				    	"orderStatus":"已完成",
				    	"orderDetails":"手机下单"
				    },
				    {
			    		"orderNumber":"888888888",
				    	"orderTotal":"998",
				    	"products":"2",
				    	"orderTime":"2017/4/18",
				    	"orderStatus":"已完成",
				    	"orderDetails":"电脑下单"
				    }
			    ],
			    "cartList" : [ 
			        {
			            "ModeCode" : 1001,
			            "item" : [ 
			                {
			                    "itemStandard" : "深色色50g常规版",
			                    "itemNumber" : 2,
			                    "itemImg" : "2.jpg"
			                }
			            ]
			        }
			    ],
			    "adressList" : [ 
			        {
			            "addressId" : "100002",
			            "userName" : "Tom",
			            "streetName" : "上海市金山区廊下镇",
			            "postCode" : "110000",
			            "tel" : "13817419413",
			            "isDefault" : false
			        }, 
		        {
		            "addressId" : "100003",
		            "userName" : "Tom",
		            "streetName" : "上海市宝山区杨行镇",
		            "postCode" : "110001",
		            "tel" : "1383838438",
		            "isDefault" : true
		        }, 
		        {
		            "addressId" : "100004",
		            "userName" : "Wang QiYuan",
		            "streetName" : "上海市浦东新区金桥镇",
		            "postCode" : "110002",
		            "tel" : "22222222222",
		            "isDefault" : false
		        }, 
		        {
		            "addressId" : "100005",
		            "userName" : "yangyuanyuan",
		            "streetName" : "上海市金山区廊下镇",
		            "postCode" : "110003",
		            "tel" : "33333333333",
		            "isDefault" : false
		        }
		    ],
  		}
  	}
}
}

</script>

<style scoped>
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
</style>

