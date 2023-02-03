import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';

import { GoogleOAuthProvider } from '@react-oauth/google';
import dotenv from 'dotenv';
dotenv.config();

const App = () => {
     const user = JSON.parse(localStorage.getItem('profile'));

     return (
     <GoogleOAuthProvider clientId='118715344793-lnu3ejuokk1cuclmmckacifng783c2q6.apps.googleusercontent.com'>
     <BrowserRouter>
          <Container maxWidth='xl'>
               <Navbar />
               <Switch>
                    <Route  path="/" exact component={() => <Redirect to='/posts' /> } />
                    <Route path='/posts' exact component={Home} />
                    <Route path='/posts/search' exact component={Home} />
                    <Route path='/posts/:id' component={PostDetails} />
                    <Route  path="/auth" exact component={() => (!user ? <Auth /> : <Redirect  to="/posts"/>)} />
               </Switch>
          </Container>
     </BrowserRouter>
     </GoogleOAuthProvider>
     )};

export default App;