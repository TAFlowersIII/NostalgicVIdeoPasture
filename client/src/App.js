import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts.js'
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import useStyles from './styles.js'

import NostalgicVideoPasture from './images/nostalgicvideopasture.jpg'

const App = () => {
     const [currentId, setCurrentId] = useState(null);
     const classes = useStyles();
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(getPosts());
     }, [currentId, dispatch]);

     return(
          <Container maxWidth='lg'>
               <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className ={classes.heading} variant="h2" align="center">Title</Typography>
                    <img className = {classes.image} src={NostalgicVideoPasture} alt="Nostalgic Video Pasture" height="60" />
               </AppBar>
               <Grow in>
                         <Container>
                              <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                                   <Grid item xs={12} sm={7}>
                                        <Posts setCurrentId={setCurrentId}/>
                                   </Grid>
                                   <Grid item xs={12} sm={7}>
                                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                                   </Grid>
                              </Grid>
                         </Container>
               </Grow>               
          </Container>
     );
}

export default App;