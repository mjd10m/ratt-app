import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";

const CustIntake = () => {
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
            <Formik onSubmit={handleFormSubmit} validationSchema={formSchema}>

            </Formik>
        </Box>
    )
}

export default CustIntake