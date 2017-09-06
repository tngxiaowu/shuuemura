//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取momgoose
var mongoose = require("mongoose");
//获取数据结构
var Goods = require("../models/goods")

var User = require("../models/user.js")

var Temp = require("../models/temp-cart-list.js")


//连接数据库
mongoose.connect("mongodb://localhost:27017/shuuemuraMall");

//监听数据库
mongoose.connection.on("connected",()=>{
	console.log("MongoDB connect success")
});

mongoose.connection.on("err",()=>{
	console.log("MongoDB connect err")
});

mongoose.connection.on("disconnected",()=>{
	console.log("MongoDB connect disconnected")
});


//默认就是从/goods开始
router.get("/",function(req,res,next){
	var modeCode = parseInt(req.param("modeCode"));
	console.log(modeCode);
	Goods.find({'ModeCode': modeCode},(err,doc)=>{
		if(err){
			res.json({
				status:"1",
 				msg: err.msg

			});
		}else{
			if(doc){
				console.log(doc);
				res.json({
					status:'0',
					msg:doc
				})
			}
		}

	})
	
});


//添加到购物车 离线购物车
router.post('/addCart',(req,res,next)=>{
	//先判断用户是否登录 判断cookie值是否存在
	//存在 用户已登录 加入购物车
	if(req.cookies.userId){
		//拿到用户id 
		let userId = req.cookies.userId;
		//拿到商品id
		let modelCode = req.body.modelCode;
		//拿到商品的规格
		let itemName =  req.body.itemName;
		//拿到商品的购买数量
		let itemNum = req.body.itemNum;

		//查找用户 判断用户是否存在
		User.findOne({'userID',userId},(err,userDoc)=>{
		//查找不出
			if(err){
				res.json({
					status: '2',
					msg: err.message
				})
		//查找顺利
			}else{
		//如果查找的用户为空
				if(userDoc == null){
					res.json({
						status: '3',
						msg: '用户查找为空'
					})
					return;
				}
		//查找到用户
				if(userDoc){
					var goodItem = ''
					userDoc.cartList.forEach((item)=>{
						//如果购物车中有该件商品
						if(item.ModelCode == modelCode){

						//判断该商品是否存在这个规格
							item.item.forEach((item)=>{
								if(item.name == itemName){

								//该商品的数量+1
								goodItem = item;
								item.number += itemNum
								
								}
							})
						}
					})
				}
			}
		})
	//没有登录
	}else{
	//判断离线购物车cookie值是否存在
	//存在
		if(req.cookies.offLineCart){
			var params = {'vistorID': req.cookies.offLineCart }
			//寻找离线缓存的数据
			Temp.findOne(params,(err,temDoc)=>{
			//寻找数据失败
				if(err){
					res.json({
						status:'1',
						msg: err.message
					})
				}else{
			//寻找到数据
					if(temDoc){
						let goodItem = ''
						temDoc.cartList.forEach((item)=>{
			//如果离线购物车里面存在
							if(item.modeCode == modelCode){
								goodItem  = item;
								item.Number += itemNum
							}

						})
			//如果上述存在gooditem的值为item(true) 如果不存在 gooditem的值为''flase

			if(goodItem){
			//购物车里有
			//保存成果
			temDoc.save((err,doc)=>{
				if(err){
					res.json({
						status:'3',
						msg:err.message
					})
				}else{

			Goods.find({'ModeCode',modelCode},(err,goodDoc)=>{
				if(err){
					res.json({

					})
				}else{
					if(goodDoc){
						goodDoc.

						res.json({
						status:'0',
						msg:'离线购物车添加产品成功',
					})

					}
				}
			})
					

				}
			})
			}else{
			//购物车里没有


			}


					}
				}

			})

			res.json({
				status:'3',
				msg:'离线购物车cookie存在'
			})
	//不存在
	//设置离线购物车cookie
		}else{
			var id = 1001;
			var itemName = 'hehe'
			var num = 1;
			//创建一个随机订单号
			var cookieName = Math.floor(Math.random()*100);
			//设置cookie值
			res.cookie('offLineCart',cookieName,{
				maxAge: 1000*60*60*24
			})

			var temp = new Temp({
				"visitorID" : cookieName,
				"cartList":[
				"modeCode": id,
    			"item": itemName,
    			"Number": num
				]
			})

			temp.save((err,doc)=>{
				if(err){
				if(doc){
					res.json({
					status:'2',
					msg:err.message
					})
				}

				}
				else{
					if(doc){
						res.json({
						status:'0',
						msg:'保存成功'
						})
				}
			}
			})
		}

	}
})


