import productmodel from "../models/productmodel.js";
import fs from "fs";
import slugify from "slugify";

export const createproductcontroller = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productmodel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
        });
    }
};


// get all products
export const getproductcontroller = async (req, res) => {
    try {
        const products = await productmodel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true, totalcount: products.length, message: "Allproducts",
            products,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting products",
            error: error.message
        })
    }
}

// get single product
export const getsingleproductcontroller = async (req, res) => {
    try {
        const product = await productmodel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "single product fetched",
            product,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting single product",
            error
        })
    }
}


// get photo
export const productphotocontroller = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: "error while getting photo",
            error
        })
    }
}


// delete product
export const deleteproductcontroller = async (req, res) => {
    try {
        await productmodel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "product deleted successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: fasle,
            message: "error while deleteing product",
            error
        })
    }
}

// update product
export const updateproductcontroller = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productmodel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }
};