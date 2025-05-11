import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Vaccines as VaccinesIcon,
} from '@mui/icons-material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          School Vaccination Tracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/students"
            startIcon={<PeopleIcon />}
          >
            Students
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/vaccinations"
            startIcon={<VaccinesIcon />}
          >
            Vaccinations
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 