const express = require('express');
// when we use router here, we use router.get instead of app.get
const router = express.Router();
const members = require('../../Members.js');
const uuid = require('uuid');

router.get('/', (req, res) => res.json(members));

// GET SINGLE MEMBER
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

// CREATE MEMBER
router.post('/', (req, res) => {
    // res.send(req.body);

    // create object for member
    const newMember = {
        // creates unique id with uuid
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    //check that name and email has been sent
    if (!newMember.name || !newMember.email) {
        // send bad request
        // Use return here. If not use return, will get error "headers already sent"...no idea why??
        return res.status(400).json({msg: 'Please include a name and email'});
    }
    
    // add new member to array
    members.push(newMember);
    res.json(members);
    // res.redirect to slash will show the updated member in the list
    // res.redirect('/');

});

// UPDATE MEMBER
// Whe updating data, use PUT-request
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        // get email and name from req.body
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                //ternary operator. Check if req.body includes new name. If so, then use it. If not, use the original name. Same with email address.
                member.name = updMember.name ? updMember.name : member.name ;
                member.email = updMember.email ? updMember.email : member.email ;

                res.json({msg: 'Member updated', member});
            }
        });
    } 
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

router.get('/', (req, res) => res.json(members));

// DELETE MEMBER
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});

    } //end if (found)
    else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;