import React,{useState} from 'react'
import Layout from '../../componenets/layout/Layout'
import {  toast } from 'react-toastify';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [phone,setPhone]=useState("");
const [address,setAddress]=useState("");
const navigate=useNavigate()

const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`
    ,{name,email,password,phone,address})
    if(res.data.success){
        toast.success(res.data.message)
        navigate("/login")
    }else{
        toast.error(res.data.message)
    }
    } catch (error) {
        console.log(error)
        toast.error("something is wrong")
    }
}

    return (
<Layout>
    <div className='register'>
    <h1>
        Register Page
    </h1>

<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" 
    className="form-control" 
    onChange={(e)=>setName(e.target.value)}
    value={name}
    id="exampleInputEmail1"
     placeholder='Enter Your Name'
     required
     />
  </div>

<div className="mb-3">
  <input 
  type="email" 
  className="form-control" 
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  id="exampleInputPassword1"
  placeholder='Enter Your email' 
  required
  />
</div>

<div className="mb-3">
<input 
type="password" 
className="form-control" 
value={password}
onChange={(e)=>setPassword(e.target.value)}
id="exampleInputPassword1"
placeholder='Enter Your Password' 
required
/>
</div>

<div className="mb-3">
<input
type="text" 
className="form-control" 
value={phone}
onChange={(e)=>setPhone(e.target.value)}
id="exampleInputPassword1"
placeholder='Enter Your Phone' 
required
/>
</div>

<div className="mb-3">
<input 
type="text" 
className="form-control" 
value={address}
onChange={(e)=>setAddress(e.target.value)}
id="exampleInputPassword1"
placeholder='Enter Your address' 
required
/>
</div>

<button type="submit" className="btn btn-primary">Submit</button>
</form>


</div>

 </Layout>
  )

}

export default Register