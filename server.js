const express = require('express');
const mongoose = require('mongoose');
const app = express();

// declaring a route
app.get('/', (req, res) => {
    res.send("Hello Node API");
});

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://root:root@nodeapi.iqrylev.mongodb.net/node-API?retryWrites=true&w=majority&appName=NODEAPI')
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log('Node API app is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
