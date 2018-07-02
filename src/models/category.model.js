const mongoose = require('mongoose');

const { Schema } = mongoose;

categorySchema = new Schema({
    name: { type: String, required: true, trim: true ,unique: true},
    products: [{type:mongoose.SchemaTypes.ObjectId,ref:'Product'}],
});
const Category = mongoose.model('Category', categorySchema);

module.exports = {Category};