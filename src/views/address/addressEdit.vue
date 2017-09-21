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
          <label>省份*</label>
          <select v-model='province'>
            <option v-for='item in province.name'>请选择</option>
          </select>
        </li>
        <li>
          <label>城市*</label>
          <select>
            <option>请选择</option>
          </select>
        </li>
        <li>
          <label>区域*</label>
          <select>
            <option>请选择</option>
          </select>
        </li>
        <li>
          <label>街道*</label>
          <select>
            <option>请选择</option>
          </select>
        </li>
        <li>
          <label>邮编*</label>
          <input type="" name="">
        </li>
      </ul>
    </div>
    <div>
      <button @click='cancelEdit()' class="cancel-btn">取消修改</button>
      <button @click='editAddress()'  class="save-btn">保存修改</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Location from './location.vue'
export default {
  props:{
    AddressId:''
  },
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
  watch:{
    AddressId:function(){
      this.getCheckedAddress();
    }  
    },
	computed:{
		city(){
		}
	},
  	components:{ 
    	 Location
  	},
  	methods:{
  		close(){
  			this.$emit("close");
  		},
      editAddress(){
        axios.post('/users/editAddress',{
          addressId: this.AddressId,
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
            this.$emit('edit-address-suc')
          }
        })
      },

      getCheckedAddress(){
        axios.post('/users/loadAddress',{ addressId: this.AddressId })
        .then((response)=>{
          var res = response.data;
          if( res.status == '0'){
            this.addressShortcut = res.result.addressShortcut
            this.addressee = res.result.addressee
            this.telPhone = res.result.telPhone
            this.detailAddress = res.result.detailAddress
            
          }
        })
      },
      cancelEdit(){
        this.$emit('edit-address-suc')
      },
      test(){
        console.log('haha');
      }
  	},
    mounted(){
      this.getCheckedAddress();
      
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

  .address-l ul li{
    width: 292px;
    height: 30px;
    padding-bottom: 15px;
    margin: 0px;
  }

  .address-l ul li label{
      display: inline-block;
      width: 68px;
      margin-right: 11px;
  }

   .address-l ul li input{
      display: inline-block;
      width: 176px;
      height: 26px;
      padding: 2px;
      padding-left: 3px;
  }

  ul li{
    margin-bottom: 15px;
  }

  .address-r{
    margin-left: 49px;
    float: left;
    width: 264px;
    height: 258px;
  }

  .address-r ul li label{
      display: inline-block;
      width: 68px;
      height: 30px;
      margin-right: 8px;
  }

  .address-r ul li select{
     width: 180px;
     height: 26px;
  }

  .address-r ul li input{
     width: 176px;
     height: 26px;
  }

  .cancel-btn{
    background-color: #999;
    color: white;
    border: none;
    width: 93px;
    padding: 0px;
    margin: 0px;
    font-size: 14px;
    height: 24px;
  }

  .save-btn{
    background-color: red;
    opacity: .6;
    color: white;
    border: none;
    width: 93px;
    padding: 0px;
    margin: 0px;
    font-size: 14px;
    height: 24px;

  }

	
</style>
