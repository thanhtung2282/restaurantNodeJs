const mongoose = require('mongoose');

const { Schema } = mongoose;

areaSchema = new Schema({
    name: { type: String, required: true, trim: true ,unique: true},
    position: {type: Number, required: true, trim: true}
});
const Area = mongoose.model('Area', areaSchema);

module.exports = {Area};