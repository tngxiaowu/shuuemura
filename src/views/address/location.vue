<template>
  <div>
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
</template>

<script>
import axios from 'axios'
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

	ul li{
		margin-bottom: 15px;
	}
	
</style>
