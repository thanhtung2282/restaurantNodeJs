const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { Area } = require('../../src/models/area.model');
const { AreaService } = require('../../src/services/area.service');

describe('TEST DELETE AREA/', () => {
    let idArea,idArea2;
    beforeEach('create AREA for test',async()=>{
        const test = await AreaService.createArea("Tầng 1",10);
        const test2 = await AreaService.createArea("Tầng 2",10);
        idArea = test._id;
        idArea2 = test2._id;
    });
    it('Can remove AREA', async() => {
        const response = await supertest(app).delete('/area/'+idArea);
        const {success,area} = response.body;
        console.log(response.body)
        equal(success,true);
        equal(area.name,'Tầng 1');
        equal(area.position,10);    
        const areaDb = await Area.findById(idArea)
        equal(areaDb,null);
    });
    it('Cannot remove AREA invalid idArea', async() => {
        const response = await supertest(app).delete('/area/'+idArea+1);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'INVALID_ID');      
        equal(response.status,400);      
        const areaDb = await Area.findById(idArea)
        equal(areaDb.name,'Tầng 1');
    });
    it('Cannot remove AREA wrong idArea', async() => {
        const response = await supertest(app).delete('/area/9b3ae95a23276821387a9616');
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'CANNOT_FIND_AREA');      
        equal(response.status,404);      
        const areaDb = await Area.findById('9b3ae95a23276821387a9616')
        equal(areaDb,null);
    });
    it('Cannot remove AREA removed idArea', async() => {
        await AreaService.removeArea(idArea);
        const response = await supertest(app).delete('/area/'+idArea);
        const {success,area,message} = response.body;
        equal(success,false);
        equal(area,undefined);
        equal(message,'CANNOT_FIND_AREA');      
        equal(response.status,404);      
        const areaDb = await Area.findById(idArea)
        equal(areaDb,null);
    });
});