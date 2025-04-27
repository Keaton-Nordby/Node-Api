const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// declaring a route
app.get('/', (req, res) => {
    res.send("Hello Node api");
})



app.listen(port, () => {
    console.log(`Node api app is running on port ${port}`);
})