//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取数据结构
var User = require("./../models/user.js")


//登录接口
router.post('/login', (req, res, next)=>{
	//获取前端传来的参数
	  var parma = {
	  	'userEmail':req.body.userEmail
	  }
	  var userPwd = req.body.userPassword
	  var maxAge = req.body.maxAge

	  //进行数据库查找
	  User.findOne(parma,(err,doc)=>{
	  	if(err){
	  		res.json({
	  			status:'1',
	  			msg: err.msg
	  		})
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
	  			if(doc.userPwd == userPwd){
	  				res.cookie('userName',doc.userName,{
					path:'/',
					maxAge: maxAge
					})

					res.cookie('userId',doc.userID,{
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
	//检验用户id是否存在？
	if(req.cookies.userId){
		res.json({
			status:'0',
			result: req.cookies.userName
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

//登录检查邮箱
router.get('/checkUserEmail',(req,res,next)=>{
	console.log(req.query.registerEmail);
	var parma = {
		//获取get请求中的参数
		'userEmail': req.query.registerEmail
	}
	//检查邮箱
	User.findOne(parma,(err,doc)=>{
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			console.log(doc);
			//当找到的为空时
			if(doc == null){
				res.json({
					status:'0',
					msg:'用户名可以注册'	
				})
				return;
			}
			//当存在doc时
			if(doc){
				res.json({
					status:'2',
					msg:'用户名存在'	
				})
				

			}else{
				res.json({
					status:'3',
					msg: '用户找不到'	
				})
			}
		}
	})
})


//注册接口
router.post('/register',(req,res,next)=>{
	//获取注册表格中的email和密码
	var registerEmail = req.body.registerEmail;
	var registePassword = req.body.registePassword;
	var userID = Math.floor(Math.random()*100000);
	var user = new User({
		"userID" : userID,
	    "userName" : 'jack',
	    "userPwd" : registePassword,
	    "userEmail" : registerEmail,
	    "male": '女士',
    	"name": '',
    	"mobPhone": '',
    	"brithDay": '',
	    "orderList" : [],
	    "cartList" : [],
	    "adressList" : []
	})
	user.save((err,doc)=>{
		if(err){
			res.json({
				status:'1',
				msg: err.message	
			})
		}else{
			if(doc){
				res.json({
					status:'0',
					msg:'注册成功'	
				})
			}		
		}
	})
})

//个人中心-加载订单数据
router.post('/getOrderData',(req,res,next)=>{
	//个人中心页面判定userId是否存在？
	if(req.cookies.userId){
		var parma = {'userID':req.cookies.userId}
		User.findOne(parma,(err,userDoc)=>{
			if(err){
				res.json({
					status: '3',
					msg: err.message
				})

			}else{
				if(userDoc){
					res.json({
						status:'0',
						result: userDoc.orderList
					})

				}
			}
		})

	}else{
		res.json({
			status:'1',
			msg:'用户未登录(from:用户中心)'
		})
	}
})

//个人中心-加载基本信息+收货地址
router.post('/getAddressList',(req,res,next)=>{
	//个人中心页面判定userId是否存在？
	if(req.cookies.userId){
		var parma = {'userID':req.cookies.userId}
		User.findOne(parma,(err,userDoc)=>{
			if(err){
				res.json({
					status: '3',
					msg: err.message
				})

			}else{
				if(userDoc){
					res.json({
						status:'0',
						result: userDoc
					})

				}
			}
		})

	}else{
		res.json({
			status:'1',
			msg:'用户未登录(from:用户中心)'
		})
	}
})


//用户购物车加载
router.post('/getCartList',(req,res,next)=>{
	var parma = {'userID':req.body.userID}
	console.log(parma);
	User.findOne(parma,(err,userDoc)=>{
		if(err){
			throw err;
		}else{
			console.log(userDoc);
			if(userDoc == null){
				res.json({
					status: '1',
					msg:'找到用户为空',
					result: userDoc
				})
			}
			if(userDoc){
				res.json({
					status: '0',
					msg:'查找成功',
					result: userDoc.cartList
				})
			}
		}
	})

})








//漏写了这个一直报错
module.exports = router;