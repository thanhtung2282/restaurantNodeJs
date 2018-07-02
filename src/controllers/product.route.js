const {Router} = require('express');

const {productService} = require('../services/product.services');

const producRouter = Router();
producRouter.get('/',(req,res)=>{
    productService.getAll()
    .then(product => res.send({success:true, product}))
    .catch(res.onError);
});

producRouter.post('/',(req,res)=>{
    //get data
    const { name, quantity, cost, price, idCate} = req.body;
    //create
    productService.createProduct(name, quantity, cost, price, idCate)
    .then(product => res.send({success:true, product}))
    .catch(res.onError);
});
producRouter.put('/:idProduct',(req,res)=>{
    //get data
    const { name, quantity, cost, price, idCate} = req.body;
    //create
    productService.updateProduct(name, quantity, cost, price, idCate,req.params.idProduct)
    .then(product => res.send({success:true, product}))
    .catch(res.onError);
});


module.exports = {producRouter};