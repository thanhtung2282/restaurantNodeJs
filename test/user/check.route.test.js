const supertest = require('supertest');
const { equal } = require('assert');
const { compareSync } = require('bcrypt');
const { Verify } = require('../../src/helpers/jwt');
const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');
const { UserService } = require('../../src/services/user.services');

describe('TEST POST USER/CHECK', () => {
    let id_user,token;
    beforeEach('created user for test',async()=>{
        await UserService.SignUp("Thanh Tùng","tungnguyenthanh357@gmail.com","123456");
        const Test = await UserService.SignIn("tungnguyenthanh357@gmail.com","123456");
        token = Test.token;
        id_user = Test._id;
    })
    it('Can signin', async() => {
        const response = await supertest(app).post('/user/check').set({token});
        const {success,user} = response.body;
        equal(success,true);
        equal(user.name,'Thanh Tùng');
        equal(user.password,undefined);
        equal(user.email,'tungnguyenthanh357@gmail.com');
        equal(user._id,id_user);

    });
    it('Can signin without token', async() => {
        const response = await supertest(app).post('/user/check');
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'INVALID_TOKEN');
        equal(response.status,400);

    });
    it('Can signin with wrong token', async() => {
        const response = await supertest(app).post('/user/check').set({token:'12'});
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'INVALID_TOKEN');
        equal(response.status,400);

    });
    xit('Can signin with user removed', async() => {
        const response = await supertest(app).post('/user/check').set({token:'12'});
        const {success,user,message} = response.body;
        equal(success,false);
        equal(user,undefined);
        equal(message,'INVALID_TOKEN');
        equal(response.status,400);

    });
});