
const mongoose = require('mongoose');

const { Schema } = mongoose;

tableSchema = new Schema({
    name: { type: String, required: true, trim: true},
    area:{type:mongoose.SchemaTypes.ObjectId,ref:'Area'}
});
const Table = mongoose.model('Table', tableSchema);

module.exports = {Table};