// //购物车功能
// router.post('/addCart',(req,res,next)=>{
// 	//先判断用户是否登录 判断cookie值
// 	console.log(req.cookies.userID)
// 	if(req.cookies.userId){
// 		res.json({
// 			status:'1',
// 			msg:'用户已经登录'
// 		})	
// 	}else{
// 		//用户未登录
// 		//判断是否有离线购物车cookie
// 		//如果存在离线购物车cookie
// 		if(req.cookies.offLineCart){
// 			res.json({
// 				status:'3',
// 				msg:'cookie存在'

// 			})




// 		}else{
// 		//如果没有，设置保存24小时且名为offLineCart的cookie
// 		//拿到前端传来的参数
// 		var id = 1001;
// 		var itemName = 'hehe'
// 		var num = 1;
// 		//创建一个随机订单号
// 		var cookieName = Math.floor(Math.random()*100);
// 		//设置cookie值
// 		res.cookie('offLineCart',cookieName,{
// 				maxAge: 1000*60*60*24
// 			})
// 		//将信息存储在临时数据库内
// 		var temp = new Temp({
// 			"visitorID" : cookieName,
//     		"modeCode": id,
//     		"item": itemName,
//     		"Number": num

// 		})

// 		temp.save((err,doc)=>{
// 			if(err){
// 				if(doc){
// 					res.json({
// 					status:'2',
// 					msg:err.message
// 					})

// 			}

// 		}
// 		else{
// 				if(doc){
// 					res.json({
// 					status:'0',
// 					msg:'保存成功'
// 					})
// 				}

// 			}
		

			

// 		}

		
// 		}
// })

// router.post("/addCart",function(req,res,next){
// 	//首先我们假设已经用户已经登录了，即拿到用户的ID，所以我们先假设userID为一个固定值
// 	let userID = '10000071';
// 	//拿取到商品的id值 这个由前端传给我们 需要注意的是 post请求拿到数据格式用req.body
// 	let productId = req.body.productId;
// 	//引入user数据原模型
// 	let User = require("../models/user");
// 	//查找用户信息列表
// 	User.findOne({userID:userID},function(err,userDoc){
// 		//如果找不到 报错
// 		if(err){ 
// 			res.json({
// 				status:"1",
// 				message:err.message
// 			})
// 		//如果找到用户 判断找到的用户是否为空
// 		}else{
// 			console.log(userDoc);
// 			//假如用户存在 
// 			if(userDoc){
// 				let goodsItem = "";
// 				userDoc.cartList.forEach((item)=>{
// 					if(item.productId === productId){
// 						goodsItem = item;
// 						item.productNum++;
// 					}
// 				})
// 				console.log("-----哈哈-----");
// 				console.log(goodsItem);
// 				console.log("this is kong?");
// 				//如果在购物车里存在
// 				if(goodsItem){
// 					userDoc.save(function(err2,doc2){
// 								if(err2){
// 									res.json({
// 										status:"2",
// 										message:err2.message
// 									})
// 								}else{
// 									res.json({
// 										status:"0",
// 										message:"",
// 										result:"suc"
// 									})
// 								}
// 							});

// 				}
// 				//如果在购物车里不存在
// 				else{
// 				//在数据库中的goods库中寻找这件商品
// 				Goods.findOne({productId:productId},function(err1,doc){
// 					//找不到 报错
// 					if(err1){
// 						res.json({
// 							status:"1",
// 							message:err1.message
// 						})
// 					//找到商品
// 					}else{
// 						//找到的商品不为空
// 						if(doc){
// 							console.log(doc);
// 							doc.productNum = 1;
// 							doc.checked = 1;
// 							//var newObject = 
// 							userDoc.cartList.push(doc);
// 							console.log(doc);
// 							userDoc.save(function(err2,doc2){
// 								if(err2){
// 									res.json({
// 										status:"2",
// 										message:err2.message
// 									})
// 								}else{
// 									res.json({
// 										status:"0",
// 										message:"",
// 										result:"suc"
// 									})
// 								}
// 							});
// 						}
// 					}
// 				})

// 				}

// 			}
// 		}
// 	})
// })

module.exports = router;