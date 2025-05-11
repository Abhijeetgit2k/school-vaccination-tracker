import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { studentsAPI, vaccinationDrivesAPI } from '../services/api';

function AddVaccination() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    student: '',
    vaccineName: '',
    doseNumber: '',
    dateAdministered: null,
    administeredBy: '',
    batchNumber: '',
    nextDoseDate: null,
    notes: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await studentsAPI.getAll();
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to load students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      await vaccinationDrivesAPI.create(formData);
      navigate('/vaccinations');
    } catch (error) {
      console.error('Error adding vaccination:', error);
      setError('Failed to add vaccination. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Vaccination Record
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                label="Student"
                name="student"
                value={formData.student}
                onChange={handleChange}
                disabled={submitting}
              >
                {students.map((student) => (
                  <MenuItem key={student._id} value={student._id}>
                    {`${student.firstName} ${student.lastName} (${student.studentId})`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Vaccine Name"
                name="vaccineName"
                value={formData.vaccineName}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Dose Number"
                name="doseNumber"
                value={formData.doseNumber}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date Administered"
                value={formData.dateAdministered}
                onChange={(date) => handleDateChange(date, 'dateAdministered')}
                disabled={submitting}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Administered By"
                name="administeredBy"
                value={formData.administeredBy}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Batch Number"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Next Dose Date"
                value={formData.nextDoseDate}
                onChange={(date) => handleDateChange(date, 'nextDoseDate')}
                disabled={submitting}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
                sx={{ mt: 2 }}
              >
                {submitting ? 'Saving...' : 'Save Vaccination Record'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddVaccination; 