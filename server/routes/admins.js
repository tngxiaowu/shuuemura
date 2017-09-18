//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取数据结构
var Admin = require("./../models/admin.js")


//登录接口
router.post('/login', (req, res, next)=>{
	//获取前端传来的参数
	  var parma = {
	  	'adminName':req.body.adminName
	  }
	  var adminPwd = req.body.adminPwd
	  var maxAge = 1000*60*60*6

	  //进行数据库查找
	  Admin.findOne(parma,(err,doc)=>{
	  	if(err){
	  		throw err;
	  	}else{

	  	//如果查找到的数据为空，那么就表明用户名不存在
	  		if(doc == null){
	  			res.json({
		  				status:'1',
		  				msg: '用户不存在',
	  		 		})		
	  		}
	  	//如果用户名存在，进行密码比较
	  		if(doc){
	  	//如果密码匹配，那么设置cookie值
	  			if(doc.adminPwd == adminPwd){
	  				res.cookie('adminName',doc.adminName,{
					path:'/',
					maxAge: maxAge
					})

	  				res.json({
		  				status:'0',
		  				msg: '请求成功',
		  				result:doc.userName
	  		 		})		
	  			}
	  	//如果密码不匹配，那么就向客户端发送密码错误信息
	  			else{
	  				res.json({
	  					status:'2',
	  					msg: '密码错误',
	  				})
	  			}
	  		}
	  	}
	  })
});

//检查登录
router.post('/checkLogin',(req,res,next)=>{
	//检验cookie是否存在
	if(req.cookies.adminName){
		res.json({
			status:'0',
			result: req.cookies.userName,
			msg:'cookie存在'
		})
	}else{
		res.json({
			status: '1',
			msg:'用户未登录(from:检查登录)'
		})
	}
})

//登出接口
router.post('/logout',(req,res,next)=>{
	res.cookie('userId','',{
		path:'/',
		maxAge: -1
	})

	res.cookie('userName','',{
		path:'/',
		maxAge: -1
	})

	res.json({
		status: '0',
		msg:'登出成功',
		result: req.cookies.userName
	})
})




//漏写了这个一直报错
module.exports = router;