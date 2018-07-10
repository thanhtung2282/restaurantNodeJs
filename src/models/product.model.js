const mongoose = require('mongoose');

const { Schema } = mongoose;

productSchema = new Schema({
    name: { type: String, required: true, trim: true ,unique: true},
    quantity: { type: Number, required: true, trim: true},
    cost: { type: Number, required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    category: {type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
    image: {type: String,trim: true}
});
const Product = mongoose.model('Product', productSchema);

module.exports = {Product};