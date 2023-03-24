const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
var authenticate =  require('../authenticate');
const cors = require('./cors');
const Product= require('../models/products');
// const { json } = require('express');
const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.options(cors.corsWithOptions, (req,res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Product.find({})
    .then((products) => {
      res.statusCode = 200;
      res.json(products);
     },(err) => next(err))
  .catch((err) => next(err))
  })  
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Product.create(req.body)
  .then((product) => {
      console.log('Leader Created', product);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(product);
      },(err) => next(err))
  .catch((err) => next(err));
  })  
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Product.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    },(err) => next(err))
.catch((err) => next(err));     
}); 

module.exports = productRouter;