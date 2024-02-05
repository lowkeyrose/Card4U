import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import { CardActionArea } from '@mui/material';
import { search } from '../components/Searchbar';
import './style/Cards.css'

export default function FavoriteCards() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const { setLoading, snackbar, navigate, searchWord, darkMode } = useContext(GeneralContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.shipap.co.il/cards/favorite?token=${token}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setFavoriteCards(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [setLoading])

  const unfavorite = (id) => {
    setLoading(true);
    fetch(`https://api.shipap.co.il/cards/${id}/unfavorite?token=${token}`, {
      credentials: 'include',
      method: 'PUT',
    })
      .then(() => {
        setFavoriteCards(favoriteCards.filter(c => c.id !== id));
        snackbar("Card removed from favorites");
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }
  
  return (
    <div className='Cards'>
      <Typography variant="h1" component="h1" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 48, margin: "30px 0 20px 0", paddingBottom: "10px", textAlign: 'center' }}>
        Favorite Cards
        <Typography component="p" sx={{ fontWeight: 600, fontSize: 16 }}>
        <br/>
          { favoriteCards.length ? "Here you can find your favorite cards" : "You currently have no favorite cards, Favorite cards will appear here once you've added them to favorites"}
        </Typography>
      </Typography>
      <div className='row'>
        {
          favoriteCards.filter(c => search(searchWord, c.title, c.subtitle, c.country)).map(c =>
            <Card className= {darkMode ? 'darkmode' :'column'} sx={{ width: 300, mb: 5, boxShadow: darkMode ? '0px 0px 10px 0.5px #ffffff': '5px 5px 5px 5px rgba(0, 0, 0, 0.11)', borderRadius: '10px' }} key={c.title}>
              <CardActionArea onClick={() => navigate(`/cards/${c.id}`)}>
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
                <IconButton className='heart-icon' aria-label="add to favorites" onClick={() => unfavorite(c.id)}>
                  <FavoriteIcon style={{ color: "red" }} />
                </IconButton>
                <IconButton href={`tel:${c.phone}`}  className='phone-icon' aria-label="call">
                  <CallIcon style={{ color: "grey" }} />
                </IconButton>
              </CardActions>
            </Card>
          )
        }
      </div>
    </div>
  );
}