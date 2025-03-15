import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Auth from '../../utils/auth'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [showPage, setShowPage] = React.useState('');
  const [tokenData, setTokenData] = React.useState()
  
  const API = axios.create({
    baseURL: 'http://localhost:5001/api', // 👈 your API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const validateToken = async () => {
    const token = Auth.getSignupToken() 
    try {
      const response = await API.post('/signuptoken/validate', {
        token: token
      })
      setShowPage(response.data.isValid)
      if(response.data.isValid) {
        const { data: { email, company, role } } = jwtDecode(token)
        setTokenData({ email, company, role })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const validateInputs = () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!username.value || username.value.length < 6) {
      setUsernameError(true);
      setUsernameErrorMessage('Username must be at least 6 characters long.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (nameError || usernameError || passwordError) {
      event.preventDefault();
      return;
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const nameArr = name.split(' ')
    const user = {
      username,
      email: tokenData.email,
      password,
      firstName: nameArr[0],
      lastName: nameArr[1],
      company: tokenData.company,
      role: tokenData.role,
      companyBanner: "stuff",
      status: true
    }
    try {
      const res = await API.post('/users', user);
      console.log('User created:', res.data);
      Auth.login(res.data.token)
      window.location.assign('/')
    } catch (err) {
      console.error('Error:', err);
    }
  };
  React.useEffect(() => {
    validateToken();
  }, []);

  return (
    <>
    {showPage ? (
      <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Username</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                placeholder=""
                name="username"
                autoComplete=""
                variant="outlined"
                error={usernameError}
                helperText={usernameErrorMessage}
                color={usernameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
      </>
    ):(<Typography
      component="h1"
      variant="h5"
      sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', display: 'flex', justifyContent: 'center'}}
      >
      Invalid or Expired Token, please contact Administrator
    </Typography>)}
    </>
  );
}