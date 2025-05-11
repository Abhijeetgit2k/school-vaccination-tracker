import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  Link,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { login } from '../store/slices/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = React.useState('');

  // Clear form fields on mount
  React.useEffect(() => {
    setFormData({ email: '', password: '' });
    setEmailError('');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'email') {
      // Only allow .com emails
      const emailRegex = /^[^@\s]+@[^@\s]+\.com$/i;
      if (!emailRegex.test(e.target.value)) {
        setEmailError('Only .com email addresses are allowed');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate .com email before submitting
    const emailRegex = /^[^@\s]+@[^@\s]+\.com$/i;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Only .com email addresses are allowed');
      return;
    }
    setEmailError('');
    try {
      const result = await dispatch(login(formData));
      if (!result.error) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f0ff 0%, #d0e6fa 50%, #f3d1f7 100%)',
      }}
    >
      <Container component="main" maxWidth="xs" disableGutters>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #e3f0ff 0%, #f3d1f7 100%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white', width: 64, height: 64 }}>
            <LockOutlinedIcon sx={{ fontSize: 36, color: '#1976d2' }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              mb: 2,
              color: '#222',
              fontWeight: 'bold',
              textShadow: 'none',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              textAlign: 'center',
            }}
          >
            School Vaccination Tracker
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              mb: 3,
              color: '#333',
              fontWeight: 500,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              textAlign: 'center',
            }}
          >
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                style: {
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 8,
                  fontSize: '1.1rem',
                  color: '#222',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '1.1rem',
                  color: '#222',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                style: {
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 8,
                  fontSize: '1.1rem',
                  color: '#222',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '1.1rem',
                  color: '#222',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.15rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(90deg, #1976d2 0%, #f64f59 100%)',
                color: 'white',
                boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.15)',
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1976d2 0%, #f64f59 100%)',
                  color: 'white',
                },
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="#"
                  variant="body1"
                  sx={{
                    color: '#222',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login; 