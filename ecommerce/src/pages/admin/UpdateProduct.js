import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [photo, setPhoto] = useState("");
	const [quantity, setQuantity] = useState("");
	const [shipping, setShipping] = useState("");
	const [id, setId] = useState("");
	const getSingleProduct = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/get-product/${params.slug}`
			);
			setName(data.product.name);
			setId(data.product._id);
			setDescription(data.product.description);
			console.log(data.product.quantity);
			setQuantity(data.product.quantity);
			setCategory(data.product.category._id);
			setShipping(data.product.shipping);
			setPrice(data.product.price);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getSingleProduct();
	}, []);

	const getAllCategory = async () => {
		try {
			const { data } = await axios.get("/api/v1/category/get-category");
			if (data.success) {
				setCategories(data.category);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong in getting category");
		}
	};
	useEffect(() => {
		getAllCategory();
	}, []);

	//create product function
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData();
			productData.append("name", name);
			productData.append("description", description);
			productData.append("price", price);
			productData.append("quantity", quantity);
			photo && productData.append("photo", photo);
			productData.append("category", category);
			const { data } = axios.put(
				`/api/v1/product/update-product/${id}`,
				productData
			);
			console.log(data);
			if (data?.success) {
				toast.error(data?.message);
			} else {
				toast.success("Product Updated Successfully");
				navigate("/dashboard/admin/products");
			}
		} catch (error) {
			console.log(error);
			toast.error("something went wrong");
		}
	};
	const handleDelete = async () => {
		try {
			let answer = window.prompt(
				"Are you sure you want to delete this product"
			);
			if (!answer) return;
			const { data } = await axios.delete(
				`/api/v1/product/delete-product/${id}`
			);
			toast.success("Product deleted successfully");
			navigate("/dashboard/admin/products");
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	return (
		<Layout title={"Dashboard - Createproduct"}>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<Adminmenu />
					</div>
					<div className="col-md-9">
						<h1>Update Product</h1>
						<div className="m-1 w-75">
							<Select
								bordered={false}
								placeholder="Select a categoy"
								size="large"
								showSearch
								className="form-select mb-3 "
								onChange={(value) => {
									setCategory(value);
								}}
								value={category}
							>
								{categories?.map((c) => (
									<Option key={c._id} value={c._id}>
										{c.name}
									</Option>
								))}
							</Select>
							<div className="mb-3">
								<label className="btn btn-outline-secondary col-md-12">
									{photo ? photo.name : "Upload Photo"}
									<input
										type="file"
										name="photo"
										accept="images/*"
										onChange={(e) => setPhoto(e.target.files[0])}
										hidden
									/>
								</label>
							</div>
							<div className="mb-3">
								{photo ? (
									<div className="text-center">
										{" "}
										<img
											src={URL.createObjectURL(photo)}
											alt="Product-photo"
											height="200px"
											className="img img-responsive"
										/>
									</div>
								) : (
									<div className="text-center">
										{" "}
										<img
											src={`/api/v1/product/product-photo/${id}`}
											alt="Product-photo"
											height="200px"
											className="img img-responsive"
										/>
									</div>
								)}
							</div>
							<div className="mb-3">
								<input
									type="text"
									value={name}
									placeholder="write a name"
									className="form-control"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<textarea
									type="text"
									value={description}
									placeholder="write a description"
									className="form-control"
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="number"
									value={price}
									placeholder="write a price"
									className="form-control"
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="number"
									value={quantity}
									placeholder="Write a Quantity"
									className="form-control"
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<Select
									bordered={false}
									placeholder="Select Shipping"
									size="large"
									className="form-select mb-3"
									onChange={(value) => setShipping(value)}
									value={shipping ? "Yes" : "No"}
								>
									<Option value="0">No</Option>
									<Option value="1">Yes</Option>
								</Select>
							</div>
							<div className="mb-3">
								<button className="btn btn-primary" onClick={handleUpdate}>
									Update Product
								</button>
								<button className="btn btn-danger" onClick={handleDelete}>
									Delete Product
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default UpdateProduct;
