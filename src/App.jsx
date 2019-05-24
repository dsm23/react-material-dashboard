import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Material helpers
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Theme
import theme from './theme';
import './assets/scss/index.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Routes
import Routes from './Routes';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes />
    </Router>
  </MuiThemeProvider>
);

export default App;
