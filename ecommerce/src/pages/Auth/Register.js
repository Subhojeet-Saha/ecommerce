import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import "../../styles/Authstyles.css";

const Register = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form submit function 
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post('/api/v1/auth/register', { name, email, address, password, phone, answer });

      if (res && res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
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
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <h1>Register Page</h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" id="exampleInputName" placeholder="Enter Your Name" />
          </div>
          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" placeholder="Enter your Email" />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
          </div>
          <div className="mb-3">
            <input type="text" value={phone} onChange={(e) => setphone(e.target.value)} required className="form-control" id="exampleInputPhone" placeholder="Enter your Phone Number" />
          </div>
          <div className="mb-3">
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" />
          </div>
          <div className="mb-3">
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required className="form-control" id="exampleInputAnswer" placeholder="what is your favourite game" />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>

      </div>

    </Layout>
  )
}

export default Register