const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Category } = require('../../src/models/category.model');
const { CategoryService } = require('../../src/services/category.services');

describe('TEST POST CATEGORY/', () => {
    it('Can create category', async() => {
        const body = {name:"Phần Ăn Trẻ Em"}
        const response = await supertest(app).post('/category/').send(body);
        const {success,cate} = response.body;
        equal(success,true);
        equal(cate.name,'Phần Ăn Trẻ Em');
        equal(cate.products.length,0);      
        const cateDb = await Category.findById(cate._id)
        equal(cateDb.name,'Phần Ăn Trẻ Em');
        equal(cateDb.products.length,0);  
    });
    it('Cannot create category without name', async() => {
        const body = {name:""}
        const response = await supertest(app).post('/category/').send(body);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');      
        const cateDb = await Category.findOne()
        equal(cateDb,null);
    });
    it('Cannot create category with name existed', async() => {
        await CategoryService.createCategory("Phần Ăn Trẻ Em")
        const body = {name:"Phần Ăn Trẻ Em"}
        const response = await supertest(app).post('/category/').send(body);
        const {success,cate,message} = response.body;
        equal(success,false);
        equal(cate,undefined);
        equal(message,'NAME_CATEGORY_EXISTED');      
        const cateDb = await Category.find()
        equal(cateDb.length,1);
        equal(cateDb[0].name,'Phần Ăn Trẻ Em');
    });
});