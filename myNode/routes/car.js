const express = require('express');
const jwt = require('../utils/jwt');
const Cars = require('../db/model/car');
const Goods = require('../db/model/goods');

const router = express.Router();

let userName;

router.use('/', (req, res, next) => {
    const { token } = req.body;
    jwt.checkToken(token)
        .then((data) => { // 校验成功
            userName = data['keyWord']; // 获取token里的用户名
            next();
        })
        .catch(() => { // 校验失败
            res.send({
                code: -2,
                msg: '用户未登录'
            });
        });
});

// 添加商品
router.post('/add', (req, res) => {
    const { goodsId, buyNum, buySku, skusPrice, isChoose } = req.body;
    Cars.findOne({
        goodsId: goodsId,
        buySku: buySku
    })
    .then((data) => {
        if (data) { // 用户如果购买过此商品，刷新商品数量
            Cars.updateOne(data,
            {
                $set: { buyNum: data['buyNum'] + buyNum * 1 }
            })
            .then(() => {
                res.send({
                    code: 1,
                    msg: '添加商品成功'
                });
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    code: -1,
                    msg: '添加商品失败'
                });
            })
        } else { // 如果用户没买过此商品，则将商品信息加入购物车列表
            Goods.findOne({
                _id: goodsId
            })
            .then((data) => {
                Cars.insertMany({
                    userName: userName,
                    goodsName: data.goodsName,
                    goodsId: data._id,
                    goodsPrice: skusPrice,
                    goodsImg: data.goodsImg,
                    buyNum: buyNum ,
                    buySku: buySku,
                    isChoose
                })
                .then(() => {
                    res.send({
                        code: 1,
                        msg: '添加商品成功'
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.send({
                        code: -1,
                        msg: '添加商品失败'
                    });
                })
            })
        }
    })
});

// 根据登录用户的userName，获取购物车商品列表
router.post('/list', (req, res) => {
    Cars.find({
        userName: userName
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取商品列表成功',
            list: data,
            userName
        });
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: -1,
            msg: '获取商品列表失败'
        });
    })
});


// 购物车增减商品数量
router.post('/update', (req, res) => {
    // 根据传的参数num为1或-1来控制加减
    const { id, num } = req.body;
    Cars.findOne({
        _id: id
    }) 
    .then((data) => {
        return Cars.updateOne(data,
            {
                $set: {buyNum: num*1 > 1 ? num*1 : 1}
            }
        )
    })
    .then(() => {
        res.send({
            code: 1,
            msg: '更新购物车成功'
        });
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code:-1,
            msg: '更新购物车失败'
        });
    })
});

// 删除购物车里的商品
router.post('/del', (req, res) =>{
    const {id} = req.body; // 此处的的goodsId是多个字符串

    const goodsId_arry = id.split(',') // 将多个字符串转为数组
    Cars.deleteMany({
        _id: {
            $in: goodsId_arry
        }
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '删除成功',
            list: data
        });
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: -1,
            msg: '删除失败'
        });
    })
});

// 结算物品列表
router.post('/settlement', (req, res) =>{
    const {id} = req.body; // 此处的的goodsId是多个字符串

    const goodsId_arry = id.split(',') // 将多个字符串转为数组
    Cars.find({
        _id: {
            $in: goodsId_arry
        }
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取列表成功',
            list: data
        });
    })
    .catch((err) => {
        console.log(err);
        res.send({
            code: -1,
            msg: '获取列表失败'
        });
    })
});



module.exports = router;
