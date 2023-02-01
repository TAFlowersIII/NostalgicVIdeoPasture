import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import Icon from './icon.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles.js';
import Input from './Input.js';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actiontypes.js';

const initialState = { name: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {

     const classes = useStyles();
     const [showPassword, setShowPassword] = useState(false);
     const [isSignUp, setIsSignUp] = useState(false);
     const [formData, setFormData] = useState(initialState);
     const dispatch = useDispatch();
     const history = useHistory();

     const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

     const handleSubmit = (e) => {
          e.preventDefault();
          if(isSignUp) {
               dispatch(signup(formData, history));
          } else {
               dispatch(signin(formData, history));
          }
     };

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const switchMode = () => {
          setIsSignUp((prevIsSignUp) => !prevIsSignUp);
          setShowPassword(false);
     };

     const googleSuccess = async (res) => {
          const token = res?.credential;
          const result = jwt_decode(token);
      
          try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');

          } catch (error) {
            console.log(error);
          }
        }

     const googleFailure = (error) => {
          console.log('Google Sign In request returned an error. Try again');
          console.log(error);
     }

     return (
          <Container component="main" maxWidth="xs">
               <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                         <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                         <Grid container spacing={2}>
                              { isSignUp && (
                                         <Input name="name" label="Username" handleChange={handleChange} type="name"/>
                                   )}
                                   <Input name='email' label='Email Address' handleChange={handleChange}  type="email"/>
                                   <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} /> 
                                   { isSignUp &&  (
                                        <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                                   )}
                         </Grid>
                         <Button type='submit' fullWidth variant='contained' color='primary' className={ classes.submit }>
                              { isSignUp ? 'Sign Up' : 'Sign In' }
                         </Button>
                         <GoogleLogin 
                              render={(renderProps) => (
                                   <Button 
                                        className={classes.googleButton}   
                                        color='primary' 
                                        fullWidth 
                                        onClick={renderProps.onClick} 
                                        disabled={renderProps.disabled} 
                                        startIcon={ <Icon /> } 
                                        variant='contained'
                                        >
                                             Sign In With Google
                                        </Button>
                              )}
                              onSuccess={googleSuccess}
                              onFailure={googleFailure}
                              cookiePolicy='single_host_origin'
                         />
                         <Grid container justifyContent='flex-end'>
                              <Grid item>
                                   <Button onClick={switchMode}>
                                        { isSignUp ? 'Already have account? Sign in' : "Dont' have an account?" }
                                   </Button>
                              </Grid>
                         </Grid>
                    </form>
               </Paper>
          </Container>
          );

}

export default Auth;
