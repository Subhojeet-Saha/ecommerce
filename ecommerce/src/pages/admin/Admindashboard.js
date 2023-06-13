import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
import { useAuth } from '../../context/auth'

const Admindashboard = () => {

    const [auth] = useAuth()

    return (
        <Layout title={"Dashboard - Createcategory"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>Admin Name : {auth?.user?.name}</h3>
                            <h3>Admin Email : {auth?.user?.email}</h3>
                            <h3>Admin Contact : {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Admindashboard