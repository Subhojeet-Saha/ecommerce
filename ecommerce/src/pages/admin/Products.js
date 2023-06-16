import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/layout/Adminmenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
	const [products, setProducts] = useState([]);

	const getAllProducts = async () => {
		try {
			const { data } = await axios.get("/api/v1/product/get-product");
			setProducts(data.products);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	useEffect(() => {
		getAllProducts();
		console.log(products);
	}, []);
	return (
		<Layout>
			<div>
				<div className="row">
					<div className="col-md-3">
						<Adminmenu />
					</div>
					<div className="col-md-9 ">
						<h1 className="text-center">All Products List</h1>
						<div className="d-flex">
							{products?.map((p) => (
								<Link
									key={p._id}
									to={`/dashboard/admin/product/${p.slug}`}
									className="product-link"
								>
									<div className="card m-2" style={{ width: "18rem" }}>
										<img
											className="card-img-top"
											src={`/api/v1/product/product-photo/${p._id}`}
											alt={p.name}
										/>
										<div className="card-body">
											<h5 className="card-title">{p.name}</h5>
											<p className="card-text">{p.description}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Products;
