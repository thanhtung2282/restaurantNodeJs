const supertest = require('supertest');
const { equal } = require('assert');
const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');
const { UserService } = require('../../src/services/user.services');

describe('TEST POST USER/SIGNUP', () => {
    it('Can signup', async() => {
        const body = {
            name: "Thanh Tùng",
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: "123456"
        }
        const response = await supertest(app).post('/user/signup').send(body);
        const {success,user} = response.body;
        equal(success,true);
        equal(user.name,'Thanh Tùng');
        equal(user.email,'tungnguyenthanh357@gmail.com');
        const userDb = await User.findById(user._id)
        equal(userDb.name,'Thanh Tùng');
        equal(userDb.email,'tungnguyenthanh357@gmail.com');
        
    });
    it('Cannot signup without name', async() => {
        const body = {
            name: "",
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: "123456"
        }
        const response = await supertest(app).post('/user/signup').send(body);
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'NAME_MUST_BE_PROVIDE');
        equal(response.status,400);
        const userDb = await User.findOne()
        equal(userDb,null);
    });
    it('Cannot signup without email', async() => {
        const body = {
            name: "Thanh Tùng",
            email: "",
            plainPassword: "123456"
        }
        const response = await supertest(app).post('/user/signup').send(body);
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'EMAIL_MUST_BE_PROVIDE');
        equal(response.status,400);
        const userDb = await User.findOne()
        equal(userDb,null);
    });
    it('Cannot signup without email', async() => {
        const body = {
            name: "Thanh Tùng",
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: ""
        }
        const response = await supertest(app).post('/user/signup').send(body);
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'PLAINPASSWORD_MUST_BE_PROVIDE');
        equal(response.status,400);
        const userDb = await User.findOne()
        equal(userDb,null);
    });
    it('Cannot signup with email existed', async() => {

        const body = {
            name: "Thanh Tùng",
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: "123456"
        }
        await UserService.SignUp("Thanh Tùng","tungnguyenthanh357@gmail.com","123456");
        const response = await supertest(app).post('/user/signup').send(body);
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'EMAIL_EXISTED');
        equal(response.status,400);
        const userDb = await User.findOne()
        equal(userDb.email,'tungnguyenthanh357@gmail.com');
    });
});