import { Helmet } from 'react-helmet-async';

// @mui
import { Container, Typography, TextField, FormControl, Button, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductList } from '../sections/@dashboard/products';
import UserContext from '../index';

// ----------------------------------------------------------------------

export default function FavoritesPage() {
  const { user } = useContext(UserContext);
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    getPopularCocktails()
  }, [user.favorites])

  const getPopularCocktails = () => {
    axios.get(`https://nonna-cocktails-backend.herokuapp.com/api/cocktails?search=`, {
      withCredentials: true,
    })
      .then(response => {
        const cocktailArray = Object.entries(response.data.drinks);
        const finalArray = [];

        // eslint-disable-next-line no-plusplus
        for(let i=0; i < cocktailArray.length; i++) {
          if(user.favorites.includes(parseInt(cocktailArray[i][1].idDrink, 10))) {
            finalArray.push(cocktailArray[i][1])
          }
        }
        setCocktails(finalArray);
      })
      .catch((error) => {console.log(error); setCocktails([])});
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Nonna Cocktails </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Voici la liste de vos cocktails préférés
        </Typography>

        <ProductList products={cocktails} />
      </Container>
    </>
  );
}
