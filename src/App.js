// React / React Router
import { Routes, Route } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

// Pages
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import IngredientPage from './pages/IngredientPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserContext from './index';
import FavoritesPage from './pages/FavoritesPage';
import VerrePage from './pages/VerrePage';
import CategoriePage from './pages/CategoriePage';
import PopularCocktails from './pages/PopularCocktails';
// ----------------------------------------------------------------------

const PrivateRoute = () => {
  const { user } = useContext(UserContext) ;

  return user.auth ? <Outlet /> : <Navigate to="/login" />;
}


export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />

      <Routes>
        <Route exact path="/app" element={<PrivateRoute />} >
          <Route exact path="/app" element={<DashboardLayout />} >
            <Route element={<Navigate to="/app/cocktails" />} index />
            <Route exact path="cocktails" element={<DashboardAppPage />} />
            <Route exact path="favoris" element={<FavoritesPage />} />
            <Route exact path="populaires" element={<PopularCocktails />} />
            <Route exact path="compte" element={<UserPage />} />
            <Route exact path="ingredients" element={<IngredientPage />} />
            <Route exact path="type_verre" element={<VerrePage />} />
            <Route exact path="categorie" element={<CategoriePage />} />
          </Route>
        </Route>
        <Route exact path="login" element={<LoginPage />} />
        <Route element={<SimpleLayout />} >
          <Route element={<Navigate to="/app/cocktails" />} index />
          <Route exact path="404" element={<Page404 />} />
          <Route exact path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>

    </ThemeProvider>
  );
}
