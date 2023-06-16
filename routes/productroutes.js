import express from "express";
import { isadmin, requiresignin } from "../middlewares/authmiddleware.js";
import {
	createproductcontroller,
	deleteproductcontroller,
	getproductcontroller,
	getsingleproductcontroller,
	productphotocontroller,
	updateproductcontroller,
} from "../controllers/productcontroller.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

// create product
router.post(
	"/create-product",
	requiresignin,
	isadmin,
	formidable(),
	createproductcontroller
);

// update product
router.put(
	"/update-product/:pid",
	requiresignin,
	isadmin,
	formidable(),
	updateproductcontroller
);

// get all products
router.get("/get-product", getproductcontroller);

// single product
router.get("/get-product/:slug", getsingleproductcontroller);

// get photo
router.get("/product-photo/:pid", productphotocontroller);

// delete product
router.delete("/delete-product/:pid", deleteproductcontroller);

export default router;
