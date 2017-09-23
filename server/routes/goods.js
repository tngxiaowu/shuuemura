//引入express框架
var express = require("express");
//拿到express的路由
var router = express.Router();
//获取momgoose
var mongoose = require("mongoose");
//获取数据结构
var multiparty = require("multiparty")

var formidable = require("formidable");

//获取路径模块
var path = require("path");

//获取文件模块
var fs= require("fs");

//获取时间模块
var sd = require("silly-datetime");

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
	var modeCode = parseInt(req.query.ModeCode);
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

//商品详情页加载商品信息接口
// router.get('/itemDetail',(req,res,next)=>{
// 	var parma = {'ModeCode': req.query.modelCode}
// 	var parma = req.query;
// 	var cartCount = null
// 	Goods.find(parma,(err,doc)=>{
// 		if(err){
// 			throw err
// 		}else{
// 			if(doc){
// 				User.findOne({'userID':req.cookies.userId},(err,userDoc)=>{
// 					if(err){
// 						throw err
// 					}else{
// 						if(userDoc){
// 							console.log('userDoc是',userDoc);
// 							userDoc.cartList.forEach((item)=>{
// 								cartCount += item.itemNumber;
// 							})

// 						}

// 						res.json({
// 							status: '0',
// 							result: doc,
// 							cartCount:cartCount
// 						})
// 					}
// 				})
				
// 			}
// 		}
// 	})
// })

//商品详情页加载商品信息接口(备用)
router.get('/itemDetail',(req,res,next)=>{
	var parma = {'ModeCode': req.query.modelCode}
	var cartCount = null
	Goods.findOne(parma,(err,doc)=>{
		if(err){
			throw err
		}else{
			if(doc){
				// User.findOne({'userID':req.cookies.userId},(err,userDoc)=>{
				// 	if(err){
				// 		throw err
				// 	}else{
				// 		if(userDoc){
				// 			console.log('userDoc是',userDoc);
				// 			userDoc.cartList.forEach((item)=>{
				// 				cartCount += item.itemNumber;
				// 			})

				// 		}

				// 		res.json({
				// 			status: '0',
				// 			result: doc,
				// 			cartCount:cartCount
				// 		})
				// 	}
				// })
						console.log('doc是',doc);
						res.json({
							status: '0',
							result: doc,
							// cartCount:cartCount
						})
				
			}
		}
	})
})

//添加评论接口
router.post('/addComment',(req,res,next)=>{
	//拿到用户的cookieId
	if(req.cookies.userId){
	var userID = req.cookies.userId
	var itemComment = req.body.commentContent
	var modelCode = req.body.modelCode
	var isAnonymous = req.body.isAnonymous
	var rate = req.body.rate
	//创建时间
	var date = sd.format(new Date(), 'YYYYMMDDHHmm');
	//step1:先找到用户
	User.findOne({'userID':userID},(err,userDoc)=>{
	//查找出错
		if(err){
			res.json({
				status: '3',
				msg: err.message
			})
		}else{
	//如果用户存在
			if(userDoc){
	//创建用户的评论数据
		var comment = {
			'userID': userID,
			'date': date,
			'isAnonymous': isAnonymous,
			'comment': itemComment,
			'rate': rate
		}
	//在商品库内查找商品
		Goods.findOne({'ModeCode':modelCode},(err,doc)=>{
	//查找出错
			if(err){
				res.json({
				status: '3',
				msg: err.message
				})
			}
			else{
	//商品存在		
			if(doc){
				doc.ModelComment.push(comment);
				doc.save((err,resDoc)=>{
					if(resDoc){
						res.json({
							status:'0',
							msg: '保存成功'
						})
					}
				})
			}
		}			
	})		
}
	}
	})
	}else{
		res.json({
			status: '3',
			msg: '请先登录(from 评论接口)'
		})
	}
})

