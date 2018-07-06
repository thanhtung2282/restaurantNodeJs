const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Area } = require('../../src/models/area.model');
const { AreaService } = require('../../src/services/area.service');

describe('TEST PUT AREA/', () => {
    let idArea,idArea2;
    beforeEach('create AREA for test',async()=>{
        const test = await AreaService.createArea("Tầng 1");
        const test2 = await AreaService.createArea("Tầng 2");
        idArea = test._id;
        idArea2 = test2._id;
    });
    it('Can update AREA', async() => {
        const body = {name:"Tầng 3"}
        const response = await supertest(app).put('/area/'+idArea).send(body);
        const {success,area} = response.body;
        equal(success,true);
        equal(area.name,'Tầng 3');   
        const areaDb = await Area.findById(area._id)
        equal(areaDb.name,'Tầng 3');
    });
    it('Cannot update AREA without name', async() => {
        const body = {name:""}
        const response = await supertest(app).put('/area/'+idArea).send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');      
        equal(response.status,400);      
        const areaDb = await Area.findById(idArea)
        equal(areaDb.name,'Tầng 1');
    });
    it('Cannot update AREA invalid idArea', async() => {
        const body = {name:"Tầng 10"}
        const response = await supertest(app).put('/area/'+idArea+1).send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'INVALID_ID');      
        equal(response.status,400);      
        const areaDb = await Area.findById(idArea)
        equal(areaDb.name,'Tầng 1');
    });
    it('Cannot update AREA wrong idArea', async() => {
        const body = {name:"Tầng 10"}
        const response = await supertest(app).put('/area/9b3ae95a23276821387a9616').send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'CANNOT_FIND_AREA');      
        equal(response.status,404);      
        const areaDb = await Area.findById('9b3ae95a23276821387a9616')
        equal(areaDb,null);
    });
    it('Cannot update AREA with name existed', async() => {
        const body = { name:"Tầng 2"}
        const response = await supertest(app).put('/area/'+idArea).send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'NAME_AREA_EXISTED');      
        equal(response.status,400);      
        const areaDb = await Area.findById(idArea2)
        equal(areaDb.name,'Tầng 2');
    });
    it('Cannot update AREA with id removed', async() => {
        await Area.remove({});
        const body = { name:"Tầng 2"}
        const response = await supertest(app).put('/area/'+idArea).send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'CANNOT_FIND_AREA');      
        equal(response.status,404);      
        const areaDb = await Area.findById(idArea)
        equal(areaDb,null);
    });
});