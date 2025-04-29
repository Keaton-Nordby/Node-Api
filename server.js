const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// declaring a route
app.get('/blog', (req, res) => {
    res.send("Hello Node API");
});

app.get('/products', async(req, res) => {
    try {
        const porducts = await Product.find({});
        res.status(200).json(porducts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// be able to update the product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// routes
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// delete method

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: `cannot find any product id ${id}`});
        }
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

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
