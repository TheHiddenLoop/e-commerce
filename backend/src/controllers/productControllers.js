import Product from "../models/product.js";
import { cloudinary } from "../utils/cloudinary.js";
import streamifier from "streamifier";
import { generateSKU } from "../utils/generateSKU.js";

function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
      if (error) reject(error); else resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, category, subCategory, brand, price, discount, sizes, colors, material, stock, tags, isFeatured, isActive } = req.body;
    const userId = req.user._id;
    const sku=generateSKU(name, category);
    if (!name || !description || !category || price === undefined || stock === undefined) {
      return res.status(400).json({ success: false, message: "Please provide all mandatory fields: name, description, category, price, stock" });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadResults = await Promise.all(req.files.map((file) => uploadToCloudinary(file.buffer)));
      images = uploadResults.map((result) => result.secure_url);
    }

    if (images.length <= 0) {
      return res.status(400).json({ success: false, message: "Image is not provided." });
    }

    const product = await Product.create({ name, description, category, subCategory, brand, price, discount, sizes:sizes.split(","), colors:colors.split(","), material, images, stock, sku, tags:tags.split(","), isFeatured, isActive, addedBy: userId });

    return res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    console.log("Error in add product", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const allProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const viewProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id); 

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product, 
    });
  } catch (error) {
    console.error("Error in fetching product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//admin work here


export const sellingProducts=async (req, res) => {
  try {
    const userId=req.user._id;
    const product=await Product.find({addedBy:userId});
    if(!product || product.length<=0){
      return res.status(404).json({success:false, message:"No products for selling"});
    }
    res.status(200).json({success:true, message:"All selling products", product});

  } catch (error) {
    console.error("Error in getting selling product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
