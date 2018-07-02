const {Router} = require('express');

const {UserService} = require('../services/user.services');
const {mustBeUser} = require('../helpers/mustBeUser.middleware');

const userRouter = Router();
userRouter.get('',(req,res)=>{
    UserService.getAll()
    .then(user => res.send({success:true, user}))
    .catch(res.onError);
});

userRouter.post('/signup',(req,res)=>{
    //get data
    const {email,plainPassword,name} = req.body;
    //create
    UserService.SignUp(name,email,plainPassword)
    .then(user => res.send({success:true, user}))
    .catch(res.onError);
});
userRouter.post('/signin',(req,res)=>{
    //get data
    const {email,plainPassword} = req.body;
    UserService.SignIn(email,plainPassword)
    .then(user => res.send({success:true, user}))
    .catch(res.onError);
});
userRouter.post('/check',mustBeUser,(req,res)=>{
    UserService.Check(req.id_user)
    .then(user => res.send({success:true, user}))
    .catch(res.onError);
});
module.exports = {userRouter};