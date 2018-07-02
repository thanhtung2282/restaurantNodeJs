const {hash, compare} = require('bcrypt');

const {User} = require('../models/user.model');

const {MyError} = require('../helpers/my-error');
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
}
module.exports = {UserService};