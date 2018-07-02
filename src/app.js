const express = require('express');
const {json} = require('body-parser');

const {userRouter} = require('./controllers/user.route');

const app = express();

app.use(json());
//onError MD
app.use((req,res,next)=>{
    res.onError = function(error){
        const body = {success:false, message:error.message};
        if(!error.statusCode) console.log(error);
        res.status(error.statusCode || 500 ).send(body);
    }
    next();
})

app.use('/user',userRouter);

module.exports = {app};