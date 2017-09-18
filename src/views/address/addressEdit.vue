<template>
  <div>
  	<div class="address-l">
  		<ul>
  			<li>
  				<label>地址名称:</label>
  				<input type="" name="">
  			</li>
  			<li>
  				<label>姓名:</label>
  				<input type="" name="">
  			</li>
  			<li>
  				<label>手机号码:</label>
  				<input type="" name="">
  			</li>
  			<li>
  				<label>详细地址:</label>
  				<input type="" name="">
  			</li>
  		</ul>
  		
  	</div>
  	<div class="address-r">
  		<ul>
  			<li>
  				<label>省份:</label>
  				<select v-model='province'>
  					<option v-for='item in province.name'>请选择</option>
  				</select>
  			</li>
  			<li>
  				<label>城市:</label>
  				<select>
  					<option>请选择</option>
  				</select>
  			</li>
  			<li>
  				<label>区域:</label>
  				<select>
  					<option>请选择</option>
  				</select>
  			</li>
  			<li>
  				<label>街道:</label>
  				<select>
  					<option>请选择</option>
  				</select>
  			</li>
  			<li>
  				<label>邮编:</label>
  				<input type="" name="">
  			</li>
  		</ul>
  		
  	</div>
 
  </div>
</template>

<script>

export default {
	data(){
		return{
			show:true,
			province:[{Name:'上海',city:['市区','郊区']},{Name:'北京',city:['内环','外环']}],
		}
	},
	computed:{
		city(){
			return this.Province.forEach
		}
	},
  	components:{
    	 
  	},
  	methods:{
  		close(){
  			this.$emit("close");
  		}
  	}
}
</script>

<style scoped>
	ul{
		margin: 0px;
		padding: 0px;
	}
	li{
		list-style: none;
	}
	.address-l{
		float: left;
		width: 292px;
	}

	ul li{
		margin-bottom: 15px;
	}
	
</style>
