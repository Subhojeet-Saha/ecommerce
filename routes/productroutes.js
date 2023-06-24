import express from "express";
import { isadmin, requiresignin } from "../middlewares/authmiddleware.js";
import {
	brainTreePaymentController,
	braintreeTokenController,
	createproductcontroller,
	deleteproductcontroller,
	getproductcontroller,
	getsingleproductcontroller,
	productCategoryController,
	productCountController,
	productFiltersController,
	productListController,
	productphotocontroller,
	relatedProductController,
	searchProductController,
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

// filter product
router.post("/product-filters", productFiltersController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);
//search product
router.get("/search/:keyword", searchProductController);
//similar product
router.get("/related-product/:pid/:cid", relatedProductController);
//category wise product router
router.get("/product-category/:slug", productCategoryController);

// payment gateway
router.get('/braintree/token', braintreeTokenController)

// payments
router.post('/braintree/payment', requiresignin, brainTreePaymentController) 

export default router;
