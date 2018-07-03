const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Area } = require('../../src/models/area.model');
const { AreaService } = require('../../src/services/area.service');

describe('TEST POST AREA/', () => {
    it('Can create AREA', async() => {
        const body = {
            name:"Tầng 1",
            position:10
        }
        const response = await supertest(app).post('/area').send(body);
        const {success,area} = response.body;
        equal(success,true);
        equal(area.name,'Tầng 1');
        equal(area.position,10);    
        const areaDb = await Area.findById(area._id)
        equal(areaDb.name,'Tầng 1');
    });
    it('Cannot create AREA without name', async() => {
        const body = {
            name:"",
            position:10
        }
        const response = await supertest(app).post('/area/').send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');      
        equal(response.status,400);      
        const areaDb = await Area.findOne()
        equal(areaDb,null);
    });
    it('Cannot create AREA without name', async() => {
        const body = {
            name:"Tầng 1",
            position:''
        }
        const response = await supertest(app).post('/area/').send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'POSITION_MUST_BE_PROVIDE');      
        equal(response.status,400);      
        const areaDb = await Area.findOne()
        equal(areaDb,null);
    });
    it('Cannot create AREA with name existed', async() => {
        await AreaService.createArea("Tầng 1",10)
        const body = {
            name:"Tầng 1",
            position:10
        }
        const response = await supertest(app).post('/area/').send(body);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'NAME_CATEGORY_EXISTED');      
        equal(response.status,400);      
        const areaDb = await Area.findOne()
        equal(areaDb.name,'Tầng 1');
    });
});