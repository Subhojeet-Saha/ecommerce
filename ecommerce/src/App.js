import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Privateroute from "./components/Routes/Private";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Adminroute from "./components/Routes/Adminroute";
import Admindashboard from "./pages/admin/Admindashboard";
import Createcategory from "./pages/admin/Createcategory";
import Createproduct from "./pages/admin/Createproduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Privateroute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<Adminroute />} >
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-category" element={<Createcategory />} />
          <Route path="admin/create-product" element={<Createproduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path="/forgotpassword" element={<Forgotpassword />} />

      </Routes>
    </>
  );
}

export default App;
