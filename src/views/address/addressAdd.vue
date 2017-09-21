<template>
  <div>
  	<div class="address-l">
  		<ul>
  			<li>
  				<label>地址名称:</label>
  				<input type="" name="" placeholder="例：家庭地址" v-model='addressShortcut'>
  			</li>
  			<li>
  				<label>姓名:</label>
  				<input type="" name="" v-model='addressee'>
  			</li>
  			<li>
  				<label>手机号码:</label>
  				<input type="" name="" v-model='telPhone'>
  			</li>
  			<li>
  				<label>详细地址:</label>
  				<input type="" name="" v-model='detailAddress'>
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
    <div>
      <button @click='cancelEdit()'>取消修改</button>
      <button @click='addAddress()' >保存地址</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
			show:true,
      province:'',
      addressShortcut:'',
      addressee:'',
      telPhone:'',
      detailAddress:'',
		}
	},
	computed:{
		city(){
		}
	},
  	components:{
    	 
  	},
  	methods:{
  		close(){
  			this.$emit("close");
  		},
      addAddress(){
        axios.post('/users/addAddress',{
          addressShortcut: this.addressShortcut, 
          addressee: this.addressee, 
          detailAddress: this.detailAddress,
          telPhone: this.telPhone,
          province:'上海',
          city:'郊区',
          postCode: 201516
        }).then((response)=>{
          var res = response.data;
          if(res.status == '0'){
            console.log(res.msg);
            this.$emit('add-adress-suc')
          }
        })
      },
      cancelEdit(){
        this.$emit('add-adress-suc')
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
    height: 180px;
	}

	ul li{
		margin-bottom: 15px;
	}
	
</style>
