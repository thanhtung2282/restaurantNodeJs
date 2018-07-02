const {hash, compare} = require('bcrypt');

const {User} = require('../models/user.model');

const {MyError} = require('../helpers/my-error');

const {Sign, Verify} = require('../helpers/jwt');

const {checkObjectId} = require('../helpers/checkObjectId');

class UserService {
    static getAll(){
        return User.find({})
    }
    static async SignUp(name,email,plainPassword){
        if(!name) throw new MyError('NAME_MUST_BE_PROVIDE',400);
        if(!email) throw new MyError('EMAIL_MUST_BE_PROVIDE',400);
        if(!plainPassword) throw new MyError('PLAINPASSWORD_MUST_BE_PROVIDE',400);
        try {
            //băm pass
            const password  = await hash(plainPassword,8);
            //create
            const userInfo = new User({name,email,password})
            await userInfo.save();
            //xoa pass trước khi gửi về client
            const user = userInfo.toObject();
            delete user.password;
            return user;
        } catch (error) {
            throw new MyError('EMAIL_EXISTED',400);
        }
    }
    static async SignIn(email,plainPassword){
        // get data
        if(!email) throw new MyError('EMAIL_MUST_BE_PROVIDE',400);
        if(!plainPassword) throw new MyError('PLAINPASSWORD_MUST_BE_PROVIDE',400);
        //search email in db
        const user = await User.findOne({email});
        if(!user) throw new MyError('INVALID_EMAIL',400);
        // same plainpass and pass DB
        const same = await compare(plainPassword,user.password);
        if(!same) throw new MyError('INVALID_PASSWORD',400);
        // remove pass and add token then send 
        const userInfo = user.toObject();
        delete userInfo.password;
        userInfo.token = await Sign({_id:user._id});
        return userInfo;
    }
    static async Check(_id){
        //checkobject ID
        checkObjectId(_id);
        //check existed
        const user = await User.findById(_id);
        if(!user) throw new MyError('CANNOT_FIND_USER',404);
        //send
        const userInfo = user.toObject();
        delete userInfo.password;
        userInfo.toke = await Sign({_id:user._id});
        return userInfo;
    }
}
module.exports = {UserService};