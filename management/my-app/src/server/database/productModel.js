const mongoose = require("mongoose");
const productSchema = require("./productSchema");
const Products = mongoose.model("Products", productSchema);
module.exports = Products;
