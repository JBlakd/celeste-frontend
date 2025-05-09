import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import classes from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={classes.backgroundWrap}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
