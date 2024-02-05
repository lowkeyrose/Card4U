import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import { noPassSchema } from '../utility/Joi';

export default function Account() {
  const { snackbar, setLoading, navigate, setUser } = useContext(GeneralContext);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    imgUrl: '',
    imgAlt: '',
    state: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zip: '',
  });
  
const structure = [
    { name: 'middleName', type: 'text', label: 'Middle name', required: false, halfWidth: true },
    { name: 'lastName', type: 'text', label: 'Last name', required: true, halfWidth: true },
    { name: 'phone', type: 'tel', label: 'Phone', required: true, halfWidth: true },
    { name: 'email', type: 'email', label: 'Email', required: true, halfWidth: true },
    { name: 'imgAlt', type: 'text', label: 'Image alt', required: false, halfWidth: true },
    { name: 'imgUrl', type: 'text', label: 'Image url', required: false, halfWidth: false },
    { name: 'state', type: 'text', label: 'State', required: false, halfWidth: true },
    { name: 'country', type: 'text', label: 'Country', required: true, halfWidth: true },
    { name: 'city', type: 'text', label: 'City', required: true, halfWidth: true },
    { name: 'street', type: 'text', label: 'Street', required: true, halfWidth: true },
    { name: 'houseNumber', type: 'number', label: 'House number', required: true, halfWidth: true },
    { name: 'zip', type: 'number', label: 'Zip', required: false, halfWidth: true },
  ]

// Get client information
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          res.text()
          .then(x => {
            throw new Error(x)
          })
        }
      })
      .then(data => {
        setFormData(data);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [navigate, setLoading]);

  function editInfo(ev) {
    fetch(`https://api.shipap.co.il/clients/update?token=${token}`, {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        snackbar('User updated successfully');
        navigate('/');
        setUser(formData);
      })
      .catch(err => {
        console.log(err)
        snackbar("Failed to update information")
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
    const schema = noPassSchema.validate(obj, { abortEarly: false, allowUnknown: true });
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
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Information
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
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
            </Grid>
            <Button
              onClick={editInfo}
              disabled={!isValid}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 10 }}
            >
              Save Info
            </Button>
          </Box>
        </Box>
      </Container>
  );
}