//上传图片接口
router.post('/uploadImg',(req,res,next)=>{
	var form = new formidable.IncomingForm();
	//开启上传多张图片属性
	form.multiples = true;
	//设置存放的位置
	form.uploadDir = "/users/ZXIAOH15/Documents/Github/shuuemura/server/uploadfile";
	form.parse(req,(err,fields,files)=>{
        if(err){
            throw err;
        }
        else{
        	console.log(files);
        	//只要判定files.file中的属性存不存在就可以判断它是属于多个上传还是单个上传
        	if(files.file.name){
        		//获取图片的后缀名
        		var extname = path.extname(files.file.name);
        		//设置随机数(为图片编号做准备)
        		var ran = Math.floor(Math.random()*10000 + 8999);
        		//获取当前时间
        		var time = sd.format(new Date(), 'YYYYMMDDHHmm');
        		var oldPath = path.join(files.file.path);
        		var newName = time + ran + extname;
  				var newPath = path.join(__dirname, '../../static/uploadfile',newName);
  				fs.rename(oldPath,newPath,(err)=>{
  					if(err){
  						throw err
  					}else{
  						res.json({
        				status: '0',
        				msg:'上传单张图片成功'
        		})

  					}
  				})        		
        	}
        	else
        	{
        	//设置计数器
        	var num = 0;
        	//设置图片数组长度
			var length = files.file.length;
			//获取当前时间
        	var time = sd.format(new Date(), 'YYYYMMDDHHmm');
			files.file.forEach((item,index)=>{
				//获取图片的后缀名
        		var extname = path.extname(item.name);
        		//设置随机数(为图片编号做准备)
        		var ran = Math.floor(Math.random()*10000 + 8999);
        		//获取图片路径
        		var oldPath = path.join(item.path);
        		var newName = time + ran + extname;
  				var newPath = path.join(__dirname, '../../static/uploadfile',newName);  
  				fs.rename(oldPath,newPath,(err)=>{
  				if(err){
  					throw err
  				}else{
  					num++;
  					if(num == length){
  						res.json({
        					status: '0',
        					msg: '上传多张图片成功',
        				})
  					}
  					
  					}
  				})    	
        		
        		})

        	}

        	
        	}
		})
	})


	//设置商品浏览记录接口
	router.get('/browseHistory',(req,res)=>{
		var firstFlag = false;
		var modelCode = req.query.modelCode;
		var itemCookie = req.cookies.itemCookie;
		//判断是否存在cookie
		//不存在 创建cookie"数组"
		if(!itemCookie){
			itemCookie = [modelCode]
			firstFlag = true;
		}
		//存在 比较cookie内的编号是否存在于数组
		else{
			itemCookie = itemCookie.split('-');
			var isUnique = true;
			itemCookie.forEach((item)=>{
				if(item == modelCode){
					isUnique = false ; 
				}
			});
		}


		//第一次设置cookie
		if(firstFlag ){
			itemCookieString = itemCookie.join('-');
			res.cookie("itemCookie",itemCookieString,{maxAge:1000*60*60});
			res.json({
				status:'0',
				msg:'设置成功'
			})
		}else{
			if(isUnique){
				if(itemCookie.length >= 5){
					itemCookie.shift();
					itemCookie.push(modelCode);
				}else{
					itemCookie.push(modelCode);
				}
				itemCookieString = itemCookie.join('-');
				res.cookie("itemCookie",itemCookieString,{maxAge:1000*60*60});
				res.json({
					status:'0',
					msg:'设置成功'
				})
			}else{
					var currentIndex = itemCookie.indexOf(modelCode);
					itemCookie.splice(currentIndex,1)
					itemCookie.push(modelCode)
					itemCookieString = itemCookie.join('-');
					res.cookie("itemCookie",itemCookieString,{maxAge:1000*60*60});
					res.json({
					status:'1',
					msg:'重复的cookie'
			})

			}	
		}
	})

	//获取浏览历史记录商品
	router.get('/getHistoryMode',(req,res,next)=>{
		var parma = req.query;
		var realLength = Object.keys(parma).length;
		console.log(realLength);
		var newArry = [];
		for(var i = 1; i <= realLength; i++){
			var obj = {};
			obj.ModeCode =  parma['item'+i];
			newArry.push(obj);
		}
		console.log('newArray是',newArry);
		Goods.find({ $or:newArry},(err,doc)=>{
			if(err){
				throw err
			}else{
				if(doc){
					doc.forEach((item1)=>{
						newArry.forEach((item2)=>{
							if(item1.ModeCode == item2.ModeCode){
								item2.ModeCode = item1;
							}
						})
					})
					var newArry3 = [];  
					newArry.forEach((item)=>{
						newArry3.push(item.ModeCode) 
					})

					console.log('newArray3是',newArry3);

					

				}

				res.json({
					status: '0',
					result:newArry3
		})

			}
		})

		
	})




