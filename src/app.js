const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const {userRouter} = require('./controllers/user.route');
const {cateRouter} = require('./controllers/category.route');
const {producRouter} = require('./controllers/product.route');
const {areaRouter} = require('./controllers/area.route');
const {tableRouter} = require('./controllers/table.route');
const path = require('path');
const app = express();
app.use(cors());

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
app.use('/category',cateRouter);
app.use('/area',areaRouter);
app.use('/table',tableRouter);
app.use('/product',producRouter);
// app.use(express.static('src/public'));
app.get('/upload/:name',(req,res)=>{
    const name  = req.params.name;
    res.sendFile(path.join(__dirname, 'public', `${name}`));

})
module.exports = {app};