import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/Authstyles.css";
import Layout from "../../components/layout/Layout";

const ForgotPasssword = () => {
    const [email, setEmail] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgotpassword", {
                email,
                newpassword,
                answer
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);

                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={"Forgot Password - Ecommerce APP"}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer1"
                            placeholder="Enter Your favorite Game Name "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            className="form-control"
                            id="exampleInputNewPassword1"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        RESET
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPasssword;