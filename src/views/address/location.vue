<template>
  <div>
  		<ul>
  			<li>
  				<label>省份:</label>
  				<select v-model='province'>
  					<option v-for='item in provinceArr' :value='item.name' >请选择</option>
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
</template>

<script>
import axios from 'axios'
export default {
  name:'location',
	data(){
		return{
      province:''
			
		}
	},
	computed:{
		city(){
		}
	},
  	components:{
    	 
  	},
  	methods:{
  	
  	},
    mounted(){
      
      
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
	
	ul li{
		margin-bottom: 15px;
	}
	
</style>
