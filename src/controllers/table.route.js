const {Router} = require('express');

const {TableService} = require('../services/table.service');

const tableRouter = Router();
tableRouter.get('/',(req,res)=>{
    TableService.getAll()
    .then(table => res.send({success:true, table}))
    .catch(res.onError);
});
tableRouter.post('/',(req,res)=>{
    //get data
    const {name,idArea} = req.body;
    //create
    TableService.createTable(name,idArea)
    .then(table => res.send({success:true, table}))
    .catch(res.onError);
});
// tableRouter.put('/:id',(req,res)=>{
//     //get data
//     const {name} = req.body;
//     //create
//     AreaService.updateArea(name,req.params.id)
//     .then(area => res.send({success:true, area}))
//     .catch(res.onError);
// });
// tableRouter.delete('/:id',(req,res)=>{
//     AreaService.removeArea(req.params.id)
//     .then(area => res.send({success:true, area}))
//     .catch(res.onError);
// });

module.exports = {tableRouter};