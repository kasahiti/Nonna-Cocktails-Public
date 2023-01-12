import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Box, Button, Collapse, Container, FormControl, IconButton, Stack, TextField, Typography } from '@mui/material';
// components
import axios from 'axios';
import { Alert } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function VerrePage() {
  const [search, setSearch] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const searchCocktails = () => {
    if(search.length === 0) {
      setOpen(true)
      return
    }

    setOpen(false)

    axios.get(`https://nonna-cocktails-backend.herokuapp.com/api/cocktails/verres?search=${search}`, {
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
        <title> Dashboard: Type de verre | Nonna Cocktails </title>
      </Helmet>

      <Container  maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Recherche par type de verre
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
              label="Cocktail par type de verre"
              variant="outlined"
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  searchCocktails();
                }
              }} />
          </FormControl>

          <Button sx={{mt: 2}} value="search" variant="contained" onClick={searchCocktails}>Chercher</Button>
        </Box>

        <Box
          sx={{
            width: "40ch",
          }}
          noValidate
          autoComplete="off"
        >
          <Collapse in={open}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Veuillez saisir un type de verre !
            </Alert>
          </Collapse>
        </Box>


        <ProductList products={cocktails} />
      </Container>
    </>
  );
}
