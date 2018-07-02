const {Verify} = require('./jwt');
function mustBeUser(req,res,next){
    Verify(req.headers.token)
    .then(obj =>{
        req.id_user = obj._id;
        next();
    })
    .catch(error => res.status(400).send({success:false,message:'INVALID_TOKEN'}));
};
module.exports = {mustBeUser};