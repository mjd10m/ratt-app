import { Box, Button, TextField, Grid, FormControl, MenuItem} from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme"

const initialFormState = {
    firstName: '',
    lastName: '',
    phone:''
}

const CustIntake = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isNonMobile = useMediaQuery("(min-width:600px)")
    
    const handleFormSubmit = (values) => {
        console.log(values)
    }
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const formSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required")
    })
    return(
        <Box m="20px">
            <Header title="Customer Intake" subtitle="Enter Customer Information"/>
            <Formik onSubmit={handleFormSubmit} validationSchema={formSchema} initialValues={initialFormState}>
                {({ values, error, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" justifyContent="space-between" paddingBottom = "20px">
                            <TextField color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="firstName" name="firstName" label="First Name" type="text" onChange={handleChange} value={values.firstName}/>
                            <TextField color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Last Name" id="lastName" name="lastName" type="text" onChange={handleChange} value={values.lastName}/>
                            <TextField color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Phone Number" id="phone" name="phone" type="text" onChange={handleChange} value={values.phone}/>  
                        </Box>
                        <Box display="flex" justifyContent="space-between" paddingBottom = "20px">
                            <Grid container spacing={2} justifyContent="left">
                                <Grid item xs={8}>
                                        <TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="titleType" name="titleType" label="Title Type" type="text" onChange={handleChange} value={values.titleType || ''}>
                                            <MenuItem value = {"florida"}>Florida Title</MenuItem>
                                            <MenuItem value={"oos"}>Out of State Title</MenuItem>
                                            <MenuItem value={"frost"}>FROST</MenuItem>
                                        </TextField>
                                </Grid>
                                <Grid item xs={8}>
                                        <TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="titleAction" name="titleAction" label="Title Action" type="text" onChange={handleChange} value={values.titleAction}> 
                                            <MenuItem value = {"tran"}>Transfer</MenuItem>
                                            <MenuItem value={"dup"}>Duplicate</MenuItem>
                                            <MenuItem value={""}>FROST</MenuItem>
                                        </TextField>
                                </Grid>
                            </Grid>   
                        </Box>
                        <Button type="submit" color={theme.palette.mode === "dark" ? "secondary" : "primary"} variant="contained" >Submit</Button>
                    </form>
                ) }
            </Formik>
        </Box>
    )
}

export default CustIntake