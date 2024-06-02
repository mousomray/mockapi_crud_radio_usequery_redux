import React from 'react'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'; // Import Link
import { useDispatch } from 'react-redux'; // Import Dispatch
import { showuser, deleteuser } from "../Allreducers/allreducers"; // Import Show and Delete Function 
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import Wrapper from '../Common/Wrapper'; // Import Layout
import Swal from 'sweetalert2'; // Import Sweet Alert 
import DetailsIcon from '@mui/icons-material/Details'; //Details Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const Showuser = () => {

    const dispatch = useDispatch()
    const [loadmore, setLoadmore] = useState(5)

    // Get Customer For Use Query 
    const getUserdata = async () => {
        const response = await dispatch(showuser()) // Call Showcustomer function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: userdata, error, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getUserdata // This line of code work as same as useEffect()
    })


    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Customer Details!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deleteuser(id));
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Your Customer Details has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)

    const handleLoadmore = () => {
        setLoadmore(prev => prev + 5)
    }


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

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, marginTop: '75px' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Age</StyledTableCell>
                                <StyledTableCell align="center">Gender</StyledTableCell>
                                <StyledTableCell align="center">Details</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(userdata) && userdata.slice(0, userdata.length).reverse().slice(0, loadmore).map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.age}</StyledTableCell>
                                    <StyledTableCell align="center">{row.gender}</StyledTableCell>
                                    <StyledTableCell align="center"><Link to={`/details/${row.id}`}><DetailsIcon /></Link></StyledTableCell>
                                    <StyledTableCell align="center"><Link to={`/edituser/${row.id}`}><button className='btn-success'><EditIcon /></button></Link></StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => handleDelete(row.id)} className='btn-danger'><DeleteIcon /></button></StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>

                {loadmore < userdata.length ? (
                    <div className="text-center mt-3">
                        <button className="btn btn-primary" onClick={handleLoadmore} style={{ height: '40px' }}>Load More</button>
                    </div>
                ) : null}

            </Wrapper>
        </>
    )
}

export default Showuser