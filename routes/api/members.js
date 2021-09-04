const express = require('express');
// when we use router here, we use router.get instead of app.get
const router = express.Router();
const members = require('../../Members.js');


router.get('/', (req, res) => res.json(members));

// get single member
// :id is url parameter
router.get('/:id', (req, res) => {
    // go to postman and
    // http://localhost:5000/api/members/4234234
    // then it brings back the given id: 4234234
    // res.send(req.params.id);

    // will check if member id is found or not (true/false)
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        
        // filter method, which filters out things based in a condition
        // Although member id is set in arrays as a number, req.params.id is always passed as a string!
        // after parsing to int, it works and
        // http://localhost:5000/api/members/3 will return
        /*  "id": 3,
        "name": "Roope Rahakas",
        "email": "ropsu@rahakas.fi",
        "status": "active" */ 
        res.json(members.filter(member => member.id === parseInt(req.params.id)));

    } //end if (found)
    else {
        // if member not found, set status to bad request 400 and give json message
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// create member
router.post('/', (req, res) => {
    res.send(req.body);
});

module.exports = router;