const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Product } = require('../../src/models/product.model');
const { productService } = require('../../src/services/product.services');
const { CategoryService } = require('../../src/services/category.services');
const { Category } = require('../../src/models/category.model');

describe('TEST DELETE PRODUCT/', () => {
    let idCate_1,idCate_2,idProduct;
    beforeEach('create cate and product for test',async()=>{
        const cate1 =  await CategoryService.createCategory("Phần Ăn Trẻ Em");
        idCate_1 = cate1._id;
        const cate2 =  await CategoryService.createCategory("Phần Ăn Người Lớn");        
        idCate_2 = cate2._id;
        const product =  await productService.createProduct("Gà rán update",40,40000,140000,idCate_2);        
        idProduct = product._id;
    })
    it('Can removed product', async() => {
        const response = await supertest(app).delete('/product/'+idProduct);
        const {success,product} = response.body;
        equal(success,true);
        equal(product.name,'Gà rán update');
        equal(product.quantity,40);
        equal(product.cost,40000);
        equal(product.price,140000);
        equal(product.category,idCate_2);
        const productDb = await Product.findById(idProduct).populate('category');
        equal(productDb,null);
        const cateDb = await Category.findById(idCate_2);
        equal(cateDb.products.length,0);
    });
    it('Cannot removed product wrong idProduct', async() => {
        const response = await supertest(app).delete('/product/9b39f6ca6e2b9a2f109640de');
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'CANNOT_FIND_PRODUCT');
        equal(response.status,404);
        const productDb = await Product.findOne({});
        equal(productDb._id.toString(),idProduct);
        const cateDb = await Category.findById(idCate_2);
        equal(cateDb.products.length,1);
    });
    it('Cannot removed product invalid idProduct', async() => {
        const response = await supertest(app).delete('/product/9ba2f109640de');
        const {success,product,message} = response.body;
        equal(success,false);
        equal(product,undefined);
        equal(message,'INVALID_ID');
        equal(response.status,400);
        const productDb = await Product.findOne({});
        equal(productDb._id.toString(),idProduct);
        const cateDb = await Category.findById(idCate_2);
        equal(cateDb.products.length,1);
    });
});