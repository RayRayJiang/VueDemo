const mongoose = require('mongoose');

// 1.定义一个集合的结构，这个集合中的每个数据有哪些字段
const goodsSchema = new mongoose.Schema({
    goodsName: { type: String, required: true },
    goodsImg: { type: String, required: true },
    goodsPrice: { type: Number, required: true },
    goodsNum: { type: Number, default: 0 },
    goodsTitle: String, // 描述
    goodsTag: String, // 折扣标签
    goodsType: String, // 商品类别: 1代表早餐，2下午茶，3生日蛋糕
    goodsSkus: { type: Array, required: true }, // 可选规格
    goodsTaste: String, // 口味
    goodsSweet: String // 甜度

})

// 2.实例化一个操作用户集合的model
const Goods = mongoose.model('goods', goodsSchema);

// 3.导出这个model
module.exports = Goods;
