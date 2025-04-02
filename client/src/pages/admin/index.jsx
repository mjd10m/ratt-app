import { Box, Button, TextField, Grid, FormControl, MenuItem, Typography} from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme"

const initialFormState = {
    email:'',
		company: '',
		role: ''
}

const Admin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width:600px)")
    
	const handleFormSubmit = (values) => {
		console.log(values)
	}
	const formSchema = yup.object().shape({
		email: yup.string().email('Invalid email address').required('Required'),
		company: yup.string().required("Required"),
		role: yup.string().required("Required")
	})
	return(
		<Box m="20px">
			<Header title="Admin Panel" subtitle="Add and Manage Users"/>
			<Typography variant="h5" color={"secondary"} sx={{ m: "0 0 20px 0", textAlign:"center" }}>Add New User</Typography>
			<Formik onSubmit={handleFormSubmit} validationSchema={formSchema} initialValues={initialFormState}>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Box display="flex" justifyContent="space-between" paddingBottom = "20px">
							<TextField fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Email" id="email" name="email" type="email" onChange={handleChange} value={values.email} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
							<TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Company" id="company" name="company" type="text" onChange={handleChange} value={values.company || ''} error={touched.company && Boolean(errors.company)} helperText={touched.company && errors.company}>
								<MenuItem value = {"new"}>Add New</MenuItem>
								<MenuItem value = {"Riverview Auto Tag and Title"}>Riverview Auto Tag and Title</MenuItem>
							</TextField>
							<TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Role" id="role" name="role" type="text" onChange={handleChange} value={values.role} error={touched.role && Boolean(errors.role)} helperText={touched.role && errors.role}>
								<MenuItem value = {"admin"}>Admin</MenuItem>
								<MenuItem value = {"manager"}>Manager</MenuItem>
								<MenuItem value = {"user"}>User</MenuItem>
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