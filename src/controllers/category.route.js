const {Router} = require('express');

const {CategoryService} = require('../services/category.services');

const cateRouter = Router();
cateRouter.get('/',(req,res)=>{
    CategoryService.getAll()
    .then(cate => res.send({success:true, cate}))
    .catch(res.onError);
});

cateRouter.post('/',(req,res)=>{
    //get data
    const {name} = req.body;
    //create
    CategoryService.createCategory(name)
    .then(cate => res.send({success:true, cate}))
    .catch(res.onError);
});


module.exports = {cateRouter};