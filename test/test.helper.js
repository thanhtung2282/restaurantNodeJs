process.env.NODE_ENV = 'test';
require('../src/helpers/connectDatabase');
const {User} = require('../src/models/user.model');
const {Category} = require('../src/models/category.model');
const {Product} = require('../src/models/product.model');
const {Area} = require('../src/models/area.model');
const {Table} = require('../src/models/table.model');

beforeEach('remove all data for test',async()=>{
    await User.remove({});
    await Category.remove({});
    await Product.remove({});
    await Area.remove({});
    await Table.remove({});
});