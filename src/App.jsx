import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// Material helpers
import { MuiThemeProvider } from '@material-ui/core/styles';

// Theme
import theme from './theme';
import './assets/scss/index.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Routes
import Routes from './Routes';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Routes />
    </Router>
  </MuiThemeProvider>
);

export default App;
