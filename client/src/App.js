import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

import dotenv from 'dotenv';
dotenv.config();

const App = () => (
     <GoogleOAuthProvider clientId='118715344793-lnu3ejuokk1cuclmmckacifng783c2q6.apps.googleusercontent.com'>
     <BrowserRouter>
          <Container maxWidth='lg'>
               <Navbar />
               <Switch>
                    <Route  path="/" exact component={Home} />
                    <Route  path="/auth" exact component={Auth} />
               </Switch>
          </Container>
     </BrowserRouter>
     </GoogleOAuthProvider>
     );

export default App;