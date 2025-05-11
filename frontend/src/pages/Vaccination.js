import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
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
  alpha,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as VaccinationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import Student from './Student';
import VaccinationDrives from './VaccinationDrives';
import Reports from './Reports';

// Sample data
const vaccinationData = {
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
  recentVaccinations: [
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
  ],
  statistics: {
    totalDrives: 15,
    completedDrives: 12,
    upcomingDrives: 3,
    totalVaccinations: 1250,
    pendingVaccinations: 270,
  },
};

// Add sample data for reports
const reportData = {
  classWiseStats: [
    { class: 'Class 8', total: 180, vaccinated: 150, pending: 30, rate: '83.3%' },
    { class: 'Class 9', total: 220, vaccinated: 180, pending: 40, rate: '81.8%' },
    { class: 'Class 10', total: 250, vaccinated: 200, pending: 50, rate: '80.0%' },
    { class: 'Class 11', total: 200, vaccinated: 150, pending: 50, rate: '75.0%' },
    { class: 'Class 12', total: 200, vaccinated: 150, pending: 50, rate: '75.0%' },
  ],
  vaccineWiseStats: [
    { vaccine: 'COVID-19', total: 500, completed: 450, pending: 50, rate: '90.0%' },
    { vaccine: 'BCG', total: 300, completed: 280, pending: 20, rate: '93.3%' },
    { vaccine: 'DPT', total: 250, completed: 200, pending: 50, rate: '80.0%' },
    { vaccine: 'MMR', total: 200, completed: 150, pending: 50, rate: '75.0%' },
  ],
};

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vaccination-tabpanel-${index}`}
      aria-labelledby={`vaccination-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Vaccination() {
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
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentFormData, setStudentFormData] = useState({
    studentId: '',
    studentName: '',
    className: '',
    vaccineName: '',
    date: '',
    batch: '',
    nextDue: '',
  });
  const [tabValue, setTabValue] = useState(0);

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

  const handleOpenStudentDialog = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      setStudentFormData({
        studentId: student.id,
        studentName: student.student,
        className: student.class,
        vaccineName: student.vaccine,
        date: student.date,
        batch: student.batch,
        nextDue: student.nextDue,
      });
    } else {
      setSelectedStudent(null);
      setStudentFormData({
        studentId: '',
        studentName: '',
        className: '',
        vaccineName: '',
        date: '',
        batch: '',
        nextDue: '',
      });
    }
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
    setSelectedStudent(null);
    setStudentFormData({
      studentId: '',
      studentName: '',
      className: '',
      vaccineName: '',
      date: '',
      batch: '',
      nextDue: '',
    });
  };

  const handleStudentSubmit = () => {
    // Here you would typically make an API call to save the student vaccination
    console.log('Student Vaccination:', studentFormData);
    
    // Add to recent vaccinations
    const newVaccination = {
      id: Date.now(),
      student: studentFormData.studentName,
      class: studentFormData.className,
      vaccine: studentFormData.vaccineName,
      date: studentFormData.date,
      batch: studentFormData.batch,
      status: 'Completed',
      nextDue: studentFormData.nextDue,
    };
    
    vaccinationData.recentVaccinations.unshift(newVaccination);
    handleCloseStudentDialog();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
          Vaccination Management
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="vaccination tabs"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                minWidth: 120,
              },
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Student Vaccinations" />
            <Tab label="Vaccination Drives" />
            <Tab label="Reports" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Student />
            <VaccinationDrives />
            <Reports />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Student />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <VaccinationDrives />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Reports />
        </TabPanel>
      </Paper>

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

      {/* Add/Edit Student Vaccination Dialog */}
      <Dialog open={openStudentDialog} onClose={handleCloseStudentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedStudent ? 'Edit Student Vaccination' : 'Add Student Vaccination'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Student Name"
              name="studentName"
              value={studentFormData.studentName}
              onChange={(e) => setStudentFormData({ ...studentFormData, studentName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Class"
              name="className"
              value={studentFormData.className}
              onChange={(e) => setStudentFormData({ ...studentFormData, className: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Vaccine Name"
              name="vaccineName"
              value={studentFormData.vaccineName}
              onChange={(e) => setStudentFormData({ ...studentFormData, vaccineName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Vaccination Date"
              name="date"
              type="date"
              value={studentFormData.date}
              onChange={(e) => setStudentFormData({ ...studentFormData, date: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Batch Number"
              name="batch"
              value={studentFormData.batch}
              onChange={(e) => setStudentFormData({ ...studentFormData, batch: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Next Due Date"
              name="nextDue"
              type="date"
              value={studentFormData.nextDue}
              onChange={(e) => setStudentFormData({ ...studentFormData, nextDue: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleStudentSubmit}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Vaccination; 