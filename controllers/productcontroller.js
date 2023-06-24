import productmodel from "../models/productmodel.js"
import categorymodel from "../models/categorymodel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHANT_ID,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY,
 });

export const createproductcontroller = async (req, res) => {
	try {
		const { name, description, price, category, quantity, shipping } =
			req.fields;
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
				return res
					.status(500)
					.send({ error: "photo is Required and should be less then 1mb" });
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
		const products = await productmodel
			.find({})
			.populate("category")
			.select("-photo")
			.limit(12)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			totalcount: products.length,
			message: "Allproducts",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "error in getting products",
			error: error.message,
		});
	}
};

// get single product
export const getsingleproductcontroller = async (req, res) => {
	try {
		const product = await productmodel
			.findOne({ slug: req.params.slug })
			.select("-photo")
			.populate("category");
		res.status(200).send({
			success: true,
			message: "single product fetched",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "error while getting single product",
			error,
		});
	}
};

// get photo
export const productphotocontroller = async (req, res) => {
	try {
		const product = await productmodel.findById(req.params.pid).select("photo");
		if (product.photo.data) {
			res.set("Content-type", product.photo.contentType);
			return res.status(200).send(product.photo.data);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "error while getting photo",
			error,
		});
	}
};

// delete product
export const deleteproductcontroller = async (req, res) => {
	try {
		await productmodel.findByIdAndDelete(req.params.pid).select("-photo");
		res.status(200).send({
			success: true,
			message: "product deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: fasle,
			message: "error while deleteing product",
			error,
		});
	}
};

// update product
export const updateproductcontroller = async (req, res) => {
	try {
		const { name, description, price, category, quantity, shipping } =
			req.fields;
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
				return res
					.status(500)
					.send({ error: "photo is Required and should be less then 1mb" });
		}

		const products = await productmodel.findByIdAndUpdate(
			req.params.pid,
			{ ...req.fields, slug: slugify(name) },
			{ new: true }
		);

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

// filter product
export const productFiltersController = async (req, res) => {
	try {
		const { checked, radio } = req.body;
		let args = {};
		if (checked.length > 0) args.category = checked;
		if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
		const products = await productmodel.find(args);
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error While Filtering Products",
			error,
		});
	}
};

// product count
export const productCountController = async (req, res) => {
	try {
		const total = await productmodel.find({}).estimatedDocumentCount();
		res.status(200).send({
			success: true,
			total,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: "Error in product count",
			error,
			success: false,
		});
	}
};

// product list base on page
export const productListController = async (req, res) => {
	try {
		const perPage = 9;
		const page = req.params.page ? req.params.page : 9;
		const products = await productmodel
			.find({})
			.select("-photo")
			.skip((page - 1) * perPage)
			.limit(perPage)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "error in per page ctrl",
			error,
		});
	}
};

export const searchProductController = async (req, res) => {
	try {
		const { keyword } = req.params;
		const results = await productmodel
			.find({
				$or: [
					{
						name: { $regex: `${keyword}`, $options: "i" },
					},
					{
						description: { $regex: `${keyword}`, $options: "i" },
					},
				],
			})
			.select("-photo");
		res.json(results);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error in search product api",
			error,
		});
	}
};

export const relatedProductController = async (req, res) => {
	try {
		const { pid, cid } = req.params;
		console.log(pid, cid);
		const products = await productmodel
			.find({
				category: cid,
				_id: { $ne: pid },
			})
			.select("-photo")
			.limit(3)
			.populate("category");
		res.status(200).send({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "error while getting related product",
			error,
		});
	}
};
export const productCategoryController = async (req, res) => {
	try {
		const category = await categorymodel.findOne({ slug: req.params.slug });
		const products = await productmodel.find({ category }).populate("category");
		res.status(200).send({
			success: true,
			category,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			error,
			message: "Error while getting product",
		});
	}
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
	try {
	  gateway.clientToken.generate({}, function (err, response) {
		 if (err) {
			res.status(500).send(err);
		 } else {
			res.send(response);
		 }
	  });
	} catch (error) {
	  console.log(error);
	}
 };

 //payment
export const brainTreePaymentController = async (req, res) => {
	try {
	  const { nonce, cart } = req.body;
	  let total = 0;
	  cart.map((i) => {
		 total += i.price;
	  });
	  let newTransaction = gateway.transaction.sale(
		 {
			amount: total,
			paymentMethodNonce: nonce,
			options: {
			  submitForSettlement: true,
			},
		 },
		 function (error, result) {
			if (result) {
			  const order = new orderModel({
				 products: cart,
				 payment: result,
				 buyer: req.user._id,
			  }).save();
			  res.json({ ok: true });
			} else {
			  res.status(500).send(error);
			}
		 }
	  );
	} catch (error) {
	  console.log(error);
	}
 };  