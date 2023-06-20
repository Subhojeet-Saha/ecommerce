import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [product, setProduct] = useState({});
	const [relatedProducts, setRelatedProducts] = useState();
	const getSimilarProduct = async (pid, cid) => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/related-product/${pid}/${cid}`
			);
			setRelatedProducts(data?.products);
		} catch (error) {
			console.log(error);
		}
	};
	const getProduct = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/get-product/${params.slug}`
			);
			const temp = data.product;
			setProduct(temp) ? console.log(product) : console.log("temp");
			console.log(product);
			getSimilarProduct(data?.product._id, data?.product.category._id);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (params?.slug) getProduct();
		console.log(product);
	}, [params.slug]);
	return (
		<Layout>
			<div className="row container mt-2">
				<div className="col-md-6">
					<img
						src={`/api/v1/product/product-photo/${product._id}`}
						className="card-img-top"
						height="auto"
						width="300"
						alt={product.name}
					/>
				</div>
				<div className="col-md-6 ">
					<h1 className="text-center"> Product Details</h1>
					<h6>Name: {product.name}</h6>
					<h6>Description: {product.description}</h6>
					<h6>price: {product.price}</h6>
					<h6>Category: {product.category?.name}</h6>
					<button className="btn btn-secondary ms-1">Add to Cart</button>
				</div>
			</div>
			<hr />

			<div className="row container">
				{relatedProducts?.length < 1 && (
					<p className="text-center">No Similar Products found</p>
				)}
				<h1>Similar product</h1>
				<div className="d-flex flex-wrap">
					{relatedProducts?.map((p) => (
						<div className="card m-2" style={{ width: "18rem" }}>
							<img
								className="card-img-top"
								src={`/api/v1/product/product-photo/${p._id}`}
								alt={p.name}
							/>
							<div className="card-body">
								<h5 className="card-title">{p.name}</h5>
								<p className="card-text">{p.description.substring(0, 30)}</p>
								<p className="card-text">$ {p.price}</p>

								<button className="btn btn-secondary ms-1">Add to Cart</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default ProductDetail;
