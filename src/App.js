import { createContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Router from './Router';
import Navbar from './components/Navbar';
import Snackbar from './components/Snackbar';
import Loader from './components/Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { RoleTypes } from './components/Navbar-config'
import RouterAuth from './RouterAuth';

export const token = '5b613e90-5dba-11ee-aae9-14dda9d4a5f0';
export const GeneralContext = createContext();

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const snackbar = text => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(''), 3 * 1000);
  }
  
  // Login Status
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then(x => {
            throw new Error(x);
          });
        }
      })
      .then(data => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  //check login status every 10 minutes
  useEffect(() => {
    setInterval(() => {
      fetch(`https://api.shipap.co.il/clients/login`, {
        credentials: 'include',
      })
        .then(res => {
          if (res.ok) {
            return;
          } else {
            setUser();
            setRoleType(RoleTypes.none);
            throw new Error("User is not logged in");
          }
        })
        .catch(err => console.log(err))

    }, 10 * 60 * 1000)
  }, [])

  return (
    <GeneralContext.Provider value={{ user, setUser, loading, setLoading, snackbar, roleType, setRoleType, navigate, searchWord, setSearchWord, darkMode, setDarkMode }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className='App' style={{ backgroundColor: darkMode ? "#121212" : "#e3f2fd" }}>
          <Navbar />
          {user ? <RouterAuth /> : <Router />}
          <Footer />
          {loading && <Loader />}
          {snackbarText && <Snackbar text={snackbarText} />}
        </div>
      </ThemeProvider>
    </GeneralContext.Provider>
  );
}