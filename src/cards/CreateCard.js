import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import { GeneralContext, token } from '../App';
import { cardSchema } from '../utility/Joi';

export default function CreateCard() {
    const { snackbar, setLoading, navigate } = useContext(GeneralContext);
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

    function createCard(ev) {
        ev.preventDefault();
        setLoading(true);

        fetch(`https://api.shipap.co.il/business/cards?token=${token}`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                res.json();
            })
            .then(data => {
                setFormData(data);
                snackbar("Card created successfully");
                navigate('/business/cards');
            })
            .catch(err => console.log(err))
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
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ mt: 3, bgcolor: 'info.main' }}>
                    <AddBusinessIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Card
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={1.9}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.title)}
                                helperText={errors.title}
                                value={formData.name}
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
                                        value={formData.name}
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
                        onClick={createCard}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 10 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}