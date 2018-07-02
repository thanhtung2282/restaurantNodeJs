const {Router} = require('express');

const {UserService} = require('../services/user.services');

const userRouter = Router();
userRouter.get('',(req,res)=>{
    UserService.getAll()
    .then(user => res.send({success:true, user}))
    .catch(res.onError);
});

userRouter.post('/signup',(req,res)=>{
    const {email,plainPassword,name} = req.body;
    UserService.SignUp(name,email,plainPassword)
    .then(user => res.send({success:true, user}))
    .catch(res.onError);
});
module.exports = {userRouter};