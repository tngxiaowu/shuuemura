//引入最原始的jsonp(npm的jsonp)
import oringinJSONP from 'jsonp'


//对jsonp进行封装
export default function jsonp(url,data,option){
	url += (url.indexOf('?')<0 ? '?' : '&') + param(data)
	return new Promise((resolve,reject)=>{
		oringinJSONP(url,option,(err,datat)=>{
			if(!err){
				resolve(data);
			}else{
				reject(err);
			}
		})
	})
}

function param(data){
	let url = '',
	//遍历数据
	for(var k in data){
		let value = data[k] != undefined ? data[k] :''
		//对字符串进行拼接
		url += `&${k} = ${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}