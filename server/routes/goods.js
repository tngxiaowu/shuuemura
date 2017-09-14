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

//商品详情页加载商品信息接口
router.get('/itemDetail',(req,res,next)=>{
	var parma = {'ModeCode': req.query.modelCode}
	Goods.findOne(parma,(err,doc)=>{
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
		if(!itemCookie){
			itemCookie = [modelCode]
			firstFlag = true;
		}else{
			itemCookie = itemCookie.split('-');
			var isUnique = true;
			itemCookie.forEach((item)=>{
				if(item == modelCode){
					isUnique = false ; 
				}
			});
		}
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
				res.json({
				status:'1',
				msg:'重复的cookie'
			})

			}	
		}
	})

	//获取浏览历史记录商品
	router.get('/getHistoryMode',(req,res,next)=>{
		var item1 = req.query.item1
		var item2 = req.query.item2
		var item3 = req.query.item3
		var item4 = req.query.item4
		console.log(item1,item2,item3,item4);
		res.json({
			status: '0',
			msg:'连接成功'
		})
	})




//添加至购物车
// router.post('/addCart',(req,res,next)=>{
// 	if(req.cookies.userId){
// 		//拿到用户id 
// 		let userId = req.cookies.userId;
// 		//拿到商品id
// 		let modelCode = req.body.modelCode;
// 		console.log(modelCode);
// 		//拿到商品的规格
// 		let itemStandard =  req.body.itemStandard;
// 		//拿到商品的购买数量
// 		let itemNumber = req.body.itemNumber;
// 		console.log(typeof itemNumber);
// 		//第一步：查找用户
// 		console.log('第一步：查找用户')
// 		User.findOne({'userID':userId},(err,userDoc)=>{
// 			if(userDoc){
// 				console.log(userDoc)
// 				var tempArr = []

// 				userDoc.cartList.forEach((item)=>{
// 					if(item.ModeCode === modelCode && item.itemStandard === itemStandard){
// 						item.itemNumber +=1
// 					}

// 					tempArr.push(item)				

// 					})
// 				}

				// User.update({userID:userId},{$set:{cartList:tempArr}},function(err,result){
				// 	if(result){
				// 		res.status(200).json({status:0,msg:"success",result:result})
				// 	}
				// })

			
		
		
			
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