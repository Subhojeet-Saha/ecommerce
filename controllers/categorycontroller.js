import slugify from "slugify";
import categorymodel from "../models/categorymodel.js";

export const createcategorycontroller = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "name is required" })
        }
        const existingcategory = await categorymodel.findOne({ name })
        if (existingcategory) {
            return res.status(200).send({
                success: true,
                message: "category already exists"
            })
        }
        const category = await new categorymodel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new category created",
            category
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in category"
        })
    }
};


// update category
export const updatecategorycontroller = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categorymodel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};


// getall category
export const categorycontroller = async (req, res) => {
    try {
        const category = await categorymodel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};


// single category
export const singlecategorycontroller = async (req, res) => {
    try {
        const category = await categorymodel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while getting single category"
        })
    }
}

// delet category
export const deletecategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categorymodel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category deleted successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error
        });
    }
}