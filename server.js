const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes/api');
const BlogPost = require('./models/blogPost');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/mern_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected mongodb1111');
})

const data = {
    title: 'blog title1',
    body: 'deepak body'
}

const newBlogPost = new BlogPost(data); // instance of the data

newBlogPost.save((error) => {
    if (error) {
        console.log('error', error);
    } else {
        console.log('sucessful saved data');
    }
})

app.use(morgan('tiny'));
app.use('', routes);



app.listen(PORT, console.log(`server is starting at ${PORT}`));
