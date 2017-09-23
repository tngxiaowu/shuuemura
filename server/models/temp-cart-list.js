//引入mongoose模块
var mongoose = require('mongoose');
//获取数据库模型骨架
var Schema = mongoose.Schema;

var tempCartKistSchema = new Schema({
	"visitorID" : String,
	"cartList":	Array
    
})

//匿名输出model模型 输出去之后 可以基于它的模型 调用它的API方法
module.exports = mongoose.model('TempCartList',tempCartKistSchema,"tempCartList");