//添加至购物车
router.post('/addCart',(req,res,next)=>{
	//判断用户是否登录
	if(req.cookies.userId){
		//拿到用户id 
		let userId = req.cookies.userId;
		//拿到商品id
		let ModeCode = req.body.modelCode;
		//拿到商品的规格
		let itemStandard =  req.body.itemStandard;
		//拿到商品的购买数量
		let itemNumber = req.body.itemNumber;
		let modeFlag = false;
		let itemFlag = false;
		let newItem = null;
		User.findOne({'userID':userId},(err,userDoc)=>{
			if(err){
				throw err;
			}else{
				if(userDoc){
					console.log('第一步：找到用户')
					var tempArr = [];
					userDoc.cartList.forEach((item)=>{
					console.log('第二步:商品在购物车内')
						if(item.ModeCode == ModeCode){
							modeFlag = true;
							if(item.itemStandard == itemStandard){
							console.log('第三步:规格也在购物车内')
							itemFlag = true;
							item.itemNumber += parseInt(itemNumber);	
							}	
						}
						tempArr.push(item)
					})
				//线路1：旧商品 旧款式
				if(modeFlag&&itemFlag){
					console.log('线路1:旧商品 旧款式')
					User.update({userID:userId},{$set:{cartList:tempArr}},function(err,result){
						if(result){
							console.log(result);
							var cartCount = null;
							userDoc.cartList.forEach((item)=>{
								cartCount +=  parseInt(item.itemNumber)
							})
							res.json({
								status:0,
								msg:"success",
								result:result,
								cartCount: cartCount
							})
						}
					})
				}

				//线路2：新商品 新款式
				if(!modeFlag){
					console.log('线路2：新商品 新款式')
					Goods.findOne({'ModeCode':ModeCode},(err,goodsDoc)=>{
						if(err){
							throw err
						}else{
							if(goodsDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款商品(393)'
								})
							}

							if(goodsDoc){
								var newItem = null;
								goodsDoc.item.forEach((item)=>{
									console.log('线路2：找到款式了')
									if(item.itemStandard == itemStandard){
							//初始化购物车内的商品
									newItem = item;
									newItem.itemNumber = itemNumber;
									}
								})

								if(newItem){
									userDoc.cartList.push(newItem);
									userDoc.save((err,doc)=>{
										if(err){
											throw err;
										}else{
											if(doc){
												var cartCount = null;
												doc.cartList.forEach((item)=>{
													cartCount +=  parseInt(item.itemNumber)
												})
												res.json({
													status:'0',
													result: doc,
													cartCount:cartCount
												})
											}
										}
									})
								}
								else{
									res.json({
										status: '0',
										msg: '找不到该商品款式(426)'
									})
								}
							}//goodsDoc结束
						}	
					})
				}
				
				//线路3 旧商品 新款式
				if(modeFlag&&!itemFlag){
					console.log('线路3：旧商品 新款式')
					Goods.findOne({'ModeCode':ModeCode},(err,goodsDoc)=>{
						if(err){
							throw err
						}else{
							if(goodsDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款商品(393)'
								})
							}
							if(goodsDoc){
								var newItem = null;
								goodsDoc.item.forEach((item)=>{
									console.log('线路3：找到款式了')
									if(item.itemStandard == itemStandard){
							//初始化购物车内的商品
									newItem = item;
									newItem.itemNumber = itemNumber;
									}
								})

								if(newItem){
									userDoc.cartList.push(newItem);
									userDoc.save((err,doc)=>{
										if(err){
											throw err;
										}else{
											if(doc){
												var cartCount = null;
												doc.cartList.forEach((item)=>{
													cartCount +=  parseInt(item.itemNumber)
												})
												res.json({
													status:'0',
													result: doc,
													msg:'旧商品，新规格添加成功',
													cartCount:cartCount
												})
											}
										}
									})
								}
								else{
									res.json({
										status: '0',
										msg: '找不到该商品款式(479)'
									})
								}
							}//goodsDoc结束
						}	
					})
				}	
			}// if(userDoc结束)
		}	
		})//userfindOne结束
	}else{
		//判断离线购物车是否存在
		if(req.cookies.offLineCart){
		//离线购物车存在
		//获取离线购物车的ID
		var visitorID = req.cookies.offLineCart;
		//拿到商品ModeCode
		var ModeCode = req.body.modelCode;
		//拿到商品的规格
		var itemStandard =  req.body.itemStandard;
		//拿到商品的购买数量
		var itemNumber = req.body.itemNumber;
		let modeFlag = false;
		let itemFlag = false;
		let newItem = null;
		//寻找该"用户"
		Temp.findOne({'visitorID': visitorID },(err,doc)=>{
			if(err){
				throw err;
			}else{
				if(doc == null){
					res.json({
						status: '3',
						msg: '查找用户为空'
					})
				}
				//离线用户存在
				if(doc){
					//存放容器
					var tempArr = [];
					doc.cartList.forEach((item)=>{
						if(item.ModeCode == ModeCode){
							modeFlag = true;
						if(item.itemStandard == itemStandard){
							itemFlag = true;
							item.itemNumber += itemNumber; 
						}
					}	
					tempArr.push(item);
				})

				if(modeFlag&&itemFlag){
				//旧商品 旧款式

				}else{
					Goods.findOne({'ModeCode':ModeCode},(err,goodsDoc)=>{
						if(err){
							throw err
						}else{
							if(goodsDoc == null){
								res.json({
									status:'3',
									msg:'找不到该款商品(393)'
								})
							}

							if(goodsDoc){
								var newItem = null;
								goodsDoc.item.forEach((item)=>{
									console.log('线路2：找到款式了')
									if(item.itemStandard == itemStandard){
							//初始化购物车内的商品
									newItem = item;
									newItem.itemNumber = itemNumber;
									}
								})

								if(newItem){
									userDoc.cartList.push(newItem);
									userDoc.save((err,doc)=>{
										if(err){
											throw err;
										}else{
											if(doc){
												var cartCount = null;
												doc.cartList.forEach((item)=>{
													cartCount +=  parseInt(item.itemNumber)
												})
												res.json({
													status:'0',
													result: doc,
													cartCount:cartCount
												})
											}
										}
									})
								}
								else{
									res.json({
										status: '0',
										msg: '找不到该商品款式(426)'
									})
								}
							}//goodsDoc结束
						}	
					})

				}




				}//离线购物车doc结束
			}
		})

		res.json({
			status: '0',
			msg: '离线购物车存在'
		})
		}else{

		//离线cookie不存在
			//拿到商品id
			var ModeCode = req.body.modelCode;
			//拿到商品的规格
			var itemStandard =  req.body.itemStandard;
			//拿到商品的购买数量
			var itemNumber = req.body.itemNumber;
			//设置随机数
			var ran1 = Math.floor(Math.random()*10000 + 8999);
			var ran2 = Math.floor(Math.random()*10000 + 8999);
        	//获取当前时间
        	var time = sd.format(new Date(), 'YYYYMMDDHHmm');
        	var cookieName = ran1+''+time+ran2; 
        	//定义容器
        	var tempCartList = null;

			//设置cookie值
			res.cookie('offLineCart',cookieName,{maxAge: 1000*60*60*24})


			Goods.findOne({'ModeCode':ModeCode},(err,doc)=>{
				if(err){
					throw err;
				}else{
					if(doc){
						doc.item.forEach((item)=>{
						if(item.itemStandard == itemStandard){
							tempCartList = item;
							tempCartList.itemNumber = itemNumber;
							}
						})

						var temp = new Temp({
						"visitorID" : cookieName,
						"cartList":[tempCartList]
						})

						temp.save((err,doc)=>{
							if(err){
								res.json({
									status:'3',
									msg: err.message
								})
							}else{
								res.json({
									status:'0',
									msg:'离线购物车创建成功'
								})
							}
						})
					}


				}
			})
			
			

		}//离线购物车不存在
	}
})




