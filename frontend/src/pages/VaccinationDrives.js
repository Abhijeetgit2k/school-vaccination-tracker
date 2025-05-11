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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Sample data
const drivesData = {
  upcomingDrives: [
    {
      id: 1,
      name: 'COVID-19 Booster',
      date: '2024-03-15',
      location: 'Main Auditorium',
      capacity: 100,
      registered: 75,
      status: 'Scheduled',
      type: 'Booster',
      batch: 'COV-2024-001',
    },
    {
      id: 2,
      name: 'BCG Vaccine',
      date: '2024-03-20',
      location: 'School Health Center',
      capacity: 50,
      registered: 30,
      status: 'Scheduled',
      type: 'Primary',
      batch: 'BCG-2024-001',
    },
    {
      id: 3,
      name: 'DPT Booster',
      date: '2024-03-25',
      location: 'Main Auditorium',
      capacity: 80,
      registered: 45,
      status: 'Scheduled',
      type: 'Booster',
      batch: 'DPT-2024-001',
    },
  ],
};

function VaccinationDrives() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    capacity: '',
    type: '',
    batch: '',
  });

  const handleOpenDialog = (drive = null) => {
    if (drive) {
      setSelectedDrive(drive);
      setFormData({
        name: drive.name,
        date: drive.date,
        location: drive.location,
        capacity: drive.capacity,
        type: drive.type,
        batch: drive.batch,
      });
    } else {
      setSelectedDrive(null);
      setFormData({
        name: '',
        date: '',
        location: '',
        capacity: '',
        type: '',
        batch: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDrive(null);
    setFormData({
      name: '',
      date: '',
      location: '',
      capacity: '',
      type: '',
      batch: '',
    });
  };

  const handleSubmit = () => {
    // Here you would typically make an API call to save the vaccination drive
    console.log('Vaccination Drive:', formData);
    handleCloseDialog();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Vaccination Drives
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          Schedule New Drive
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vaccine Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Registered</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivesData.upcomingDrives.map((drive) => (
              <TableRow key={drive.id}>
                <TableCell>{drive.name}</TableCell>
                <TableCell>{new Date(drive.date).toLocaleDateString()}</TableCell>
                <TableCell>{drive.location}</TableCell>
                <TableCell>{drive.capacity}</TableCell>
                <TableCell>{drive.registered}</TableCell>
                <TableCell>{drive.type}</TableCell>
                <TableCell>
                  <Chip
                    label={drive.status}
                    color="success"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(drive)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
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

      {/* Add/Edit Vaccination Drive Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedDrive ? 'Edit Vaccination Drive' : 'Schedule New Vaccination Drive'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Vaccine Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="Primary">Primary</MenuItem>
                <MenuItem value="Booster">Booster</MenuItem>
                <MenuItem value="Annual">Annual</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Batch Number"
              name="batch"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              fullWidth
              required
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
            {selectedDrive ? 'Update' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default VaccinationDrives; 