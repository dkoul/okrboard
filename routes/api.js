const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

// routes
router.get('/api', (req, res) => {
    BlogPost.find({}).then((data) => {
        console.log('data', data);
        res.json(data);
    }).catch((error) => {
        console.log('error', error);
    })
    
});

router.get('/api/name', (req, res) => {
    const data = {
        username: 'api_name',
        age: 29
    };
    res.json(data);
});

module.exports = router;