// router.post('/addCart',(req,res,next)=>{
// 	//用户是否登录
// 	if(req.cookies.userId){
		
// 		//第一步：查找用户
// 		console.log('第一步：查找用户')
// 		User.findOne({'userID':userId},(err,userDoc)=>{
// 			if(userDoc){
// 				console.log('找到用户');
// 				var tempArr = []

// 				userDoc.cartList.forEach((item)=>{
// 					if(item.ModeCode === modelCode && item.itemStandard === itemStandard){
						
// 					}

// 					tempArr.push(item)				

// 					})
// 				}

// 				User.update({userID:userId},{$set:{cartList:tempArr}},function(err,result){
// 					if(result){
// 						res.status(200).json({status:0,msg:"success",result:result})
// 					}
// 				})
// 		})//User.findOne结束
// 	}else{
// 		if(req.cookies.offLineCart){
// 		let params = {'visitorID': req.cookies.offLineCart }
// 		let itemName = req.body.itemStandard;
// 		let num = req.body.itemNumber;
// 		let ModeCode = req.body.modelCode;
// 		let goodModel = ''
// 		let goodItem = ''

// 		console.log(params);
// 		Temp.findOne(params,(err,temDoc)=>{
// 			if(err){
// 				res.json({
// 					status:'3',
// 					msg: err.message
// 				})
// 			}else{
// 				if(temDoc){
// 					temDoc.cartList.forEach((item)=>{

