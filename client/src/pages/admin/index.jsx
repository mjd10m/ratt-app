import { Box, Button, TextField, Grid, FormControl, MenuItem, Typography} from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme"

const initialFormState = {
    firstName: '',
    lastName: '',
    email:'',
		company: ''
}

const Admin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width:600px)")
    
	const handleFormSubmit = (values) => {
		console.log(values)
	}
	const formSchema = yup.object().shape({
		firstName: yup.string().required("Required"),
		lastName: yup.string().required("Required"),
		email: yup.string().email('Invalid email address').required('Required'),
		company: yup.string().required("Required")
	})
	return(
		<Box m="20px">
			<Header title="Admin Panel" subtitle="Add and Manage Users"/>
			<Typography variant="h5" color={"secondary"} sx={{ m: "0 0 20px 0", textAlign:"center" }}>Add New User</Typography>
			<Formik onSubmit={handleFormSubmit} validationSchema={formSchema} initialValues={initialFormState}>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Box display="flex" justifyContent="space-between" paddingBottom = "20px">
							<TextField  sx={{m: "0 0 5px 0" }} fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" id="firstName" name="firstName" label="First Name" type="text" onChange={handleChange} value={values.firstName} error={touched.firstName && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName}/>
							<TextField fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Last Name" id="lastName" name="lastName" type="text" onChange={handleChange} value={values.lastName} error={touched.lastName && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName}/>
							<TextField fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Email" id="email" name="email" type="email" onChange={handleChange} value={values.email} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
							<TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Company" id="company" name="company" type="text" onChange={handleChange} value={values.company || ''} error={touched.company && Boolean(errors.company)} helperText={touched.company && errors.company}>
								<MenuItem value = {"new"}>Add New</MenuItem>
								<MenuItem value = {"Riverview Auto Tag and Title"}>Riverview Auto Tag and Title</MenuItem>
							</TextField>  
						</Box>
						<Box display="flex" justifyContent="center" paddingBottom = "20px">
							<Button type="submit" color={theme.palette.mode === "dark" ? "secondary" : "primary"} variant="contained" >Add User</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	)
}

export default Admin