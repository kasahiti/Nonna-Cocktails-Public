import { Helmet } from 'react-helmet-async';

// @mui
import { Container, Typography, TextField, FormControl, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductList } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function PopularCocktails() {
  const [cocktails, setCocktails] = useState([]);


  useEffect(() => {
    getPopularCocktails()
  }, [])

  const getPopularCocktails = () => {
    axios.get(`https://nonna-cocktails-backend.herokuapp.com/api/cocktails/populars`, {
      withCredentials: true,
    })
      .then(response => {
        const cocktailArray = Object.entries(response.data.drinks);
        const finalArray = [];

        // eslint-disable-next-line no-plusplus
        for(let i=0; i < cocktailArray.length; i++) {
          finalArray.push(cocktailArray[i][1])
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

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Voici les 20 cocktails les plus populaires !
        </Typography>

        <ProductList products={cocktails} />
      </Container>
    </>
  );
}
