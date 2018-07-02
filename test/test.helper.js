process.env.NODE_ENV = 'test';
require('../src/helpers/connectDatabase');
const {User} = require('../src/models/user.model');

beforeEach('remove all data for test',async()=>{
    await User.remove({});
});