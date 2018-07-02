const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Category } = require('../../src/models/category.model');
const { CategoryService } = require('../../src/services/category.services');

describe('TEST PUT CATEGORY/', () => {
    let idCate;
    beforeEach('create cate for test',async()=>{
        const cate = await CategoryService.createCategory("Phần Ăn Trẻ Em");
        idCate=cate._id;
    })
    it('Can update category', async() => {
        const body = {name:"Phần Ăn Người Lớn"}
        const response = await supertest(app).put('/category/'+idCate).send(body);
        const {success,cate} = response.body;
        equal(success,true);
        equal(cate.name,'Phần Ăn Người Lớn');
        equal(cate.products.length,0);      
        const cateDb = await Category.findById(idCate)
        equal(cateDb.name,'Phần Ăn Người Lớn');
        equal(cateDb.products.length,0);  
    });
    it('Cannot update category without name', async() => {
        const body = {name:""}
        const response = await supertest(app).put('/category/'+idCate).send(body);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');      
        equal(response.status,400);      
        const cateDb = await Category.findById(idCate)
        equal(cateDb.name,'Phần Ăn Trẻ Em');
        equal(cateDb.products.length,0); 
    });
    it('Cannot update category with invalid idCate', async() => {
        const body = {name:"Phần Ăn Trẻ Em"}
        const response = await supertest(app).put('/category/109640de').send(body);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,400);      
        equal(message,'INVALID_ID');      
        const cateDb = await Category.find()
        equal(cateDb.length,1);
        equal(cateDb[0].name,'Phần Ăn Trẻ Em');
    });
    it('Cannot update category with wrong idCate', async() => {
        const body = {name:"Phần Ăn Trẻ Em"}
        const response = await supertest(app).put('/category/9b39f6ca6e2b9a2f109640de').send(body);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,404); 
        equal(message,'CANNOT_FIND_CATEGORY');      
        const cateDb = await Category.find()
        equal(cateDb.length,1);
        equal(cateDb[0].name,'Phần Ăn Trẻ Em');
    });
    it('Cannot update category with cate removed', async() => {
        await Category.remove({});
        const body = {name:"Phần Ăn Trẻ Em"}
        const response = await supertest(app).put('/category/'+idCate).send(body);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(response.status,404); 
        equal(message,'CANNOT_FIND_CATEGORY');      
        const cateDb = await Category.findOne({})
        equal(cateDb,null);
    });
});