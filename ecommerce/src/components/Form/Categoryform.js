import React from 'react'

const Categoryform = ({handlesubmit,value,setvalue}) => {
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='enter new category' value={value} onChange={(e) => setvalue(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default Categoryform