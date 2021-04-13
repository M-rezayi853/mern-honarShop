import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

// @des     Fetch all products
// @route     GET /api/products
// @access     Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
});

// @des     Fetch single product
// @route     GET /api/products/:id
// @access     Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @des     Delete product
// @route     DELETE /api/products/:id
// @access     Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        await product.remove();

        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @des     Create a product
// @route     POST /api/products
// @access     Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'اسم فرضی',
        image: '/images/sample.jpg',
        description: 'توضیحات فرضی',
        category: 'دسته بندی فرضی',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

// @des     Update a product
// @route     PUT /api/products/:id
// @access     Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, image, description, category, price, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.image = image;
        product.description = description;
        product.category = category;
        product.price = price;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };