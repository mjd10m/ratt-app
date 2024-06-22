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
                            <TextField sx={{m: "0 0 5px 0" }} fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="firstName" name="firstName" label="First Name" type="text" onChange={handleChange} value={values.firstName}/>
                            <TextField fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Last Name" id="lastName" name="lastName" type="text" onChange={handleChange} value={values.lastName}/>
                            <TextField fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Phone Number" id="phone" name="phone" type="text" onChange={handleChange} value={values.phone}/>
                            <TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Transaction Type" id="transType" name="transType" type="text" onChange={handleChange} value={values.transType || ''}>
                                <MenuItem value = {"title"}>Title</MenuItem>
                                <MenuItem value = {"reg"}>Registration</MenuItem>
                                <MenuItem value = {"titleReg"}>Title and Registration</MenuItem>
                            </TextField>  
                        </Box>
                        <Box display="flex" justifyContent="space-between" paddingBottom = "20px">
                            <Grid container spacing={2} justifyContent="space-between">
                                <Grid item xs={8}>
                                        <TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="titleState" name="titleState" label="Title State" type="text" onChange={handleChange} value={values.titleState || ''}>
                                            <MenuItem value = {"florida"}>Florida Title</MenuItem>
                                            <MenuItem value={"oos"}>Out of State Title</MenuItem>
                                            <MenuItem value={"mco"}>MCO (Manufactor Certificate of Orgin)</MenuItem>
                                            <MenuItem value={"frost"}>FROST</MenuItem>
                                        </TextField>
                                </Grid>
                                <Grid item xs={8}>
                                    {values.titleState === "florida" ? 
                                    <TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="titleAction" name="titleAction" label="Title Action" type="text" onChange={handleChange} value={values.titleAction || ''}> 
                                        <MenuItem value = {"tran"}>Transfer</MenuItem>
                                        <MenuItem value={"dup"}>Duplicate</MenuItem>
                                        <MenuItem value={"dupTran"}>Duplicate with Transfer</MenuItem>
                                    </TextField> 
                                    : ""
                                    }   
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="titleType" name="titleType" label="Title Type" type="text" onChange={handleChange} value={values.titleType || ''}>
                                        <MenuItem value = {"veh"}>Vehicle Private Use</MenuItem>
                                        <MenuItem value={"vehlesauto"}>Vehicle Lease/For Hire Auto</MenuItem>
                                        <MenuItem value={"vehlnoauto"}>Vehicle Lease/For Hire Not Auto</MenuItem>
                                        <MenuItem value={"mh"}>Mobile Home Private/Lease</MenuItem>
                                        <MenuItem value={"vess"}>Vessel</MenuItem>
                                        <MenuItem value={"ohv"}>Off Highway Vehicle</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <h3>Title Total: 1000</h3>
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