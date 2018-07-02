const jwt = require('jsonwebtoken');

const SECRECT_KEY = '!@#$%^&';

function Sign(obj){
    return new Promise((resolve,reject)=>{
        jwt.sign(obj,SECRECT_KEY,{expiresIn:'2 days'},(error,token)=>{
            if(error) return reject(error);
            return resolve(token);
        });
    });
}
function Verify(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,SECRECT_KEY,(error,obj)=>{
            if(error) return reject(error);
            delete obj.exp;
            delete obj.iat;
            return resolve(obj);
        });
    });
}
module.exports = {Sign,Verify};