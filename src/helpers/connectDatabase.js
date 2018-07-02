const mongoose = require('mongoose');

function getDatabaseUri(){
    if(process.env.NODE_ENV === 'production') return '';
    if(process.env.NODE_ENV === 'test') return 'mongodb://localhost/restaurant-test';
    return 'mongodb://localhost/restaurant';
}

mongoose.connect(getDatabaseUri())
.then(()=>console.log('Connected Database'))
.catch(error => {
    console.log('Cannot Connect Database:'+ error.message);
    process.exit(1);
})