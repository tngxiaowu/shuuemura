//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取数据结构
var User = require("/..")


//默认就是从/users/login开始
router.post("/login",function(req,res,next){
	res.josn({
		msg:'hello,world'
	})
	
});