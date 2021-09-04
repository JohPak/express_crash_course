const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');
const app = express();
const logger = require('./middleware/logger');

// not too handy to serve files one by one...
// app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname,'public', 'index.html'));
    // });
    
    // every time we make request, this middlevare will run
    // prints out:
    // http://localhost:5000/api/members: 2021-09-04T21:41:07+03:00
    // app.use(logger);
    
// init new middleware body parser
    app.use(express.json()); // lets us handle raw json
    app.use(express.urlencoded({extended: false})); // lets us handle form submission and url encoded data

    // ...instead set static folder to make everything under it available
    // (app.use = middleware here)
    app.use(express.static(path.join(__dirname,'public')));

    // Members API routes
    app.use('/api/members', require('./routes/api/members'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));