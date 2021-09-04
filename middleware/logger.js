const moment = require('moment'); //gives date

//middleware
    const logger = (req, res, next) => {
        // req.protocol gives http
        // req.originalUrl gives the page
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
        next(); //moves on to next function on the stack
    };

    module.exports = logger;