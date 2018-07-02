const supertest = require('supertest');
const { equal } = require('assert');
const { compareSync } = require('bcrypt');
const { Verify } = require('../../src/helpers/jwt');
const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');
const { UserService } = require('../../src/services/user.services');

describe('TEST POST USER/SIGNIN', () => {
    let _idTest;
    beforeEach('created user for test',async()=>{
        const Test = await UserService.SignUp("Thanh Tùng","tungnguyenthanh357@gmail.com","123456");
        _idTest = Test._id;
    })
    it('Can signin', async() => {
        const body = {
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: "123456"
        }
        const response = await supertest(app).post('/user/signin').send(body);
        const {success,user} = response.body;
        equal(success,true);
        equal(user.name,'Thanh Tùng');
        equal(user.password,undefined);
        equal(user.email,'tungnguyenthanh357@gmail.com');
        const {_id} = await Verify(user.token)
        equal(_id,_idTest)

        const userDb = await User.findById(_idTest)   
        equal(userDb.name,'Thanh Tùng');
        equal(userDb.email,'tungnguyenthanh357@gmail.com');
        const same = compareSync('123456',userDb.password)
        equal(same,true);
    });
    it('Cannot signin without email', async() => {
        const body = {
            email: "",
            plainPassword: "123456"
        }
        const response = await supertest(app).post('/user/signin').send(body);
        const {success,user, message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'EMAIL_MUST_BE_PROVIDE');
        equal(response.status,400);
    });
    it('Cannot signin without email', async() => {
        const body = {
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: ""
        }
        const response = await supertest(app).post('/user/signin').send(body);
        const {success,user, message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'PLAINPASSWORD_MUST_BE_PROVIDE');
        equal(response.status,400);
    });
    it('Cannot signin with wrong email', async() => {
        const body = {
            email: "tung@gmail.com",
            plainPassword: "123456"
        }
        const response = await supertest(app).post('/user/signin').send(body);
        const {success,user, message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'INVALID_EMAIL');
        equal(response.status,400);
    });
    it('Cannot signin with wrong pass', async() => {
        const body = {
            email: "tungnguyenthanh357@gmail.com",
            plainPassword: "abc"
        }
        const response = await supertest(app).post('/user/signin').send(body);
        const {success,user, message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'INVALID_PASSWORD');
        equal(response.status,400);
    });
});