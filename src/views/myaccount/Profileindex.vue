<template>
	<div class="mainContent">
		<div class="item_title">
			<div class="sectionTitle">
				<img src="../../../static/img/myacconut/sectiontitle_mo.jpg" alt="">
			</div>
			<!-- <a href="" title='更多订单' class="more">更多订单 ></a> -->
		</div>
		<div class="info">
			<table class="myOrdersList">
				<tbody>
					<tr class='first'>
						<th>订单号</th>
						<th>订单总价</th>
						<th>产品数量</th>
						<th>订单时间</th>
						<th>订单状态</th>
						<th>订单详细</th>
					</tr>
					<tr class='second' v-for="item in orderList"> 
						<td class='td'>{{ item.orderNumber}}</td>
						<td>{{ item.orderTotal}}</td>
						<td>{{ item.products}}</td>
						<td>{{ item.orderTime}}</td>
						<td>{{ item.orderStatus}}</td>
						<td>{{ item.orderDetails}}</td>
					</tr>
					<tr class="no-order-notice" v-if="!orderList.length">
						<td class="notice">没有历史订单数据</td>
					</tr>
				</tbody>
			</table>

		</div>
		<hr>
		<div class="linkPoints">
			<div class="item_title">
				<div class="sectionTitle">
					<img src="../../../static/img/myacconut/sectiontitle_lp.jpg" alt="积分计划">
				</div>
			</div>
			<div class="divContent">
				<div class="tips">
					尚未开通，敬请期待
				</div>
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
			    "orderList" : []
  	}
},
			methods:{
				loadOrderData(){
					axios.post('/users/getOrderData').then((response)=>{
						var res = response.data;
						if(res.status == '0'){
							this.orderList = res.result;
						}else{
							console.log(res.msg);
						}
					})
				}
			},
			created(){
				this.loadOrderData();
			}

}

</script>

<style scoped>

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
		text-align: center;
	}
	.myOrdersList .second {	 
	    font-size: 14px;
	}
	.myOrdersList .second td { 
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

	.no-order-notice{
		width: 698px;

	}

	.notice{

		padding-top: 25px;
		padding-bottom: 22px;
		font-size: 14px;
	}
</style>

