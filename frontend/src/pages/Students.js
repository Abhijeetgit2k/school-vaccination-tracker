import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import Student from './Student';

function Students() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Student Vaccination Management
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Manage student vaccination records, track immunization status, and schedule upcoming vaccinations.
            </Typography>
          </Box>
          <Student />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Students; 