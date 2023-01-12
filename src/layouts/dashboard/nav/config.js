// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name, extension) => <SvgColor src={`/assets/icons/navbar/${name}.${extension}`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Cocktails',
    path: '/app/cocktails',
    icon: icon('cocktails', 'png'),
  },
  {
    title: 'Favoris',
    path: '/app/favoris',
    icon: icon('coeur', 'png'),
  },
  {
    title: 'Populaires',
    path: '/app/populaires',
    icon: icon('favoris', 'png'),
  },
  {
    title: 'Ingrédients',
    path: '/app/ingredients',
    icon: icon('alcool', 'png'),
  },
  {
    title: 'Type de verre',
    path: '/app/type_verre',
    icon: icon('verres', 'png'),
  },
  {
    title: 'Catégorie',
    path: '/app/categorie',
    icon: icon('options', 'png'),
  },
  {
    title: 'Mon compte',
    path: '/app/compte',
    icon: icon('user', 'png'),
  },
];

export default navConfig;