// 						if(item.modeCode == ModeCode){
// 							goodModel = item;
// 						if(item.Name == itemName){
// 							goodItem = item;
// 							item.itemNumber++
// 							}
// 						}

						


// 					})

// 			}//下面开始写代码
// 			if(!goodModel){
// 				//线路1
// 				//寻找到该款mdoel
// 					console.log('线路1：model没有在购物车内');
// 					console.log('线路1：寻找商品内的Good')
// 					Goods.findOne({'ModeCode':ModeCode},(err,goodDoc)=>{
// 						if(err){
// 							res.json({
// 								status:'3',
// 								msg:err.message
// 							})
// 						}else{
// 							if(goodDoc == null){
// 								res.json({
// 									status:'3',
// 									msg:'找不到该款产品，添加失败(65)'
// 								})
// 							}
// 						//如果找到商品，判断是否有该商品规格
							
// 							if(goodDoc){
// 								var selectedItem = ''
// 						console.log('线路1：寻找到商品')
// 								goodDoc.item.forEach((item)=>{
// 						//如果该商品规格存在
// 						console.log('线路1：寻找到商品规格')
// 									if(item.itemStandard == itemName){
// 						//初始化商品
// 										selectedItem = item;
// 										selectedItem.Number = 0;
// 										selectedItem.Number += num;
// 										selectedItem.ModeCode = ModeCode;
// 										//需要添加价格 待做
// 									}
// 								})
// 						console.log('线路1：商品规格是:',selectedItem)
// 						//判断item是否存在
// 							if(selectedItem){
// 						//将商品添加至用户购物车
// 								temDoc.cartList.push(selectedItem);
// 								temDoc.save((err,doc)=>{
// 								if(err){
// 									res.json({
// 									//查找不到 统一为3
// 									status:'3',
// 									msg: err.message
// 									})
// 								}else{
// 									if(doc){
// 										console.log('线路1：添加新的商品+新的规格至购物车成功')
// 										res.json({
// 										status:'0',
// 										msg: '新的商品规格添加成功(离线状态)'
// 										})
// 									}
// 								}
// 							})
// 							}
// 							//item不存在
// 							else{
// 						console.log('线路1：添加新的商品+新的规格至购物车失败')
// 									res.json({
// 									status:'0',
// 									msg: '找不到该款产品下的规格，添加失败(163)'
// 									})
// 							    }
// 							}
// 						}
// 					})
// 				}// 添加新的商品+新的规格 结束

