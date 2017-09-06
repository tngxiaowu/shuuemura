//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取数据结构
var User = require("./../models/temp-cart-list.js")


router.get('/',(req,res,next)=>{
	res.json({
		status:'0',
		msg:'hello wrold'
	})
})






//漏写了这个一直报错
module.exports = router;