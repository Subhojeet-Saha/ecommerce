import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'

const Createproduct = () => {
    return (
        <Layout title={"Dashboard - Createproduct"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Createproduct