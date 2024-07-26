import React from 'react';
import { Grid } from '@mui/material';

const FrameLayout = ({ leftContent, rightContent }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={9}>
        {leftContent}
      </Grid>
      <Grid item xs={12} md={3}>
        {rightContent}
      </Grid>
    </Grid>
  );
};

export default FrameLayout;