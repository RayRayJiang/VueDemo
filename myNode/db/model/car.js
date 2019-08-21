const mongoose = require('mongoose');

// 1.定义一个集合的结构，这个集合中的每个数据有哪些字段
const carsSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    goodsId: { type: String, required: true },
    goodsName: { type: String, required: true },
    goodsImg: { type: String, required: true },
    goodsPrice: { type: Number, required: true },
    buySku: String,
    isChoose: Boolean,


    buyNum: { type: Number, default: 1 }
})

// 2.实例化一个操作用户集合的model
const Cars = mongoose.model('cars', carsSchema);

// 3.导出这个model
module.exports = Cars;
