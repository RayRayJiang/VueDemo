const express = require('express');
const Goods = require('../db/model/goods')

const router = express.Router();

//蛋糕,下午茶列表
router.post('/typelist', (req, res) => {
    let { pageNum, pageSize, goodsType } = req.body;
    pageNum = pageNum * 1 || 1
    pageSize = pageSize * 1 || 8
    Goods.find(
        !goodsType ? {} : {goodsType}
    )
    .skip((pageNum - 1) * pageSize) // 先跳过前面pageNum-1页数据
    .limit(pageSize) // 再取剩下这一页上的数据
    .then((data) => {
        res.send({
            code: 1,
            msg: "获取商品列表成功",
            list: data
        })
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: 1,
            msg: "获取商品列表失败",
        })
    })
})

//蛋糕组件列表
router.post('/cakelist', (req, res) => {
    let { pageNum, pageSize, goodsType, rank, order, goodsTaste,keyWord, start, end } = req.body;
    pageNum = pageNum * 1 || 1
    pageSize = pageSize * 1 || 8
    const regExp = new RegExp(keyWord, 'ig')
    Goods.find(
        {
            goodsName: { $regex: regExp }
        }
    )
    .find(
        !goodsType ? {} : {goodsType}
    )
    .sort(
        !rank ? {} : {[rank] : order}
    )
    .find(
        goodsTaste == "全部" ? {} : {goodsTaste: goodsTaste}
    )
    .find({
        goodsPrice: {
            $gte: !start ? 1 : start,
            $lte: !end ? 99999999 : end
        }
    })
    .skip((pageNum - 1) * pageSize) // 先跳过前面pageNum-1页数据
    .limit(pageSize) // 再取剩下这一页上的数据
    .then((data) => {
        res.send({
            code: 1,
            msg: "获取商品列表成功",
            list: data
        })
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: 1,
            msg: "获取商品列表失败",
        })
    })
})


// 商品详情
router.post('/detail', (req, res) => {
    const { goodsId } = req.body;
    Goods.findOne({
        _id: goodsId
    })
    .then((data) => {
        if(data){
            res.send({
                code: 1,
                msg: '获取商品详情成功',
                data: data
            })
        }else{
            res.send({
                code: -1,
                msg: '获取商品详情失败'
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: -1,
            msg: '获取商品详情失败'
        })
    })
})




// 轮播
router.post('/swiper', (req, res) => {
    Goods.find({})
    .sort({
        goodsNum: -1
    })
    .limit(5)
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取图片成功',
            list: data
        })    
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: 1,
            msg: '获取图片失败',
        })
    })
})

// 移动端商品列表
router.post('/list2', (req, res) => {
    let { pageNum, pageSize, keyWord, goodsType, rank, order, startVal, endVal } = req.body;
    pageNum = pageNum * 1 || 1
    pageSize = pageSize * 1 || 10
    // 定义一个正则表达式
    const regExp = new RegExp(keyWord, 'ig')
    Goods.find({
        $or: [
            {
                goodsTitle: { $regex: regExp }
            },
            {
                goodsName: { $regex: regExp }
            }
        ]
    })
    // 内容分类
    .find(
        goodsType*1 === 0 ? {} : {goodsType: goodsType*1} // 传过来的goodsType数据类型已变为字符串
    )
    // 排序
    .sort(
        !rank ? {} : {[rank]: order}
    )
    // 价格筛选
    .find({
        goodsPrice: {
            $gte: startVal,
            $lte: endVal
        }
    })
    .skip((pageNum - 1) * pageSize) // 先跳过前面pageNum-1页数据
    .limit(pageSize) // 再取剩下这一页上的数据
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取商品列表成功',
            list: data
        })
    })
    .catch(() => {
        res.send({
            code: -1,
            msg: '获取商品列表失败'
        })
    })
})


module.exports = router;