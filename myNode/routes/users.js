var express = require('express');
var router = express.Router();
var Users = require('../db/model/users');
var jwt = require('../utils/jwt');

// 注册
router.post('/register', (req, res) => {
	const { userName, userPwd, userTel } = req.body;
	Users.findOne({
		$or: [
			{userName: userName},
			{userTel: userTel}
		]
	})
	.then((result) => {
		if(result){
			res.send({
				code: 0,
				msg: "用户昵称或手机号已存在"
			})
		}else{
			return Users.insertMany({
				userName,
				userPwd,
				userTel
			})
		}
	})
	.then(() => {
		res.send({
			code:1,
			msg: "注册成功"
		})
	})
	.catch((err) => {
		console.log(err);
		res.send({
			code: -1,
			msg: "注册失败"
		})
	})
})

// 登录
router.post('/login', (req, res) => {
	const { keyWord, userPwd } = req.body;
	Users.findOne({
		$or: [
			{ userName: keyWord },
			{ userTel: keyWord }
		]
	})
	.then((data) => {
		if(data){
			if(data.userPwd == userPwd){
				// 登录成功生成token，并返回给前端
				const token = jwt.createToken({ keyWord });
				res.send({
					code: 1,
					msg: "登录成功",
					token
				})
			}else{
				res.send({
					code: 0,
					msg: "密码错误"
				})
			}
		}else{
			res.send({
				code: 0,
				msg: "用户昵称或手机号不存在"
			})
		}
	})
	.catch((err) => {
		console.log(err);
		res.send({
			code: -1,
			msg: "登录失败"
		})
	})

})

module.exports = router;