// 								//购物车内存在商品
// 				if(goodModel){
// 				//存在新的规格
// 				if(goodItem){
// 				//线路2开始
// 				temDoc.save((err1,doc1)=>{
// 							if(err1){
// 								res.json({
// 									status:'3',
// 									msg: err.message
// 									})
// 								}
// 							else{
// 							if(doc1){
// 							console.log('此时doc值是',doc1)
// 							res.json({
// 								status:'0',
// 								msg:'线路2：添加旧商品+就规格成功(离线状态324)'
// 							})
// 								return;
// 								console.log('还能执行么？')
// 						}
// 					}
// 				})
// 				//线路2结束
// 				}
// //线路3：旧商品 新规格
// 				else{
// 					Goods.findOne({'ModeCode':ModeCode},(err,goodDoc)=>{
// 						if(err){
// 							res.json({
// 								status:'3',
// 								msg:err.message
// 							})
// 						}else{
// 							if(goodDoc == null){
// 								res.json({
// 									status:'3',
// 									msg:'找不到该款产品，添加失败(204)'
// 								})
// 							}

// 							if(goodDoc){
// 								var selectedItem = ''
// 								goodDoc.item.forEach((item)=>{
// 								//如果该商品规格存在
// 									if(item.itemStandard == itemName){
// 									//初始化商品
// 										selectedItem = item;
// 										selectedItem.Number = 0;
// 										selectedItem.Number += num;
// 										selectedItem.modeCode = ModeCode;
// 										selectedItem.Name = itemName;
// 									}
// 								})

// 								if(selectedItem){
// 									console.log("备选商品",selectedItem);
									
// 									temDoc.cartList.push(selectedItem);
// 									temDoc.save((err,doc)=>{
// 										if(err){
// 											res.json({
// 												status:'1',
// 												msg: err.message
// 											})
// 										}else{
// 											if(doc){
// 												res.json({
// 													status:'0',
// 													msg:'旧商品，新规格添加成功(离线)'
// 												})
// 											}
// 										}

// 									})
// 								}
// 							}


// 						}
// 					})



// 				}


// 				}



// 			}
// 		})
// 		//离线cookie存在
			
// 		}
// 		else{
// 		//离线cookie不存在
// 			let itemName = req.body.itemStandard;
// 			let num = req.body.itemNumber;
// 			//创建一个随机订单号
// 			let cookieName = Math.floor(Math.random()*1000000);
// 			//设置cookie值
// 			res.cookie('offLineCart',cookieName,{
// 				maxAge: 1000*60*60*24
// 			})


// 		//创建新的离职cookie
// 			var temp = new Temp({
// 				"visitorID" : cookieName,
// 				"cartList":[{
// 				"modeCode": req.body.modelCode,
//     			"Name": itemName,
//     			"Number": num
// 				}]
// 			})

// 		temp.save((err,doc)=>{
// 			if(err){
// 				res.json({
// 					status:'3',
// 					msg: err.message
// 				})
// 			}else{
// 				if(doc){
// 					res.json({
// 						status:'0',
// 						msg:'离线购物车创建成功'
// 					})

// 				}
// 			}
// 		})




// 		}
		
// 	}

// })//router.post请求结束




module.exports = router;