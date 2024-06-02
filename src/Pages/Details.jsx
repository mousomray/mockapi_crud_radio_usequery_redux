import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' // Import Use Query
import { useDispatch } from 'react-redux' // Import Dispatch
import { detailsuser } from "../Allreducers/allreducers"; // Import Details Function 
import { useParams } from 'react-router-dom' //Import  Useparams 
import Wrapper from '../Common/Wrapper' // Import Wrapper

const Details = () => {

    const { id } = useParams(); // Useparams 
    const dispatch = useDispatch(); // For Dispatch
    

    const getdetailsdata = async () => {
        const response = await dispatch(detailsuser(id)) // Call function 
        console.log("My Details response is ", response);
        return response?.payload
    }

    // Use Query Area 
    const { isLoading, isError, data: detailsdata, error, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getdetailsdata // This line of code work as same as useEffect()
    })

    

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Wrapper>

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-header">
                            Details
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><b>Name : </b>{detailsdata?.name}</h5>
                            <h5 className="card-title"><b>Email : </b>{detailsdata?.email}</h5>
                            <h5 className="card-title"><b>Age : </b>{detailsdata?.age}</h5>
                            <h5 className="card-title"><b>Gender : </b>{detailsdata?.gender}</h5>
                            <Link to="/showuser" className="btn btn-primary">Back</Link>
                        </div>
                    </div>
                </div>

            </Wrapper>
        </>
    )
}

export default Details