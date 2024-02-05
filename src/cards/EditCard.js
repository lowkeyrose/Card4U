import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import { useParams } from 'react-router-dom';
import { cardSchema } from '../utility/Joi';
import { RoleTypes } from '../components/Navbar-config';

export default function CreateCard() {
    const { snackbar, setLoading, navigate, roleType, user } = useContext(GeneralContext);
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const structure = [
        { name: 'subtitle', type: 'text', label: 'Subtitle', required: true, halfWidth: true },
        { name: 'description', type: 'text', label: 'Description', required: true, halfWidth: true },
        { name: 'phone', type: 'tel', label: 'Phone', required: true, halfWidth: true },
        { name: 'email', type: 'email', label: 'Email', required: true, halfWidth: true },
        { name: 'web', type: 'text', label: 'Web', required: false, halfWidth: true },
        { name: 'imgUrl', type: 'text', label: 'Image url', required: false, halfWidth: true },
        { name: 'imgAlt', type: 'text', label: 'Image alt', required: false, halfWidth: true },
        { name: 'state', type: 'text', label: 'State', required: false, halfWidth: true },
        { name: 'country', type: 'text', label: 'Country', required: true, halfWidth: true },
        { name: 'city', type: 'text', label: 'City', required: true, halfWidth: true },
        { name: 'street', type: 'text', label: 'Street', required: true, halfWidth: true },
        { name: 'houseNumber', type: 'number', label: 'House number', required: true, halfWidth: true },
        { name: 'zip', type: 'number', label: 'Zip', required: false, halfWidth: true },
    ]

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        imgUrl: '',
        imgAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
    });

    // Get card information
    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/${id}?token=${token}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if ((user.id === data.clientId && roleType === RoleTypes.business) || (roleType === RoleTypes.admin && data.clientId === 0)) {
                    return setFormData(data);
                } else {
                    navigate('/errorPage')
                }
            })
            .catch(err => {
                navigate('/errorPage');
                console.log(err);
            })
    }, [id, navigate, setLoading, roleType, user.id]);

    function submit(ev) {
        ev.preventDefault();
        setLoading(true);

        fetch(`https://api.shipap.co.il/business/cards/${id}?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(data => {
                setFormData(data);
                snackbar("Card saved successfully");
                navigate('/business/cards');
            })
            .catch(err => snackbar(err.message))
            .finally(() => setLoading(false));
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
        const schema = cardSchema.validate(obj, { abortEarly: false, allowUnknown: true });
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
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Card
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={1.9}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.title)}
                                helperText={errors.title}
                                value={formData.title}
                                onChange={handleInput}
                                name="title"
                                required
                                fullWidth
                                id="title"
                                label="Title"
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
                        onClick={submit}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}