import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AboutMe() {
  return (
    <Container maxWidth="md" sx={{pb: 10}}>
      <Typography variant="h1" component="h1" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 48, marginY: 4, textAlign: 'center' }}>
        About Card4U
      </Typography>

      <Typography variant="body1" sx={{ fontSize: 18, marginBottom: 2 }}>
        Welcome to Card4U! Card4U is your go-to platform for creating and sharing simple yet stylish business cards. Whether you're a professional looking to showcase your information or someone seeking a quick and effective way to connect, Card4U has got you covered.
      </Typography>

      <Typography variant="h2" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 32, marginY: 3 }}>
        Key Features
      </Typography>
      <List>
        {[
          "Create Business Cards: Design your own professional business cards with ease.",
          "Display and Share: Showcase your business cards for others to see and connect.",
          "Favorites: Users can add cards to their favorites for quick access.",
          "Card Editing: Easily edit and update your own business cards.",
          "Search Functionality: Use the search bar to find specific business cards quickly.",
          "Dark Mode: Enjoy a stylish and comfortable viewing experience with our dark mode.",
        ].map((feature, index) => (
          <ListItem key={index}>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h2" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 32, marginY: 3 }}>
        How to Use
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 18, marginBottom: 2 }}>
        {[
          "Create a Business Card: Navigate to the MyCards section to design your personalized business card.",
          "Display and Share: Your created cards will be visible to others on the platform.",
          "Add to Favorites: Logged-in users can add cards to their favorites for quick access.",
          "Edit Your Cards: Easily update and edit your own business cards as needed.",
          "Search Functionality: Utilize the search bar to find specific business cards based on criteria.",
          "Dark Mode: Enable dark mode for a visually appealing and comfortable experience.",
        ].map((step, index) => (
          <React.Fragment key={index}>
            {index + 1}. <strong>{step}</strong>
            <br />
          </React.Fragment>
        ))}
      </Typography>

      <Typography variant="h2" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 32, marginY: 3 }}>
        Contact Information
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 18, marginBottom: 2 }}>
        Name: Adam Regev
        <br />
        Email: adamrgv@hotmail.com
        <br />
        Phone: +972 584201997
      </Typography>

      <Typography variant="h2" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 32, marginY: 3 }}>
        Terms of Service and Privacy Policy
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 18 }}>
        <Link to={'/TermsAndPrivacy'}>Terms of Service and Privacy Policy</Link>
      </Typography>
    </Container>
  );
};