import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // empty object means all of them
        if (products.length < 1) {
            res.status(404).json({
                success: false,
                message: 'Oh no, nothing to show'
            });
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'There are no products!'
        });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        res.status(400).json({
            success: false,
            message: 'Please fill the required fields'
        });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            product: newProduct
        });
    } catch (error) {
        console.error('Error in creation of the product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error, oh no!'
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({
            success: false,
            message: 'There are nothing to update!'
        });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'All done General!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server says: OUCH!!'
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({
            success: false,
            message: 'There are nothing to update!'
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true
        });
        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: 'Updated successfully General!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Oh no, server feels bad!'
        });
    }
};
