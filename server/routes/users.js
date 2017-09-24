//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取数据结构
var User = require("./../models/user.js")

//获取商品结构
var Goods = require("./../models/goods.js")

//获取时间模块
var sd = require("silly-datetime");

var Temp = require("../models/temp-cart-list.js")


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

					var cartCount = 0;
					doc.cartList.forEach((item)=>{
						cartCount += item.itemNumber;
					})

	  				

	  				res.json({
		  				status:'0',
		  				msg: '请求成功',
		  				result:doc.userName,
		  				cartCount:cartCount

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
	console.log(req.query);
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

//加载商品数量
router.get('/checkCartList',(req,res,next)=>{
	//判断用户是否存在
	if(req.cookies.userId){
		User.findOne({'userID':req.cookies.userId},(err,userDoc)=>{
			if(err){
				throw err
			}else{
				if(userDoc){
					var cartCount = 0;
					userDoc.cartList.forEach((item)=>{
					cartCount += item.itemNumber;
					
				})
					res.json({
						status:'0',
						cartCount: cartCount
					})

				}
			}
		})

	}else{
		if(req.cookies.offLineCart){
			Temp.findOne({},(err,tempDoc)=>{
				if(err){
					throw err
				}else{
					if(tempDoc){
						var cartCount = 0;
						tempDoc.cartList.forEach((item)=>{
							cartCount += item.itemNumber;
						})
						res.json({
							status:'0',
							cartCount:cartCount
						})
					}
				}
			})
		}else{
			var cartCount = 0
			res.json({
				status:'0',
				msg: '离线cookie不存在',
				cartCount:cartCount
			})
		}
	}
})


//注册接口
router.post('/register',(req,res,next)=>{
	//获取注册表格中的email和密码
	var registerEmail = req.body.registerEmail;
	var registePassword = req.body.registePassword;
	var mobPhone = req.body.mobPhone|| '';
	var userID = Math.floor(Math.random()*100000);
	var user = new User({
		"userID" : userID,
	    "userName" : 'jack',
	    "userPwd" : registePassword,
	    "userEmail" : registerEmail,
	    "male": '女士',
    	"name": '',
    	"mobPhone": mobPhone,
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

//加载离线商品
router.post('/mergeCartList',(req,res,next)=>{
	var userID = req.cookies.userId
	var visitorID = req.cookies.offLineCart
	if(visitorID){
		User.findOne({'userID':req.cookies.userId},(err,userDoc)=>{
			if(err){
				res.json({
					status: '3',
					msg: err.message
				})

			}else{
				if(userDoc == null){
					res.json({
						status:'0',
						msg: '找到用户为空'
					})

				}

				if(userDoc){
					//寻找离线购物车
					Temp.findOne({'visitorID': visitorID },(err,tempDoc)=>{
						if(err){
							throw err
						}
						else{
							if(tempDoc == null){
								res.json({
								status:'0',
								msg: '找到用户为空'
								})

							}
							if(tempDoc){
								var tempArr1 = tempDoc.cartList;
								var tempArr2 = userDoc.cartList;
								var tempArr3 = [];
								tempArr1.forEach((item1)=>{
									tempArr2.forEach((item2)=>{
										if(item1.ModeCode == item2.ModeCode){
											if(item1.itemStandard == item2.itemStandard){
												console.log('加东西了吗？')
												var number = item2.itemNumber
												item1.itemNumber += number;
												tempArr2.splice(tempArr2.indexOf(item2),1);
										}
									}
								})
								 tempArr3.push(item1);
									
								})

								console.log('11',tempArr1);
								console.log('12',tempArr2);

								tempArr2.filter((item)=>{
									return item !=undefined;
								})

								var tempArr4 = tempArr1.concat(tempArr2);
								console.log('4',tempArr4);


								var cartCount = 0;
								tempArr4.forEach((item)=>{
									cartCount += item.itemNumber;
								})

								//清除cookie
								res.cookie('offLineCart','',{
									path:'/',
									maxAge: -1
								})

								User.update({'userID':userID},{$set:{cartList:tempArr4}},function(err,result){
									if(err){
										throw err
									}else{
										if(result){
											res.json({
												status: '0',
												msg:"合并成功",
												cartCount:cartCount
										})
								}

									}
								})



							}//if结束

						}
					})

				}
			}
		})

	}//if技术
	else{
		res.json({
			status:'0',
			msg: '离线cookie不存在'
		})
	}
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
	User.findOne(parma,(err,userDoc)=>{
		if(err){
			throw err;
		}else{
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

//用户删除购物车内商品
router.post('/deleteItem',(req,res,next)=>{
	var userID = req.cookies.userId;
	var index = req.body.index;
	User.findOne({'userID':userID},(err,userDoc)=>{
		if(err){
			throw err
		}else{
			if(userDoc == null){
				res.json({
					status:'0',
					msg:'找不到用户'
				})
			}
			if(userDoc){
				userDoc.cartList.splice(index,1)
				userDoc.save((err,doc)=>{
					if(err){
						throw err
					}else{
						res.json({
							status:'0',
							msg:'删成购物车商品成功'
						})
					}
				})
				
				}

			}

			
		})
	})

	
	//用户修改购物车内的商品数量或款式
	router.post('/editItem',(req,res,next)=>{
		//从前端拿取各种参数
		var itemIndex = null;
		var userID = req.cookies.userId;
		var ModeCode = req.body.ModeCode;
		var itemStandard = req.body.itemStandard;
		var itemNumber = req.body.itemNumber;
		var currentIndex = req.body.currentIndex;
		var isInCartList = false;
		var notInCartList = false;
		User.findOne({'userID':userID},(err,userDoc)=>{
		if(err){
			throw err
		}
		else{
			if(userDoc == null){
				res.json({
						status:'0',
						msg:'找不到用户'
				})
			}
			
			console.log('找到用户了么？')
			
			if(userDoc){
				userDoc.cartList.forEach((item,index)=>{
					//找到商品
					if(item.ModeCode == ModeCode){
						console.log('找到商品')
					//找到规格	
						if(item.itemStandard == itemStandard){
							console.log('找到规格')
							//表明是在购物车里
							isInCartList = true;
							itemIndex = index;
							//判断index的值是否相等
							if(currentIndex == itemIndex){
								var newItem = item;
								newItem.itemNumber = parseInt(itemNumber); 
								userDoc.cartList.splice(currentIndex,1,newItem);
								console.log('商品自我增减');
								userDoc.save((err,doc)=>{
									if(err){
										throw err
									}else{
										res.json(
											{
												status:'0',
												msg:'保存原版成功'
											})
										}
									})
								}
								else{
									console.log('合并相同购物车内的产品')
									var newItem = item;
									newItem.itemNumber += parseInt(itemNumber); 
									console.log("newItem",newItem);
									var newIndex = userDoc.cartList.indexOf(item);
									userDoc.cartList.splice(newIndex,1,newItem);
									userDoc.save((err,doc)=>{
									if(err){
										throw err
									}
									else{
										doc.cartList.splice(currentIndex,1);
										doc.save((err,doc)=>{
											res.json({
											status:'0',
											msg:'保存修改版成功'
										})
										})
									}
								})				
							}
						}
					}
				})

			//如果不在购物车内
			if(!isInCartList){
				console.log('情况3：修改的商品不在购物车内')
				Goods.findOne({'ModeCode':ModeCode},(err,goodsDoc)=>{
					if(err){
						throw err;
					}
					else{
						if(goodsDoc){
							var newStandard = null;
							goodsDoc.item.forEach((item)=>{
								if(item.itemStandard == itemStandard){
									newStandard = item;
									newStandard.itemNumber = parseInt(itemNumber);
								}
							})
							userDoc.cartList.splice(currentIndex,1,newStandard);
							// userDoc.cartList.push();
							userDoc.save((err,doc)=>{
								if(err){
									throw err
								}
								else{
									if(doc){
										res.json({
											status:'0',
											msg:'第三条路终于成功了'
										})
									}
								}
							})
						}
					}
				})
				}
			}
			}
			})
		})

//确定用户购物车数量
router.post('/updateCartList',(req,res,next)=>{
	var userID = req.cookies.userId;
	var list = req.body.list;
	console.log(list);
	User.findOne({'userID':userID},(err,userDoc)=>{
		if(err){
			throw err
		}else{
			if(userDoc){
				User.update({'userID':userID},{$set:{cartList:list}},function(err,result){
					if(result){
						console.log(result);
							res.json({
								status:0,
								msg:"success",
							})
						}
					})

			}
		}
	})


	

})


//地址列表加载
router.post('/getAddressList',(req,res,next)=>{
	var userID = req.cookies.userId;

	User.findOne({'userID':userID},(err,userDoc)=>{
		if(err){
			throw err
		}else{
			if(userDoc == null){
				res.json({
					status:'0',
					msg:'找不到用户'
				})
			}

			if(userDoc){
				res.json({
				status:'0',
				result: userDoc.adressList
			})
			}
		}
	})

})

//用户地址添加
router.post('/addAddress',(req,res,next)=>{
	//获取用户ID
	var userID = req.cookies.userId;
	//定义创建时间
	var time1 = sd.format(new Date(), 'YYYYMMDDHHmm');
	//定义创建Id编号：
	var ran1 = Math.floor(Math.random()*8999+1000)
	var ran2 = Math.floor(Math.random()*8999+1000)
	var time2 = sd.format(new Date(), 'YYYYMMDDHHmm');
	var addressId = ran1 + '' + time2 + ran2  ;

	//获取新的地址
	var newAddress = {
		addressShortcut: req.body.addressShortcut, 
		addressee: req.body.addressee,
		detailAddress: req.body.detailAddress,
		telPhone: req.body.telPhone,
		province:req.body.province,
        city: req.body.city,
        postCode: req.body.postCode,
        default:false,
        createDate: time1,
        addressId:addressId
	}
	//判断用户是否登录
	//用户已经登录
	if(userID){
		User.findOne({'userID': userID},(err,userDoc)=>{
			if(err){
				throw err
			}else{
				if(userDoc == null){
					res.json({
						status:'0',
						msg:'找不到用户'
					})
				}
			//找到用户
			//用户地址列表内没有内容
			if(userDoc.adressList.length <= 0){
				console.log('找到用户',userDoc);
				console.log('用户地址为空')
					userDoc.adressList.push(newAddress)
						userDoc.save((err,doc)=>{
							if(err){
								throw err
							}else{
								if(doc){
									res.json({
										status:'0',
										msg:'添加地址成功'
							})
									
						}
					}
				})
			}
			//用户地址列表内有内容
			else{
					//两个对象之间的比较
					var isUnique = true;
					//如果输入的对象重复
					userDoc.adressList.forEach((item)=>{
						if(JSON.stringify(item) == JSON.stringify(newAddress)){
							isUnique = false;
							res.json({
								status:'0',
								msg:'重复地址'
							})
						}
					})
					//如果输入的对象不重复
					if(isUnique){
						userDoc.adressList.push(newAddress)
						userDoc.save((err,doc)=>{
							if(err){
								throw err
							}else{
								if(doc){
									res.json({
										status:'0',
										msg:'添加地址成功'
									})
								}
							}
						})
					}
				}
			}
		})
	}
	//用户未登录
	else{
		res.json({
			status:'1',
			msg:'用户未登录'
		})
	}

})

//删除地址
router.post('/deleteAddress',(req,res,next)=>{
	//获取用户ID
	var userID = req.cookies.userId;
	// console.log(userID);
	// //获取订单号
	// var addressId = req.body.addressId;
	// var addressId = addressId.toString();
	// console.log(addressId);
	var index = req.body.index;

	User.findOne({'userID': userID},(err,userDoc)=>{
		if(err){
			throw err
		}
		else{
			if(userDoc == null){
				res.json({
					status:'0',
					msg: '找到用户为空'
				})
			}

			if(userDoc){
				userDoc.adressList.splice(index,1)
				userDoc.save((err,doc)=>{
					if(err){
						throw err
					}else{
						res.json({
							status:'0',
							msg:'终于删成功了'
						})
					}
				})
				
			}
		}
	})
})

//修改地址-加载被选中的地址
router.post('/loadAddress',(req,res,next)=>{
	var userID = req.cookies.userId; 
	var addressId = req.body.addressId;
	var tempArr = null;
	
	User.findOne({'userID': userID},(err,userDoc)=>{
		if(err){
			throw err
		}else{
			if(userDoc == null){
				res.json({
					status:'3',
					msg:'找到用户为空'
				})
			}
			if(userDoc){
				userDoc.adressList.forEach((item)=>{
					if(item.addressId == addressId){
						tempArr = item;
					}
				})

				if(tempArr){
					res.json({
						status:'0',
						msg:'找到地址',
						result:tempArr
					})
				}else{
					res.json({
						status:'3',
						msg:'该地址列表不存在'
					})

				}
			}
		}
	})
})

//修改地址-修改地址
router.post('/editAddress',(req,res,next)=>{
	//获取用户ID
	var userID = req.cookies.userId;
	//获取用户地址ID
	var addressId = req.body.addressId;
	//获取用户修改信息
	var addressShortcut = req.body.addressShortcut;
	var addressee = req.body.addressee;
	var detailAddress = req.body.detailAddress;
	var telPhone = req.body.telPhone;

	//定义一个容器
	var tempArr = [];
	//判断用户是否登录
	//用户已经登录
	if(userID){
		User.findOne({'userID': userID},(err,userDoc)=>{
			if(err){
				throw err
			}else{
				if(userDoc == null){
					res.json({
						status:'0',
						msg:'找不到用户'
					})
				}
			//找到用户
			//做去重判断
			if(userDoc){
					userDoc.adressList.forEach((item)=>{
					//找到该地址
					if(item.addressId == addressId){
						item.addressShortcut = addressShortcut
						item.addressee = addressee
						item.detailAddress = detailAddress
						item.telPhone = telPhone
						}

						tempArr.push(item);
					})
					console.log(tempArr);

					User.update({'userID':userID},{$set:{adressList:tempArr}},function(err,result){
						if(result){
							res.json({
								status:0,
								msg:"success",
							})
						}
					})
				}
			}
		})
	}
	//用户未登录
	else{
		res.json({
			status:'1',
			msg:'用户未登录'
		})
	}

})

//生成订单(未支付状态)接口

router.post('/createOrderList',(req,res)=>{
	//获取用户ID
	var userID = req.cookies.userId;
	//获取送货地址列表ID
	var addressId = req.body.addressId;
	//定义创建时间
	var time = sd.format(new Date(), 'YYYYMMDDHHmm');
	//定义创建Id编号：
	var ran1 = Math.floor(Math.random()*8999+1000)
	var ran2 = Math.floor(Math.random()*8999+1000)
	var orderId = ran1 + '' + time + ran2  ;
	
	//定义'容器'
	var sendAddress = '';
	var goodsList = [];
	//用来清空购物车的
	var tempArr = [];

	//找到用户
	User.findOne({'userID': userID},(err,userDoc)=>{
		if(err){
			throw err
		}else{
			if(userDoc == null){
				res.json({
					status: '3',
					msg: '用户未找到'
				})
			}

			if(userDoc){
				//将购物车内商品信息放入容器中
				userDoc.cartList.forEach((item)=>{
					goodsList.push(item);
				})

				//将地址放入容器中
				userDoc.adressList.forEach((item)=>{
					if(item.addressId == addressId){
						sendAddress = item;
					}
				})

				//如果存在选中/未选中的状态，可以使用filter或者forEach函数进行过滤
				//计算出商品的总价

				//在商品没有选中状态的情况下 直接情况购物车

				//计算出购物车商品的数量

				//生成购物车订单
				var order = {
					orderId: orderId,
					// orderTotal: orderTotal,
					// orderAmount: orderAmount,
					goodsList: goodsList,
					orderStatus:'未支付',
					orderData: time
				}

				//将新生成的订单放入用户订单列表
				userDoc.orderList.push(order);
				userDoc.save();

				User.update({userID:userID},{$set:{cartList:tempArr}},(err,result)=>{
					if(err){
						throw err
					}else{
						if(result){
							res.json({
								status:'0',
								msg:'创建订单成功'
							})

						}
					}
				})

				
			}
		}
	})

})




//漏写了这个一直报错
module.exports = router;