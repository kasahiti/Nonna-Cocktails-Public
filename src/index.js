import ReactDOM from 'react-dom/client';
import { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';

//
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';



// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

if (localStorage.getItem("user") === null) {
  localStorage.setItem('user', JSON.stringify({name: '', auth: false, favorites: []}));
}

const UserContext = createContext(localStorage.getItem('user'));

const baseAPI = "https://nonna-cocktails-backend.herokuapp.com/api";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (name, pass) => {
    const json = JSON.stringify({username: name, password: pass});

    return axios.post(`${baseAPI}/auth/signin`, json, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        getFavorites()
          .then((fav) => {
            setUser({name, auth: true, favorites: fav});
            localStorage.setItem('user', JSON.stringify({name, auth: true, favorites: fav}));
          });
        return true;
      })
      .catch(() => false);
  };

  // Logout updates the user data to default
  const logout = () => {
    axios.post(`${baseAPI}/auth/signout`, {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data)
        setUser({name: '', auth: false, favorites: []});
        localStorage.setItem('user', JSON.stringify({name: '', auth: false, favorites: []}));
      })

    setUser({
      name: '',
      password: '',
      auth: false,
      favorites: []
    });
  };

  const getFavorites = () => {
    return axios.get(`${baseAPI}/cocktails/favorites`, {withCredentials: true})
      .then(response => {
        return JSON.parse(response.data.message);
      })
      .catch(error => {console.log(error)})
  }

  const addFavorite = (idCocktail) => {
    return axios.post(`${baseAPI}/cocktails/favorites`, JSON.stringify([idCocktail]), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
    })
      .then(() => {
        refreshFavorites()
        return true;
      })
      .catch(error => {console.log(error); return false})
  }

  const removeFavorite = (idCocktail) => {
    return axios.delete(`${baseAPI}/cocktails/favorites`, {
      withCredentials: true,
      data: JSON.stringify([idCocktail]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        refreshFavorites()
        return true;
      })
      .catch(error => {console.log(error); return false})
  }

  const refreshFavorites = () => {
    getFavorites()
      .then((fav) => {
        setUser({...user, favorites: fav});
        localStorage.setItem('user', JSON.stringify({...user, favorites: fav}));
      })
  }

  const changePassword = (newPassword) => {
    return axios.post(`${baseAPI}/auth/password`, newPassword, {
      headers: {
        'Content-Type': 'plain/text'
      },
      withCredentials: true
    })
      .then(() => true)
      .catch(() => false)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, getFavorites, addFavorite, removeFavorite, changePassword }}>
      {children}
    </UserContext.Provider>
  );
}

root.render(
  <HelmetProvider>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={ <App /> }> </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default UserContext;