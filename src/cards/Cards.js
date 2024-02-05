import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import { Link } from 'react-router-dom';
import './style/Cards.css'
import { CardActionArea } from '@mui/material';
import { search } from '../components/Searchbar';
import { RoleTypes } from '../components/Navbar-config';

export default function Cards() {
    const [cards, setCards] = useState([]);
    const { setLoading, user, roleType, snackbar, navigate, searchWord, darkMode } = useContext(GeneralContext);

    // fetch all cards
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.shipap.co.il/cards?token=${token}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setCards(data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [setLoading])

    const adminRemoveCard = (id) => {
        if (!window.confirm('Are you sure you want to remove this card?')) {
            return;
        }
        setLoading(true);
        fetch(`https://api.shipap.co.il/admin/cards/${id}?token=${token}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setCards(cards.filter(c => c.id !== id));
                snackbar("Card removed successfully");
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    };

    const favorite = (card) => {
        fetch(`https://api.shipap.co.il/cards/${card.id}/favorite?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
        })
            .then(() => {
                snackbar("Card added to favorites");
                card.favorite = true;
            })
            .catch(err => console.log(err));
    }

    const unfavorite = (card) => {
        fetch(`https://api.shipap.co.il/cards/${card.id}/unfavorite?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
        })
            .then(() => {
                snackbar("Card removed from favorites");
                card.favorite = false;
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='Cards'>
            <Typography variant="h1" component="h1" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 48, margin: "30px 0 20px 0", paddingBottom: "10px", textAlign: 'center' }}>
                Truly for every occasion
                <Typography component="p" sx={{ fontWeight: 600, fontSize: 16 }}>
                    <br />
                    {cards.length ? "Here you can find business cards from all categories" : "There are no business cards currently available, be the first and create the first card!"}
                </Typography>
            </Typography>
            <div className='row'>
                {
                    cards.filter(c => search(searchWord, c.title, c.subtitle, c.country)).map(c =>
                        <Card className={darkMode ? 'darkmode' : 'column'} sx={{ width: 300, mb: 5, boxShadow: darkMode ? '0px 0px 10px 0.5px #ffffff' : '5px 5px 5px 5px rgba(0, 0, 0, 0.11)', borderRadius: '10px' }} key={c.title}>
                            <CardActionArea className={darkMode ? "darkmodeArea" : ""} onClick={() => navigate(`/cards/${c.id}`)}>
                                <CardMedia
                                    component="img"
                                    height="210"
                                    image={c.imgUrl}
                                    alt={c.imgAlt}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h1" component="h1" sx={{ fontFamily: "Oswald, sans-serif", fontWeight: 500, fontSize: 32 }}>
                                        {c.title}
                                    </Typography>
                                    <Typography gutterBottom variant="h1" component="h1" sx={{ ml: '2px', fontWeight: 300, fontSize: 16, borderBottom: "1px solid lightgray", pb: 2 }}>
                                        {c.subtitle}
                                    </Typography>
                                    <Typography style={{ marginTop: 20, fontSize: 16 }}>
                                        <b>Phone:</b> {c.phone}<br />
                                        <b>Adress:</b> {c.houseNumber} {c.street} <br /> {c.country}, {c.city}  {c.zip} <br />
                                        <b>Card Number:</b> 0000000{c.id}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                                {roleType === RoleTypes.admin && <IconButton className='trash-icon' sx={{ position: 'absolute', left: '5px', }} onClick={() => adminRemoveCard(c.id)} aria-label="delete">
                                    <DeleteIcon style={{ color: "grey" }} />
                                </IconButton>}

                                <IconButton className='heart-icon' aria-label="add to favorites" onClick={() => user ? (c.favorite ? unfavorite(c) : favorite(c)) : snackbar("This feature is only available for users")}>
                                    <FavoriteIcon style={{ color: !user ? "grey" : (c.favorite ? "red" : "grey") }} />
                                </IconButton>
                                <IconButton href={`tel:${c.phone}`} className='phone-icon' aria-label="call">
                                    <CallIcon style={{ color: "grey" }} />
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                }
            </div>
            {[RoleTypes.admin, RoleTypes.business].includes(roleType) && <button className='addCard'><Link to={'/business/cards/new'}>+</Link></button>}
        </div>
    );
}