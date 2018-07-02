const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Product } = require('../../src/models/product.model');
const { productService } = require('../../src/services/product.services');
const { CategoryService } = require('../../src/services/category.services');
const { Category } = require('../../src/models/category.model');

describe.only('TEST POST PRODUCT/', () => {
    let idCate;
    beforeEach('create cate for test',async()=>{
        const cate =  await CategoryService.createCategory("Phần Ăn Trẻ Em");
        idCate = cate._id;
    })
    it('Can create product', async() => {
        const body = {
            name:'Gà rán', 
            quantity:50, 
            cost:50000, 
            price:150000, 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product} = response.body;
        equal(success,true);
        equal(product.name,'Gà rán');
        equal(product.quantity,50);
        equal(product.cost,50000);
        equal(product.price,150000);
        equal(product.category,idCate);
        const productDb = await Product.findById(product._id).populate('category');
        equal(productDb.name,'Gà rán');
        equal(productDb.quantity,50);
        equal(productDb.cost,50000);
        equal(productDb.price,150000);
        equal(productDb.category._id.toString(),idCate); 
    });
    it('Cannot create product without name', async() => {
        const body = {
            name:'', 
            quantity:50, 
            cost:50000, 
            price:150000, 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');
        equal(response.status,400);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product without quantity', async() => {
        const body = {
            name:'Gà rán', 
            quantity:'', 
            cost:50000, 
            price:150000, 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'QUANTITY_MUST_BE_PROVIDE');
        equal(response.status,400);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product without cost', async() => {
        const body = {
            name:'Gà rán', 
            quantity:50, 
            cost:'', 
            price:150000, 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'COST_MUST_BE_PROVIDE');
        equal(response.status,400);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product without price', async() => {
        const body = {
            name:'Gà Rán', 
            quantity:50, 
            cost:50000, 
            price:'', 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'PRICE_MUST_BE_PROVIDE');
        equal(response.status,400);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product without price', async() => {
        const body = {
            name:'Gà Rán', 
            quantity:50, 
            cost:50000, 
            price:'', 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'PRICE_MUST_BE_PROVIDE');
        equal(response.status,400);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product without idCate', async() => {
        const body = {
            name:'Gà Rán', 
            quantity:50, 
            cost:50000, 
            price:150000, 
            idCate:''
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'INVALID_ID');
        equal(response.status,400);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product with wrong idCate', async() => {
        const body = {
            name:'Gà Rán', 
            quantity:50, 
            cost:50000, 
            price:150000, 
            idCate:'9b39f6ca6e2b9a2f109640de'
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'CANNOT_FIND_CATEGORY');
        equal(response.status,404);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
    it('Cannot create product with cate removed', async() => {
        await Category.remove({});
        const body = {
            name:'Gà Rán', 
            quantity:50, 
            cost:50000, 
            price:150000, 
            idCate
        }
        const response = await supertest(app).post('/product').send(body);
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'CANNOT_FIND_CATEGORY');
        equal(response.status,404);
        const productDb = await Product.findOne();
        equal(productDb,null);
    });
});