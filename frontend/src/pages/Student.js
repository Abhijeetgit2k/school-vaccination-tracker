import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Sample data
const studentData = {
  vaccinations: [
    {
      id: 1,
      student: 'Arjun Sharma',
      class: 'Class 10-A',
      vaccine: 'COVID-19 Booster',
      date: '2024-03-01',
      batch: 'COV-2024-001',
      status: 'Completed',
      nextDue: '2025-03-01',
    },
    {
      id: 2,
      student: 'Priya Patel',
      class: 'Class 9-B',
      vaccine: 'BCG',
      date: '2024-03-02',
      batch: 'BCG-2024-001',
      status: 'Completed',
      nextDue: 'N/A',
    },
    {
      id: 3,
      student: 'Rahul Gupta',
      class: 'Class 11-C',
      vaccine: 'DPT',
      date: '2024-03-03',
      batch: 'DPT-2024-001',
      status: 'Completed',
      nextDue: '2025-03-03',
    },
    {
      id: 4,
      student: 'Ananya Singh',
      class: 'Class 12-A',
      vaccine: 'MMR',
      date: '2024-03-04',
      batch: 'MMR-2024-001',
      status: 'Completed',
      nextDue: '2025-03-04',
    },
    {
      id: 5,
      student: 'Vikram Mehta',
      class: 'Class 10-B',
      vaccine: 'Hepatitis B',
      date: '2024-03-05',
      batch: 'HEP-2024-001',
      status: 'Completed',
      nextDue: '2025-03-05',
    },
    {
      id: 6,
      student: 'Neha Reddy',
      class: 'Class 9-A',
      vaccine: 'Typhoid',
      date: '2024-03-06',
      batch: 'TYP-2024-001',
      status: 'Completed',
      nextDue: '2025-03-06',
    },
  ],
};

function Student() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [vaccinations, setVaccinations] = useState(studentData.vaccinations);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [formData, setFormData] = useState({
    studentName: '',
    className: '',
    vaccineName: '',
    date: '',
    batch: '',
    nextDue: '',
  });

  const handleOpenDialog = (vaccination = null) => {
    if (vaccination) {
      setSelectedVaccination(vaccination);
      setFormData({
        studentName: vaccination.student,
        className: vaccination.class,
        vaccineName: vaccination.vaccine,
        date: vaccination.date,
        batch: vaccination.batch,
        nextDue: vaccination.nextDue,
      });
    } else {
      setSelectedVaccination(null);
      setFormData({
        studentName: '',
        className: '',
        vaccineName: '',
        date: '',
        batch: '',
        nextDue: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVaccination(null);
    setFormData({
      studentName: '',
      className: '',
      vaccineName: '',
      date: '',
      batch: '',
      nextDue: '',
    });
  };

  const handleSubmit = () => {
    if (selectedVaccination) {
      // Update existing vaccination
      const updatedVaccinations = vaccinations.map(v => 
        v.id === selectedVaccination.id 
          ? { 
              ...v, 
              student: formData.studentName,
              class: formData.className,
              vaccine: formData.vaccineName,
              date: formData.date,
              batch: formData.batch,
              nextDue: formData.nextDue,
            }
          : v
      );
      setVaccinations(updatedVaccinations);
      setSnackbar({
        open: true,
        message: 'Vaccination record updated successfully',
        severity: 'success',
      });
    } else {
      // Add new vaccination
      const newVaccination = {
        id: Date.now(),
        student: formData.studentName,
        class: formData.className,
        vaccine: formData.vaccineName,
        date: formData.date,
        batch: formData.batch,
        status: 'Completed',
        nextDue: formData.nextDue,
      };
      setVaccinations([...vaccinations, newVaccination]);
      setSnackbar({
        open: true,
        message: 'New vaccination record added successfully',
        severity: 'success',
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    const updatedVaccinations = vaccinations.filter(v => v.id !== id);
    setVaccinations(updatedVaccinations);
    setSnackbar({
      open: true,
      message: 'Vaccination record deleted successfully',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Student Vaccinations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          Add Student Vaccination
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Vaccine</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Next Due</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccinations.map((vaccination) => (
              <TableRow key={vaccination.id}>
                <TableCell>{vaccination.student}</TableCell>
                <TableCell>{vaccination.class}</TableCell>
                <TableCell>{vaccination.vaccine}</TableCell>
                <TableCell>{new Date(vaccination.date).toLocaleDateString()}</TableCell>
                <TableCell>{vaccination.batch}</TableCell>
                <TableCell>
                  <Chip
                    label={vaccination.status}
                    color="success"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {vaccination.nextDue === 'N/A' ? 'N/A' : new Date(vaccination.nextDue).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(vaccination)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(vaccination.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Vaccination Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedVaccination ? 'Edit Student Vaccination' : 'Add Student Vaccination'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Class"
              name="className"
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Vaccine Name"
              name="vaccineName"
              value={formData.vaccineName}
              onChange={(e) => setFormData({ ...formData, vaccineName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Vaccination Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Batch Number"
              name="batch"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Next Due Date"
              name="nextDue"
              type="date"
              value={formData.nextDue}
              onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {selectedVaccination ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default Student; 