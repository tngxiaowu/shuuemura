<template>
	<div class="mainContent-third">
		<div class="item_title-third">
			<div class='myorder'>
				<div class="sectionTitle-third">
					<img src="../../../static/img/myacconut/sectiontitle_mo.jpg" alt="">
				</div>
				<div class="sectionTitlePhone">
					<a href="">查看手机和电话订单 ></a>
				</div>
			</div>
			<div class="order">没有订单数据！</div>
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
	.mainContent-third {
	    width: 698px;
	    margin-right: 20px;
	    display: inline;
	}
	.mainContent-third .item_title-third {
	    overflow: hidden;
	    margin-bottom: 25px;
	    position: relative;
	    /*border-bottom: 2px solid #e5e5e5;*/
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
</style>

