import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import "../../styles/Authstyles.css";
import { useAuth } from '../../context/auth'

const Login = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form submit function 
    const handlesubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post('/api/v1/auth/login', { email, password });

            if (res && res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }

    };

    return (
        <Layout title={"Register - Ecommerce App"}>
            <div className="form-container">
                <h1>Login Page</h1>
                <form onSubmit={handlesubmit}>

                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" placeholder="Enter your Email" />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
                    </div>


                    <button type="submit" className="btn btn-primary" >Login</button>

                    <div className="mt-3">
                        <button type="button" className="btn btn-primary" onClick={() => {navigate("/forgotpassword")}}>Forgot Password</button>
                    </div>
                </form>

            </div>

        </Layout>
    )
}

export default Login