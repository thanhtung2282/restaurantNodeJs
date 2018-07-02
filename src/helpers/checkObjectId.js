const mongoose = require('mongoose');
const {MyError} = require('./my-error');
function checkObjectId(...ids){ //ids[]
    try {
        ids.forEach(id => mongoose.Types.ObjectId(id.toString()));
    } catch (error) {
        throw new MyError('INVALID_ID',400);
    }
}
module.exports = {checkObjectId};