// connect databse
require('./helpers/connectDatabase');
// gọi app 
const {app} = require('./app');
//mở server
app.listen(3000,()=>console.log('Connected Server'));