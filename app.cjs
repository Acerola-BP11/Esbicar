var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productsRouter = require('./routes/product');
var usersRouter = require('./routes/users');
var clientsRouter = require('./routes/clients');
var salesRouter = require('./routes/sale');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);
app.use('/user', usersRouter);
app.use('/client', clientsRouter);
app.use('/sales', salesRouter);

module.exports = app;
