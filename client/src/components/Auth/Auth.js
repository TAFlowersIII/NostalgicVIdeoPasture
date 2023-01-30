import React, {useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';

import Icon from './icon.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles.js';
import Input from './Input.js';

const Auth = () => {
     const classes = useStyles();
     const [showPassword, setShowPassword] = useState(false);
     const [isSignUp, setIsSignUp] = useState(false);
     const dispatch = useDispatch();
     const history = useHistory();
     const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
     const handleSubmit = () => {

     }
     const handleChange = () => {

     }
     const switchMode = () => {
          setIsSignUp((prevIsSignUp) => !prevIsSignUp);
          handleShowPassword(false);
     };

     const googleSuccess = async (res) => {
          console.log(res);
          const result = jwt_decode(res?.credential);
          console.log(result);

          try {
               dispatch({ type: 'AUTH', data: {result}});
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
                              {
                                   isSignUp && (
                                        <>
                                                  <Input name="firstName" label="firstName" handleChange={handleChange} autoFocus half />
                                                  <Input name="firstName" label="firstName" handleChange={handleChange} half />
                                        </>
                                   )}
                                   <Input name="email" label="Email Address" handleChange={handleChange}  type="email"/>
                                   <Input name="password" label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} /> 
                                   { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                         </Grid>
                         <Button type='submit' fullWidth variant='contained' color='primary' className={ classes.submit }>
                              { isSignUp ? 'Sign Up' : 'Sign In' }
                         </Button>
                         <GoogleLogin 
                              // clientId="118715344793-lnu3ejuokk1cuclmmckacifng783c2q6.apps.googleusercontent.com"
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
                                        { isSignUp ? 'Already have account? Sign in' : 'Dont have an account?' }
                                   </Button>
                              </Grid>
                         </Grid>
                    </form>
               </Paper>
          </Container>
          );

}

export default Auth;
