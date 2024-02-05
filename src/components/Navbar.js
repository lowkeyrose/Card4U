import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import Searchbar from './Searchbar';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../App';
import { RoleTypes, checkPermissions, pages, settings } from './Navbar-config'
import CustomizedSwitch from './CustomizedSwitch';

export default function Navbar() {
  const { user, roleType, navigate, setUser, setRoleType, setLoading, darkMode } = useContext(GeneralContext)
  const path = useResolvedPath().pathname;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const location = useLocation();
  const currentPage = location.pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setLoading(true);
    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: 'include',
    })
      .then(() => {
        setUser();
        setRoleType(RoleTypes.none);
        navigate('/');
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
    handleCloseUserMenu();
  }

  return (
    <AppBar position="static" >
      <Container maxWidth="100%" sx={{backgroundColor: darkMode ? "#282828" : "#092a4a"}}>
        <Toolbar disableGutters>
          <Link to='/' style={{ textDecoration: 'none', color: 'White' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 4,
                display: { xs: 'none', sm: 'none', lg: 'flex' },
                fontFamily: 'Pacifico, cursive',
                fontSize: "40px",
                fontWeight: 600,
                color: 'inherit',
                textDecoration: 'none',
              }}
            > Card4U
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block', lg: 'none' },
              }}
            >
              {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: darkMode ? "white" : "black" }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
                <Link to={'/'} style={{ textDecoration: 'none', color: darkMode ? "white" : "black" }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </Link>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'none'},
              fontFamily: 'Pacifico, cursive',
              fontSize: "40px",
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
            }}
          > Card4U
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
              <Link to={page.route} key={page.route} style={{ textDecoration: 'none', color: 'initial' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Kanit, sans-serif', fontWeight: 500, fontSize: '16px', ml: 1.5, variant: page.route === path ? 'contained' : "", backgroundColor: page.route === path ? (darkMode ? '#404040' : '#1f4063') : "" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          {['/', '/cards/favorite', '/business/cards'].includes(currentPage) && <Searchbar />}
          <CustomizedSwitch />
          { user &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.imgAlt} src={user.imgUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!user.admin &&
                settings.map((setting) => (
                  <Link to={setting.route} key={setting.route} style={{ textDecoration: 'none', color: darkMode ? 'white' : 'black' }} >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <Link to='/' style={{ textDecoration: 'none', color: darkMode ? 'white' : 'black' }} onClick={logout} >
                  <MenuItem>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}