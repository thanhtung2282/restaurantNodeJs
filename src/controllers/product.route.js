const {Router} = require('express');
const multer = require('multer');

const {productService} = require('../services/product.services');

const producRouter = Router();
producRouter.get('/',(req,res)=>{
    productService.getALL()
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
producRouter.delete('/:idProduct',(req,res)=>{
    productService.removeProduct(req.params.idProduct)
    .then(product => res.send({success:true, product}))
    .catch(res.onError);
});
//upload
const storage = multer.diskStorage ({
    destination:(req,file,cb) => cb(null,'src/public'),
    filename:(req,file,cb) => {
        const dotIndex = file.originalname.lastIndexOf('.');
        const fileExtension = file.originalname.substring(dotIndex + 1);
        cb(null,`${Date.now()}.${fileExtension}`);
    }
});
const upload = multer({storage});
producRouter.post('/upload',upload.single('image'),(req,res)=>{
    console.log(req.file.filename)
    productService.uploadProduct(req.body.id,req.file.filename)
    .then(product => res.send({success:true, product}))
    .catch(res.onError);
});

module.exports = {producRouter};