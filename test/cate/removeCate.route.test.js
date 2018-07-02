const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Category } = require('../../src/models/category.model');
const { CategoryService } = require('../../src/services/category.services');
const { productService } = require('../../src/services/product.services');

describe('TEST DELETE CATEGORY/', () => {
    let idCate;
    beforeEach('create cate for test',async()=>{
        const cate = await CategoryService.createCategory("Phần Ăn Trẻ Em");
        idCate=cate._id;
    })
    it('Can remove category', async() => {
        const response = await supertest(app).delete('/category/'+idCate);
        const {success,cate} = response.body;
        equal(success,true);
        equal(cate.name,'Phần Ăn Trẻ Em');
        equal(cate._id,idCate);      
        const cateDb = await Category.findById(idCate)   
        equal(cateDb,null); 
    });
    it('Cannot remove category with invalid idCate', async() => {
        const response = await supertest(app).delete('/category/109640de');
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,400);      
        equal(message,'INVALID_ID');      
        const cateDb = await Category.find()
        equal(cateDb.length,1);
        equal(cateDb[0].name,'Phần Ăn Trẻ Em');
    });
    it('Cannot remove category with wrong idCate', async() => {
        const response = await supertest(app).delete('/category/9b39f6ca6e2b9a2f109640de');
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,404); 
        equal(message,'CANNOT_FIND_CATEGORY');      
        const cateDb = await Category.find()
        equal(cateDb.length,1);
        equal(cateDb[0].name,'Phần Ăn Trẻ Em');
    });
    it('Cannot remove category with cate removed', async() => {
        await Category.remove({});
        const response = await supertest(app).delete('/category/'+idCate);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,404); 
        equal(message,'CANNOT_FIND_CATEGORY');      
        const cateDb = await Category.findOne({})
        equal(cateDb,null);
    });
    it('Cannot remove category with cate has product', async() => {
        await productService.createProduct("Gà rán",50,50000,150000,idCate);
        const response = await supertest(app).delete('/category/'+idCate);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,400); 
        equal(message,'CANNOT_REMOVE_CATEGORY');      
        const cateDb = await Category.findById(idCate)
        equal(cateDb.products.length,1);
    });
});