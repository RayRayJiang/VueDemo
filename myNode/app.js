// 内置模块，nodejs自带的模块
var path = require('path'); // 处理服务器上的各种路径问题

// 第三方模块，就是需要手动下载并安装的模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // 解决跨域问题

// 连接数据库
require('./db/connect.js');

// 自定义模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var carRouter = require('./routes/car');

// 实例化express，后面所有的操作全是针对这个app
var app = express();

// 设置模板引擎为ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 使用nodejs的中间件，摆放到实例化和使用路由之间
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // 处理跨域


// 使用路由文件
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
app.use('/car', carRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
