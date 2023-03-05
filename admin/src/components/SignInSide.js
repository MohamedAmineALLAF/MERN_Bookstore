import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import SigninForm from './SigninForm';


export default function SignInSide() {
  
  

  return (
    
      <Grid container component="main"  sx={{ height: '91.7vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg?w=2000)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
       <SigninForm/>
      </Grid>
  );
}