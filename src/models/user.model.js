const mongoose = require('mongoose');

const { Schema } = mongoose;

userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
});
const User = mongoose.model('User', userSchema);
module.exports = { User };
