import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';

function Settings() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Settings
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body1">
              Application settings coming soon...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings; 