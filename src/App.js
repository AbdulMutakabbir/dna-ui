import './App.css';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Page404 from './pages/Page404';
import PageHome from './pages/PageHome';
import PageLanding from './pages/PageLanding';

const App = () => {

  return (

    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
        >
            <MenuIcon />
        </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carleton ITS
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route exact path="/" element={<PageLanding/>} />
        <Route exact path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/home" element={<PageHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
