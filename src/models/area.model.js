const mongoose = require('mongoose');

const { Schema } = mongoose;

areaSchema = new Schema({
    name: { type: String, required: true, trim: true ,unique: true},
    tables: [{type:mongoose.SchemaTypes.ObjectId,ref:'Table'}]
});
const Area = mongoose.model('Area', areaSchema);

module.exports = {Area};