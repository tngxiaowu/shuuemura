//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取数据结构
var User = require("./../models/user.js")

//获取列表结构
var Family = require("./../models/family.js")

//获取时间模块



//获取分类接口



router.get('/',(req,res,next)=>{
	Family.find({},(err,doc)=>{
		if(err){
			throw err
		}else{
			if(doc){
				res.json({
					status: '0',
					result: doc
				})
			}
		}

	})
})



//漏写了这个一直报错
module.exports = router;