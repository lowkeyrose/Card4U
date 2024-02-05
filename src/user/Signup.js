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
import { userSchema } from '../utility/Joi';

export default function Signup() {
  const { snackbar, setLoading, navigate } = useContext(GeneralContext);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    imgUrl: '',
    imgAlt: '',
    state: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zip: '',
    business: false,
  });

  const structure = [
    { name: 'middleName', type: 'text', label: 'Middle name', required: false, halfWidth: true },
    { name: 'lastName', type: 'text', label: 'Last name', required: true, halfWidth: true },
    { name: 'phone', type: 'tel', label: 'Phone', required: true, halfWidth: true },
    { name: 'email', type: 'email', label: 'Email', required: true, halfWidth: false },
    { name: 'password', type: 'password', label: 'Password', required: true, halfWidth: true },
    { name: 'imgAlt', type: 'text', label: 'Image alt', required: false, halfWidth: true },
    { name: 'imgUrl', type: 'text', label: 'Image url', required: false, halfWidth: false },
    { name: 'state', type: 'text', label: 'State', required: false, halfWidth: true },
    { name: 'country', type: 'text', label: 'Country', required: true, halfWidth: true },
    { name: 'city', type: 'text', label: 'City', required: true, halfWidth: true },
    { name: 'street', type: 'text', label: 'Street', required: true, halfWidth: true },
    { name: 'houseNumber', type: 'number', label: 'House number', required: true, halfWidth: true },
    { name: 'zip', type: 'number', label: 'Zip', required: false, halfWidth: true },
]

  function signup(ev) {
    ev.preventDefault();
    setLoading(true);
    
    fetch(`https://api.shipap.co.il/clients/signup?token=${token}`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(() => {
              sessionStorage.email = formData.email;
              snackbar("User was created successfully")
              navigate('/login');
            })
        } else {
          return res.text()
            .then(x => {
              throw new Error(x);
            });
        }
      })
      .catch(err => {
        snackbar("failed to create user")
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
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ marginTop: 2.5, mb: 9, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Grid>
        <Box component="form" sx={{ mt: 2.5 }}>
          <Grid container spacing={1.9}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                value={formData.firstName}
                onChange={handleInput}
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            {
              structure.map(item =>
                <Grid item xs={12} sm={item.halfWidth ? 6 : 12} key={item.name}>
                  <TextField
                    error={Boolean(errors[item.name])}
                    helperText={errors[item.name]}
                    onChange={handleInput}
                    value={formData[item.name]}
                    name={item.name}
                    type={item.type}
                    required={item.required}
                    fullWidth
                    id={item.name}
                    label={item.label}
                  />
                </Grid>
              )
            }
            <Grid item xs={12} sx={{ mt: -1 }}>
              <FormControlLabel
                label="Business"
                control={<Checkbox
                  id="business"
                  color="primary"
                  checked={formData.business}
                  onChange={handleInput}
                  name="business"
                />}
              />
            </Grid>
          </Grid>
          <Button
            onClick={signup}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          > Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}