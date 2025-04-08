import { Box, Button, TextField,MenuItem, Typography} from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme"
import { useEffect, useState } from "react";
import axios from 'axios'

const initialFormState = {
    email:'',
		company: '',
		role: '',
		companyName: '',
		companyBanner: ''
}
const API = axios.create({
	baseURL: 'http://localhost:5001/api', // 👈 your API base URL
	headers: {
		'Content-Type': 'application/json',
	},
});

const Admin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width:600px)")
	const [companies, setCompanies] = useState([])
    
	const handleFormSubmit = async (values) => {
		console.log(values)
		if(values.companyName !== '') {
			try {
				const companyRes = await API.post('/companies', {
					name: values.companyName,
					banner: values.companyBanner,
				});
				const {company} = companyRes
				const userRes = await API.post('/signuptoken', {
					email: values.email,
					companyId: company.Id,
					role: values.role
				})
				console.log(userRes.data.message)
			} catch (error) {
				console.log(error)
			}
		}
		try {
			const userRes = await API.post('/signuptoken', {
				email: values.email,
				companyId: values.company,
				role: values.role
			})
			console.log(userRes.data.message)
		} catch (error) {
			
		}
	}
	const formSchema = yup.object().shape({
		email: yup.string().email('Invalid email address').required('Required'),
		company: yup.string().required("Required"),
		role: yup.string().required("Required"),
		companyName: yup.string()
    .when('company', {
      is: 'new', // 🔥 when company === 'new'
      then: (schema) => schema.required('Company name is required'),
      otherwise: (schema) => schema.notRequired()
    }),
		companyBanner: yup.string()
    .when('company', {
      is: 'new',
      then: (schema) => schema
        .url('Must be a valid URL')
        .required('Company banner URL is required'),
      otherwise: (schema) => schema.notRequired()
    })
	})
	useEffect(() => {
		API.get('/companies')
    .then((res) => setCompanies(res.data))
    .catch((err) => console.error('Error fetching users:', err));
	},[])
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
								{companies.length > 0 ?
									[
										<MenuItem key = "0" value = {"new"}>Add New</MenuItem>,
										companies.map((company) => (
											<MenuItem key={company?.id || ""} value = {company?.id || ""}>{company?.name || "Not Found"}</MenuItem>
										))
									]
								: [
									<MenuItem key = "0" value = {"new"}>Add New</MenuItem>
								]}
							</TextField>
							<TextField select fullWidth color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Role" id="role" name="role" type="text" onChange={handleChange} value={values.role} error={touched.role && Boolean(errors.role)} helperText={touched.role && errors.role}>
								<MenuItem value = {"admin"}>Admin</MenuItem>
								<MenuItem value = {"manager"}>Manager</MenuItem>
								<MenuItem value = {"user"}>User</MenuItem>
							</TextField>  
						</Box>
						{values.company === "new" ? (
							<Box display="flex" justifyContent="center" paddingBottom = "20px">
								<TextField full fullWidth sx={{ maxWidth: 300 }} color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Company Name" id="companyName" name="companyName" type="companyName" onChange={handleChange} value={values.companyName} error={touched.companyName && Boolean(errors.companyName)} helperText={touched.companyName && errors.companyName}/>
								<TextField fullWidth sx={{ maxWidth: 300 }} color={"primary"} InputLabelProps={{shrink: true}} variant="outlined" label="Company Banner URL" id="companyBanner" name="companyBanner" type="companyBanner" onChange={handleChange} value={values.companyBanner} error={touched.companyBanner && Boolean(errors.companyBanner)} helperText={touched.companyBanner && errors.companyBanner}/>
							</Box>
						) : (
						<div></div>
						)}
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