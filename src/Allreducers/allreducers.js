import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice make state slice and createAsyncThunk handle asynconomous function 
import axiosInstance from '../api/api'
import { toast } from "react-toastify"; // For Toast Message

// I store my api end point in apiurl 
const apiurl = '/crud'


// Call Api for create user
export const adduser = createAsyncThunk("adduser", async (data, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(apiurl, data);
        if (response && response?.status === 201) {
            console.log("Fetching Add user data", response);
            toast.success("User Added Successfully")
        } else {
            console.log("Error Fetching Add User Data", response);
            toast.error("Error Fetching Add User Data")
        }
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add User data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Add createSlice area start
const adddetailslice = createSlice({
    name: "adddetail",
    initialState: {
        addsss: [],
        loading: false,
        error: null,
    },


    extraReducers: (builder) => {
        builder
            // Create User
            .addCase(adduser.pending, (state) => {
                state.loading = true;
            })
            .addCase(adduser.fulfilled, (state, action) => {
                state.loading = false;
                state.addsss.push(action.payload);

            })
            .addCase(adduser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default adddetailslice.reducer;
// Add createSlice area end 


// Call Api for Show All Product
export const showuser = createAsyncThunk("showuser", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Show User data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Show User data", error);
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Delete Product
export const deleteuser = createAsyncThunk("deleteuser", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${apiurl}/${id}`)
        console.log("Fetching Delete Customer data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Delete Customer data", error);
        toast.error("User Is Not Deleted")
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Details User
export const detailsuser = createAsyncThunk("detailsuser", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${apiurl}/${id}`);
        console.log("Fetching Details user data", response);
        return response.data;
    } catch (error) {
        console.log("Error Fetching Details user data", error);
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Edit User
export const edituser = createAsyncThunk("edituser", async ({ data, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`${apiurl}/${id}`, data);
        console.log("Fetching Update data..", response);
        toast.success("User Updated Successfully");
        return response.data;
    } catch (error) {
        console.log("Error Fetching update data", error);
        toast.error(error?.response?.data);
        return rejectWithValue(error.response.data);
    }
});