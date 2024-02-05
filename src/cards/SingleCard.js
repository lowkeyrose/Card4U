import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import ErrorPage from '../pages/ErrorPage';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { CardActions, IconButton } from '@mui/material';

export default function SingleCard() {
    const { id } = useParams();
    const { darkMode } = useContext(GeneralContext);
    const [card, setCard] = useState({});

    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/${id}?token=${token}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setCard(data)})
            .catch(err => {
                console.log(err);
                setCard();
            });
    }, [id])

    return (
        <div className='SingleCard'>
            {card ?
                <Card sx={{ width: 800 ,maxWidth: "90%", m: 'auto', boxShadow: darkMode ? '0px 0px 10px 0.5px #ffffff': '5px 5px 5px 5px rgba(0, 0, 0, 0.11)', borderRadius: '10px', mt: 3 }}>
                    <CardMedia
                        component='img'
                        height={'50%'}
                        image={card.imgUrl}
                        alt={card.imgAlt}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h2" component="div" sx={{ mt: '15px', mb:"0", fontSize: 'clamp(30px,7vw,60px)', }} >
                            {card.title}
                        </Typography>
                        <Typography variant="body2" component='div' padding={2}>
                            <p style={{ fontSize: 'clamp(20px,7vw,24px)' }}>{card.subtitle}</p>
                            <br />
                            <p style={{ fontSize: 'clamp(14px,7vw,18px)' }}>{card.description}</p>
                        </Typography>
                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                            <IconButton href={`https://maps.google.com/?q=${card.houseNumber},${card.street}${card.state},${card.city},${card.zip}`} target='_blank' rel="noreferrer" className='phone-icon' aria-label="location">
                                <LocationOnIcon style={{ color: "grey" }} />
                            </IconButton>
                            <IconButton href={`tel:${card.phone}`} className='phone-icon' aria-label="call">
                                <CallIcon style={{ color: "grey" }} />
                            </IconButton>
                            <IconButton href={`mailto:${card.email}`} className='email-icon' aria-label="email">
                                <AlternateEmailIcon style={{ color: "grey" }} />
                            </IconButton>
                            <IconButton href={card.web} className='phone-icon' aria-label="website" target='_blank' rel="noreferrer">
                                <LanguageIcon style={{ color: "grey" }} />
                            </IconButton>
                        </CardActions>
                    </CardContent>
                </Card>
                :
                <ErrorPage />
            }
        </div>
    );
}