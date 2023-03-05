import { Typography } from '@mui/material';
import React from 'react'
import Link from '@mui/material/Link';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }

export default Copyright

