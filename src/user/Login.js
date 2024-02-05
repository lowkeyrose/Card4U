import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GeneralContext, token } from '../App';
import Joi from 'joi';
import { RoleTypes } from '../components/Navbar-config';

export default function Login() {
  const { setUser, setLoading, snackbar, setRoleType, navigate } = useContext(GeneralContext)
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.email ? JSON.parse(localStorage.email) : "",
    password: '',
  });

  const userSchema = Joi.object({
    email: Joi.string().max(62).required().email({ tlds: false }),
    password: Joi.string().required().min(4).max(30)

    // Corret validation below (admin password was set before we were required to have a different validation, the validation below is the correct one)
    
    // password: Joi.string().required()
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
    // .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*')

  })

  const login = ev => {
    ev.preventDefault();
    setLoading(true);

    fetch(`https://api.shipap.co.il/clients/login?token=${token}`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text()
            .then(x => {
              throw new Error(x);
            });
        }
      })
      .then(data => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (rememberMe) {
          localStorage.email = JSON.stringify(data.email);
        } else {
          localStorage.email = "";
        }
        
        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }
        
        snackbar(`${data.fullName} logged in successfully!`);
        navigate('/');
      })
      .catch(err => {
        snackbar("Email Address or Password are incorrect")
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleInput = ev => {
    const { id, value } = ev.target;
    let obj = {
      ...formData,
      [id]: value,
    };

    if (id === 'business') {
      const { id, checked } = ev.target;
      obj = {
        ...formData,
        [id]: checked
      }
    }
    const schema = userSchema.validate(obj, { abortEarly: false, allowUnknown: true });
    const err = { ...errors, [id]: undefined };

    if (schema.error) {
      const error = schema.error.details.find(e => e.context.key === id);

      if (error) {
        err[id] = error.message;
      }
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setFormData(obj);
    setErrors(err);
  };

  return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              autoComplete="email"
              autoFocus
              onChange={handleInput}
            />

            <TextField
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInput}
            />

            <FormControlLabel
              control={<Checkbox defaultValue={rememberMe} onChange={() => setRememberMe(!rememberMe)} color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}