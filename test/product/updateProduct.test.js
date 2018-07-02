const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Product } = require('../../src/models/product.model');
const { productService } = require('../../src/services/product.services');
const { CategoryService } = require('../../src/services/category.services');
const { Category } = require('../../src/models/category.model');

describe('TEST PUT PRODUCT/', () => {
    let idCate_1,idCate_2,idProduct;
    beforeEach('create cate and product for test',async()=>{
        const cate1 =  await CategoryService.createCategory("Phần Ăn Trẻ Em");
        idCate_1 = cate1._id;
        const cate2 =  await CategoryService.createCategory("Phần Ăn Người Lớn");        
        idCate_2 = cate2._id;
        const product =  await productService.createProduct("Gà rán",50,50000,150000,idCate_1);        
        idProduct = product._id;
    })
    it('Can update product', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:40000, 
            price:140000, 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product} = response.body;
        equal(success,true);
        equal(product.name,'Gà rán update');
        equal(product.quantity,40);
        equal(product.cost,40000);
        equal(product.price,140000);
        equal(product.category,idCate_2);
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán update');
        equal(productDb.quantity,40);
        equal(productDb.cost,40000);
        equal(productDb.price,140000);
        equal(productDb.category._id.toString(),idCate_2); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product without name', async() => {
        const body = {
            name:'', 
            quantity:40, 
            cost:40000, 
            price:140000, 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,400);
        equal(message,'NAME_MUST_BE_PROVIDE');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product without quantity', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:'', 
            cost:40000, 
            price:140000, 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,400);
        equal(message,'QUANTITY_MUST_BE_PROVIDE');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product without cost', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:'', 
            price:140000, 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,400);
        equal(message,'COST_MUST_BE_PROVIDE');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product without price', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:40000, 
            price:'', 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,400);
        equal(message,'PRICE_MUST_BE_PROVIDE');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product without idCate', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:40000, 
            price:410000, 
            idCate:''
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,400);
        equal(message,'INVALID_ID');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product wrong idCate', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:40000, 
            price:410000, 
            idCate:'9b39f6ca6e2b9a2f109640de'
        }
        const response = await supertest(app).put('/product/'+idProduct).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,404);
        equal(message,'CANNOT_FIND_CATEGORY');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product invalid idProduct', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:40000, 
            price:410000, 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/'+idProduct+1).send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,400);
        equal(message,'INVALID_ID');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
    it('Cannot update product wrong idProduct', async() => {
        const body = {
            name:'Gà rán update', 
            quantity:40, 
            cost:40000, 
            price:410000, 
            idCate:idCate_2
        }
        const response = await supertest(app).put('/product/9b39f6ca6e2b9a2f109640de').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(response.status,404);
        equal(message,'CANNOT_FIND_PRODUCT');
        const productDb = await Product.findById(idProduct).populate('category');

        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate_1); 
        equal(productDb.category.products[0].toString(),idProduct); 
    });
});