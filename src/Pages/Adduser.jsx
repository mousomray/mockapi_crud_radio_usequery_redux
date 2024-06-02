import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from "@mui/material/Paper";
import Wrapper from "../Common/Wrapper"; // Import Wrapper 
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useNavigate } from "react-router-dom"; // Import Use Navigate
import { useState } from "react"; // Import Use State
import { useSelector, useDispatch } from "react-redux"; // Import Use Dispatch
import { adduser } from "../Allreducers/allreducers"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
const defaultTheme = createTheme();

const Addproduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const { loading } = useSelector((state) => state.Adduser);

    const [gender, setGender] = useState(''); // State to hold selected gender


    //console.log(watch((data) => console.log(data)));

    // Handle form submission
    const onSubmit = async (data) => {

        const reg = {
            name: data.name,
            email: data.email,
            age: data.age,
            gender: gender // Use selected gender from state
        };


        try {
            const response = await dispatch(adduser(reg))
            console.log("Resss", response);
            if (response && response?.type === 'adduser/fulfilled') {
                reset()
                setGender('')
                navigate('/showuser')
            } else {
                navigate('/adduser')
            }
        } catch (error) {
            console.error("Error submitting data:", error);

        }
    };

    return (
        <Wrapper>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <Paper
                        elevation={5}
                        style={{
                            padding: "1rem 3rem",
                            marginTop: "30px",
                            width: "35rem",
                            marginBottom: "1rem",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add User
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="text"
                                            id="name"
                                            label="Name"
                                            {...register("name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.name && (
                                            <p style={{ color: 'red' }}>{errors.name.message}</p>
                                        )}
                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            {...register("email", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Email Pattern should be xyz@gmail.com",
                                                },
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="age"
                                            label="Age"
                                            {...register("age", {
                                                required: "This field is Required",
                                            })}
                                        />
                                        {errors?.age && (
                                            <p style={{ color: 'red' }}>{errors.age.message}</p>
                                        )}
                                    </Grid>

                                    {/*Handle Radio Area Start*/}
                                    <FormControl sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        marginLeft: 3,
                                        marginTop: 3
                                    }}>
                                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={gender} // Use state variable for value
                                            onChange={(e) => setGender(e.target.value)} // Update state on change
                                        >
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                    {/*Handle Radio Area Start*/}


                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <CircularProgress color="inherit" /> : "Add"}
                                </Button>
                            </Box>
                        </Box>

                    </Paper>
                </Container>
            </ThemeProvider>
        </Wrapper>
    );
};

export default Addproduct;