const {Router} = require('express');

const {AreaService} = require('../services/area.service');

const areaRouter = Router();
areaRouter.get('/',(req,res)=>{
    AreaService.getAll()
    .then(area => res.send({success:true, area}))
    .catch(res.onError);
});
areaRouter.post('/',(req,res)=>{
    //get data
    const {name} = req.body;
    //create
    AreaService.createArea(name)
    .then(area => res.send({success:true, area}))
    .catch(res.onError);
});
areaRouter.put('/:id',(req,res)=>{
    //get data
    const {name} = req.body;
    //create
    AreaService.updateArea(name,req.params.id)
    .then(area => res.send({success:true, area}))
    .catch(res.onError);
});
areaRouter.delete('/:id',(req,res)=>{
    AreaService.removeArea(req.params.id)
    .then(area => res.send({success:true, area}))
    .catch(res.onError);
});

module.exports = {areaRouter};