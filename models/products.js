const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

var productSchema = new Schema({
      _id: { 
        type: String,
        default: shortid.generate 
      },
      title: String,
      description: String,
      image: String,
      price: Number,
      availableSizes: [String],
    });

  var Products = mongoose.model('Product', productSchema);
  module.exports = Products;