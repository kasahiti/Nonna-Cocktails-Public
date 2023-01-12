import { Helmet } from 'react-helmet-async';

// @mui
import {
  Container,
  Typography,
  TextField,
  FormControl,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { ProductList } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [search, setSearch] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const searchCocktails = () => {
    axios.get(`https://nonna-cocktails-backend.herokuapp.com/api/cocktails?search=${search}`, {
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

  const randomCocktails = () => {
    axios.get(`https://nonna-cocktails-backend.herokuapp.com/api/cocktails/random`, {
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
          Bonjour ! Effectuer une recherche pour trouver votre cocktail
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl onChange={handleSearch} variant="standard">
            <TextField
              id="Cocktail-search"
              label="Cocktail"
              variant="outlined"
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  searchCocktails();
                }
              }} />
          </FormControl>

          <Button sx={{mt: 2, ml:2}} value="search" variant="contained" onClick={searchCocktails}>Chercher</Button>
          <Button sx={{mt: 2, ml:2}} value="search" variant="outlined" onClick={randomCocktails}>Cocktails aléatoires</Button>
        </Box>

        <ProductList products={cocktails} />
      </Container>
    </>
  );
}
