//引入mongoose模块
var mongoose = require('mongoose');
//获取数据库模型骨架
var Schema = mongoose.Schema;

var productSchema = new Schema({
	//数据结构: 模型字段 模型数据类型
	//商品code 唯一性
	"ModeCode": Number,
	//产品中文名
	"ModelChName": String,
	//产品英文名
	"ModelEngName": String,
	//产品初始价
	"ModelOriginPrice": Number,
	//商品描述
	"ModelDescripition": String,
	//商品成分
	"ModelComposition": String,
	//商品用处
	"ModelUsage": String,
	//商品封面图
	"ModelCoverImg": String,
	//商品详情图
	"ModelDetailImg": String,
	//商品评分
	"ModelComment": Array,
	//产品规格/分类
	"item": Array,
	//一级分类
	"departmentCode": String,
	//二级分类
	"subDepartmentCode": String,
	//三级分类
	"familyCode": String,
	
})

//匿名输出model模型 输出去之后 可以基于它的模型 调用它的API方法
module.exports = mongoose.model('Good',productSchema,"goods");
