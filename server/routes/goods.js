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


//添加至购物车
router.post('/addCart',(req,res,next)=>{
	if(req.cookies.userId){
		//拿到用户id 
		let userId = req.cookies.userId;
		//拿到商品id
		let modelCode = req.body.modelCode;
		console.log(modelCode);
		//拿到商品的规格
		let itemStandard =  req.body.itemStandard;
		//拿到商品的购买数量
		let itemNumber = req.body.itemNumber;
		console.log(typeof itemNumber);
		//第一步：查找用户
		console.log('第一步：查找用户')
		User.findOne({'userID':userId},(err,userDoc)=>{
			if(err){
			res.json({
			//查找不到 统一为3
				status:'3',
				msg:err.message
				})
			}
			else{
				//找到的用户为空 
				if(userDoc == null){
					res.json({
					//查找不到 统一为3
					status:'3',
					msg:'查找不到用户'
					})
			}
			if(userDoc){
				console.log('找到用户',userDoc);
				let goodModel = ''
				let goodItem = ''
				userDoc.cartList.forEach((item)=>{
					if(item.ModeCode == modelCode){
						console.log('路线2测试:找到旧商品')
						goodModel = item;
						if(item.itemStandard == itemStandard){
							console.log('线路2测试:此时用户购物车里该规格商品是：',item);
							goodItem = item;
							console.log('路线2测试:此时用户购物车添加的数量是:',itemNumber);
							item.itemNumber++
							console.log('添加成功：此时item的值是:',item)
									console.log('线路2开始')
									console.log('此时uerdoc值为',userDoc);
									userDoc.save((err1,doc1)=>{
									if(err1){
										res.json({
											status:'3',
											msg: err.message
										})
									}
									else{
										if(doc1){
											console.log('此时doc值是',doc1)
											res.json({
												status:'0',
												msg:'线路2：添加旧商品+就规格成功(203111)'
											})
											return;
											console.log('还能执行么？')
										}
									}
								})
						}
					}
				})
			}

			//开始判断
							//如果该产品不在用户购物车内，(即找不到goodModel)
				if(!goodModel){
				//线路1
				//寻找到该款mdoel
					console.log('线路1：model没有在购物车内');
					console.log('线路1：寻找商品内的Good')
					Goods.findOne({'ModeCode':modelCode},(err,goodDoc)=>{
						if(err){
							res.json({
								status:'3',
								msg:err.message
							})
						}else{
							if(goodDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款产品，添加失败(65)'
								})
							}
						//如果找到商品，判断是否有该商品规格
							
							if(goodDoc){
								var selectedItem = ''
						console.log('线路1：寻找到商品')
								goodDoc.item.forEach((item)=>{
						//如果该商品规格存在
						console.log('线路1：寻找到商品规格')
									if(item.itemStandard == itemStandard){
						//初始化商品
										selectedItem = item;
										selectedItem.itemNumber = 0;
										selectedItem.itemNumber += itemNumber;
										selectedItem.ModeCode = modelCode;
										//需要添加价格 待做
									}
								})
						console.log('线路1：商品规格是:',selectedItem)
						//判断item是否存在
							if(selectedItem){
						//将商品添加至用户购物车
								userDoc.cartList.push(selectedItem);
								userDoc.save((err,doc)=>{
								if(err){
									res.json({
									//查找不到 统一为3
									status:'3',
									msg: err.message
									})
								}else{
									if(doc){
										console.log('线路1：添加新的商品+新的规格至购物车成功')
										res.json({
										status:'0',
										msg: '新的商品规格添加成功'
										})
									}
								}
							})
							}
							//item不存在
							else{
						console.log('线路1：添加新的商品+新的规格至购物车失败')
									res.json({
									status:'0',
									msg: '找不到该款产品下的规格，添加失败(163)'
									})
							    }
							}
						}
					})
				}// 添加新的商品+新的规格 结束

//线路2:旧商品 旧规格
				//购物车内存在商品
				if(goodModel){
				//存在新的规格
				if(goodItem){
				//线路2开始
				//线路2结束
				}
//线路3：旧商品 新规格
				else{
					Goods.findOne({'ModeCode':modelCode},(err,goodDoc)=>{
						if(err){
							res.json({
								status:'3',
								msg:err.message
							})
						}else{
							if(goodDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款产品，添加失败(204)'
								})
							}
							if(goodDoc){
								var selectedItem = ''
								goodDoc.item.forEach((item)=>{
								//如果该商品规格存在
									if(item.itemStandard == itemStandard){
									//初始化商品
										selectedItem = item;
										selectedItem.itemNumber = 0;
										selectedItem.itemNumber += itemNumber;
										selectedItem.ModeCode = modelCode;
									}
								})
								if(selectedItem){
									console.log("备选商品",selectedItem);
									console.log("用户购物车",userDoc.cartList);
									userDoc.cartList.push(selectedItem);
									userDoc.save((err,doc)=>{
										if(err){
											res.json({
												status:'1',
												msg: err.message
											})
										}else{
											if(doc){
												res.json({
													status:'0',
													msg:'旧商品，新规格添加成功'
												})
											}
										}
									})
								}
							}
						}
					})
				}
			}
		}//user.findone.else结束
	})//User.findOne结束


	}//if结束
	else
	{
		if(req.cookies.offLineCart){
		let params = {'visitorID': req.cookies.offLineCart }
		let itemName = req.body.itemStandard;
		let num = req.body.itemNumber;
		let ModeCode = req.body.modelCode;
		let goodModel = ''
		let goodItem = ''

		console.log(params);
		Temp.findOne(params,(err,temDoc)=>{
			if(err){
				res.json({
					status:'3',
					msg: err.message
				})
			}else{
				if(temDoc){
					temDoc.cartList.forEach((item)=>{

						if(item.modeCode == ModeCode){
							goodModel = item;
						if(item.Name == itemName){
							goodItem = item;
							item.itemNumber++
							}
						}

						


					})

			}//下面开始写代码
			if(!goodModel){
				//线路1
				//寻找到该款mdoel
					console.log('线路1：model没有在购物车内');
					console.log('线路1：寻找商品内的Good')
					Goods.findOne({'ModeCode':ModeCode},(err,goodDoc)=>{
						if(err){
							res.json({
								status:'3',
								msg:err.message
							})
						}else{
							if(goodDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款产品，添加失败(65)'
								})
							}
						//如果找到商品，判断是否有该商品规格
							
							if(goodDoc){
								var selectedItem = ''
						console.log('线路1：寻找到商品')
								goodDoc.item.forEach((item)=>{
						//如果该商品规格存在
						console.log('线路1：寻找到商品规格')
									if(item.itemStandard == itemName){
						//初始化商品
										selectedItem = item;
										selectedItem.Number = 0;
										selectedItem.Number += num;
										selectedItem.ModeCode = ModeCode;
										//需要添加价格 待做
									}
								})
						console.log('线路1：商品规格是:',selectedItem)
						//判断item是否存在
							if(selectedItem){
						//将商品添加至用户购物车
								temDoc.cartList.push(selectedItem);
								temDoc.save((err,doc)=>{
								if(err){
									res.json({
									//查找不到 统一为3
									status:'3',
									msg: err.message
									})
								}else{
									if(doc){
										console.log('线路1：添加新的商品+新的规格至购物车成功')
										res.json({
										status:'0',
										msg: '新的商品规格添加成功(离线状态)'
										})
									}
								}
							})
							}
							//item不存在
							else{
						console.log('线路1：添加新的商品+新的规格至购物车失败')
									res.json({
									status:'0',
									msg: '找不到该款产品下的规格，添加失败(163)'
									})
							    }
							}
						}
					})
				}// 添加新的商品+新的规格 结束

								//购物车内存在商品
				if(goodModel){
				//存在新的规格
				if(goodItem){
				//线路2开始
				temDoc.save((err1,doc1)=>{
							if(err1){
								res.json({
									status:'3',
									msg: err.message
									})
								}
							else{
							if(doc1){
							console.log('此时doc值是',doc1)
							res.json({
								status:'0',
								msg:'线路2：添加旧商品+就规格成功(离线状态324)'
							})
								return;
								console.log('还能执行么？')
						}
					}
				})
				//线路2结束
				}
//线路3：旧商品 新规格
				else{
					Goods.findOne({'ModeCode':ModeCode},(err,goodDoc)=>{
						if(err){
							res.json({
								status:'3',
								msg:err.message
							})
						}else{
							if(goodDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款产品，添加失败(204)'
								})
							}

							if(goodDoc){
								var selectedItem = ''
								goodDoc.item.forEach((item)=>{
								//如果该商品规格存在
									if(item.itemStandard == itemName){
									//初始化商品
										selectedItem = item;
										selectedItem.Number = 0;
										selectedItem.Number += num;
										selectedItem.modeCode = ModeCode;
										selectedItem.Name = itemName;
									}
								})

								if(selectedItem){
									console.log("备选商品",selectedItem);
									
									temDoc.cartList.push(selectedItem);
									temDoc.save((err,doc)=>{
										if(err){
											res.json({
												status:'1',
												msg: err.message
											})
										}else{
											if(doc){
												res.json({
													status:'0',
													msg:'旧商品，新规格添加成功(离线)'
												})
											}
										}

									})
								}
							}


						}
					})



				}


				}



			}
		})
		//离线cookie存在
			
		}
		else{
		//离线cookie不存在
			let itemName = req.body.itemStandard;
			let num = req.body.itemNumber;
			//创建一个随机订单号
			let cookieName = Math.floor(Math.random()*1000000);
			//设置cookie值
			res.cookie('offLineCart',cookieName,{
				maxAge: 1000*60*60*24
			})


		//创建新的离职cookie
			var temp = new Temp({
				"visitorID" : cookieName,
				"cartList":[{
				"modeCode": req.body.modelCode,
    			"Name": itemName,
    			"Number": num
				}]
			})

		temp.save((err,doc)=>{
			if(err){
				res.json({
					status:'3',
					msg: err.message
				})
			}else{
				if(doc){
					res.json({
						status:'0',
						msg:'离线购物车创建成功'
					})

				}
			}
		})




		}
		
	}

})//router.post请求结束




module.exports = router;