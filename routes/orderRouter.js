const express = require('express');
const bodyParser = require('body-parser');
// const mongoose= require('mongoose');
var authenticate =  require('../authenticate');
const cors = require('./cors');
const Order= require('../models/orders');
// const { json } = require('express');
const orderRouter = express.Router();

orderRouter.use(bodyParser.json());

orderRouter.route('/')
.options(cors.corsWithOptions, (req,res) => { res.sendStatus(200); })
.get(cors.cors, async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  })
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, async (req, res) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Order.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    },(err) => next(err))
.catch((err) => next(err));     
}); 
  module.exports = orderRouter;