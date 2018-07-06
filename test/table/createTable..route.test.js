const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Area } = require('../../src/models/area.model');
const { AreaService } = require('../../src/services/area.service');
const { Table } = require('../../src/models/table.model');
const { TableService } = require('../../src/services/table.service');
describe('TEST CREATE TABLE/', () => {
    let idArea;
    beforeEach('create AREA for test',async()=>{
        const test = await AreaService.createArea("Tầng 1");
        idArea = test._id;
    });
    it('Can CREATE TABLE', async() => {
        const body = {
            name:"Bàn 01",
            idArea
        }
        const response = await supertest(app).post('/table').send(body);
        const {success,table} = response.body;
        equal(success,true);
        equal(table.name,'Bàn 01');   
        equal(table.area,idArea);   
        const tableDb = await Table.findById(table._id).populate('area')
        equal(tableDb.name,'Bàn 01');
        equal(tableDb.area._id.toString(),idArea);
        equal(tableDb.area.tables[0],table._id);
    });
    it('Cannot Create Table without name', async() => {
        const body = {name:"",idArea}
        const response = await supertest(app).post('/table/').send(body);
        const {success,table,message} = response.body;
        equal(success,false);
        equal(table,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');      
        equal(response.status,400);      
        const tableDb = await Table.findOne({}).populate('area')
        equal(tableDb,null);
        
    });
    it('Cannot Create Table invalid idArea', async() => {
        const body = {name:"Bàn 01",idArea:'asd'}
        const response = await supertest(app).post('/table').send(body);
        const {success,table,message} = response.body;
        equal(success,false);
        equal(table,undefined);
        equal(message,'INVALID_ID');      
        equal(response.status,400);      
        const tableDb = await Table.findOne({}).populate('area')
        equal(tableDb,null);
        
    });
    it('Cannot Create Table wrong idArea', async() => {
        const body = {name:"Bàn 01",idArea:'9b3ae95a23276821387a0000'}
        const response = await supertest(app).post('/table').send(body);
        const {success,table,message} = response.body;
        equal(success,false);
        equal(table,undefined);
        equal(message,'CANNOT_FIND_AREA');      
        equal(response.status,404);      
        const tableDb = await Table.findOne({}).populate('area')
        equal(tableDb,null);
        
    });
    
});