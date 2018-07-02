process.env.NODE_ENV = 'test';
require('../src/helpers/connectDatabase');
const {User} = require('../src/models/user.model');
const {Category} = require('../src/models/category.model');

beforeEach('remove all data for test',async()=>{
    await User.remove({});
    await Category.remove({});
});