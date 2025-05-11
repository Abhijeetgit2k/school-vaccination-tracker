import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as VaccinationIcon,
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

// Sample data
const dashboardData = {
  totalStudents: 1250,
  vaccinatedStudents: 980,
  upcomingDrives: [
    { id: 1, name: 'COVID-19 Booster', date: '2024-03-15', location: 'Main Auditorium' },
    { id: 2, name: 'BCG Vaccine', date: '2024-03-20', location: 'School Health Center' },
    { id: 3, name: 'DPT Booster', date: '2024-03-25', location: 'Main Auditorium' },
  ],
  recentVaccinations: [
    { 
      id: 1, 
      student: 'Arjun Sharma',
      class: 'Class 10-A',
      age: 15,
      rollNumber: '2024A001',
      vaccine: 'COVID-19 Booster',
      date: '2024-03-01',
      status: 'Completed',
      nextDue: '2025-03-01'
    },
    { 
      id: 2, 
      student: 'Priya Patel',
      class: 'Class 9-B',
      age: 14,
      rollNumber: '2024B002',
      vaccine: 'BCG',
      date: '2024-03-02',
      status: 'Completed',
      nextDue: 'N/A'
    },
    { 
      id: 3, 
      student: 'Rahul Gupta',
      class: 'Class 11-C',
      age: 16,
      rollNumber: '2024C003',
      vaccine: 'DPT',
      date: '2024-03-03',
      status: 'Completed',
      nextDue: '2025-03-03'
    },
    { 
      id: 4, 
      student: 'Ananya Singh',
      class: 'Class 8-A',
      age: 13,
      rollNumber: '2024A004',
      vaccine: 'MMR',
      date: '2024-03-04',
      status: 'Completed',
      nextDue: 'N/A'
    },
    { 
      id: 5, 
      student: 'Vikram Mehta',
      class: 'Class 12-B',
      age: 17,
      rollNumber: '2024B005',
      vaccine: 'COVID-19 Booster',
      date: '2024-03-05',
      status: 'Completed',
      nextDue: '2025-03-05'
    },
  ],
  statistics: {
    vaccinationRate: 78.4,
    pendingVaccinations: 270,
    upcomingAppointments: 45,
    classDistribution: {
      'Class 8': 180,
      'Class 9': 220,
      'Class 10': 250,
      'Class 11': 200,
      'Class 12': 200,
    }
  }
};

// Student data
const studentData = {
  students: [
    {
      id: 1,
      name: 'Arjun Sharma',
      class: 'Class 10-A',
      age: 15,
      rollNumber: '2024A001',
      gender: 'Male',
      bloodGroup: 'O+',
      contact: {
        phone: '+91 98765 43210',
        email: 'arjun.sharma@school.com',
        address: '123, Green Park, New Delhi'
      },
      vaccinations: [
        {
          name: 'COVID-19 Booster',
          date: '2024-03-01',
          status: 'Completed',
          nextDue: '2025-03-01',
          batch: 'COV-2024-001'
        },
        {
          name: 'BCG',
          date: '2010-01-15',
          status: 'Completed',
          nextDue: 'N/A',
          batch: 'BCG-2010-001'
        },
        {
          name: 'DPT',
          date: '2023-06-15',
          status: 'Completed',
          nextDue: '2024-06-15',
          batch: 'DPT-2023-001'
        }
      ],
      medicalHistory: [
        {
          condition: 'Asthma',
          diagnosed: '2018',
          status: 'Under Control',
          notes: 'Regular check-ups required'
        }
      ]
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: 'Class 9-B',
      age: 14,
      rollNumber: '2024B002',
      gender: 'Female',
      bloodGroup: 'B+',
      contact: {
        phone: '+91 98765 43211',
        email: 'priya.patel@school.com',
        address: '456, Sector 15, Gurgaon'
      },
      vaccinations: [
        {
          name: 'BCG',
          date: '2024-03-02',
          status: 'Completed',
          nextDue: 'N/A',
          batch: 'BCG-2024-001'
        },
        {
          name: 'MMR',
          date: '2023-08-20',
          status: 'Completed',
          nextDue: 'N/A',
          batch: 'MMR-2023-001'
        }
      ],
      medicalHistory: []
    },
    {
      id: 3,
      name: 'Rahul Gupta',
      class: 'Class 11-C',
      age: 16,
      rollNumber: '2024C003',
      gender: 'Male',
      bloodGroup: 'A+',
      contact: {
        phone: '+91 98765 43212',
        email: 'rahul.gupta@school.com',
        address: '789, Model Town, Delhi'
      },
      vaccinations: [
        {
          name: 'DPT',
          date: '2024-03-03',
          status: 'Completed',
          nextDue: '2025-03-03',
          batch: 'DPT-2024-001'
        },
        {
          name: 'COVID-19 Booster',
          date: '2023-12-15',
          status: 'Completed',
          nextDue: '2024-12-15',
          batch: 'COV-2023-001'
        }
      ],
      medicalHistory: []
    }
  ]
};

// Student Management Data
const studentManagementData = {
  classes: [
    { id: 1, name: 'Class 8', sections: ['A', 'B', 'C'] },
    { id: 2, name: 'Class 9', sections: ['A', 'B', 'C'] },
    { id: 3, name: 'Class 10', sections: ['A', 'B', 'C'] },
    { id: 4, name: 'Class 11', sections: ['A', 'B', 'C'] },
    { id: 5, name: 'Class 12', sections: ['A', 'B', 'C'] },
  ],
  vaccinationStatus: {
    pending: 270,
    completed: 980,
    upcoming: 45,
    overdue: 12,
  },
  classDistribution: {
    'Class 8': { total: 180, vaccinated: 150, pending: 30 },
    'Class 9': { total: 220, vaccinated: 180, pending: 40 },
    'Class 10': { total: 250, vaccinated: 200, pending: 50 },
    'Class 11': { total: 200, vaccinated: 150, pending: 50 },
    'Class 12': { total: 200, vaccinated: 150, pending: 50 },
  },
  recentRegistrations: [
    {
      id: 1,
      name: 'Neha Verma',
      class: 'Class 8-A',
      date: '2024-03-10',
      status: 'Pending Vaccination',
    },
    {
      id: 2,
      name: 'Rohan Kapoor',
      class: 'Class 9-B',
      date: '2024-03-09',
      status: 'Vaccination Complete',
    },
    {
      id: 3,
      name: 'Sanya Malhotra',
      class: 'Class 10-C',
      date: '2024-03-08',
      status: 'Pending Documentation',
    },
  ],
};

function StatCard({ title, value, icon, color }) {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: alpha(color, 0.1),
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { sx: { color, fontSize: 28 } })}
          </Box>
          <Typography variant="h6" component="div" sx={{ color: theme.palette.text.secondary }}>
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            color,
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 1,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function StudentDetails({ student }) {
  const theme = useTheme();
  
  return (
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: theme.palette.primary.main,
                fontSize: '2.5rem',
                mb: 2
              }}
            >
              {student.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {student.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {student.class} • Roll No: {student.rollNumber}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon color="primary" />
              <Typography variant="body2">
                Class: {student.class}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon color="primary" />
              <Typography variant="body2">
                Age: {student.age} years
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VaccinationIcon color="primary" />
              <Typography variant="body2">
                Blood Group: {student.bloodGroup}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Contact Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" color="primary" />
              <Typography variant="body2">{student.contact.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="primary" />
              <Typography variant="body2">{student.contact.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationIcon fontSize="small" color="primary" />
              <Typography variant="body2">{student.contact.address}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Vaccination History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vaccine</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Next Due</TableCell>
                  <TableCell>Batch No.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.vaccinations.map((vaccination, index) => (
                  <TableRow key={index}>
                    <TableCell>{vaccination.name}</TableCell>
                    <TableCell>{new Date(vaccination.date).toLocaleDateString()}</TableCell>
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
                    <TableCell>{vaccination.batch}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {student.medicalHistory.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}>
                Medical History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Condition</TableCell>
                      <TableCell>Diagnosed</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {student.medicalHistory.map((condition, index) => (
                      <TableRow key={index}>
                        <TableCell>{condition.condition}</TableCell>
                        <TableCell>{condition.diagnosed}</TableCell>
                        <TableCell>
                          <Chip 
                            label={condition.status}
                            color="warning"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{condition.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

function StudentManagement() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    dateOfBirth: '',
    bloodGroup: '',
    contactNumber: '',
    email: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenDialog = () => {
    setOpenDialog(true);
    // Reset form data when opening dialog
    setFormData({
      fullName: '',
      rollNumber: '',
      dateOfBirth: '',
      bloodGroup: '',
      contactNumber: '',
      email: '',
      address: '',
    });
    setFormErrors({});
    setSelectedClass('');
    setSelectedSection('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Name is required';
    if (!formData.rollNumber.trim()) errors.rollNumber = 'Roll number is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.bloodGroup.trim()) errors.bloodGroup = 'Blood group is required';
    if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!selectedClass) errors.class = 'Class is required';
    if (!selectedSection) errors.section = 'Section is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Create new student object
      const newStudent = {
        id: Date.now(), // Temporary ID generation
        name: formData.fullName,
        class: `${selectedClass}-${selectedSection}`,
        rollNumber: formData.rollNumber,
        dateOfBirth: formData.dateOfBirth,
        bloodGroup: formData.bloodGroup,
        contact: {
          phone: formData.contactNumber,
          email: formData.email,
          address: formData.address
        },
        vaccinations: [],
        medicalHistory: []
      };

      // Here you would typically make an API call to save the student
      console.log('New Student:', newStudent);

      // Add to recent registrations
      studentManagementData.recentRegistrations.unshift({
        id: newStudent.id,
        name: newStudent.name,
        class: newStudent.class,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending Vaccination'
      });

      // Update class distribution
      const classKey = selectedClass;
      if (studentManagementData.classDistribution[classKey]) {
        studentManagementData.classDistribution[classKey].total += 1;
        studentManagementData.classDistribution[classKey].pending += 1;
      }

      // Close dialog and show success message
      handleCloseDialog();
      // You might want to add a snackbar or toast notification here
    }
  };

  return (
    <Box>
      {/* Management Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Student Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage student records and vaccination status
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          Add New Student
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <GroupIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{studentManagementData.vaccinationStatus.completed}</Typography>
                <Typography variant="body2" color="text.secondary">Vaccinated Students</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                <WarningIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{studentManagementData.vaccinationStatus.pending}</Typography>
                <Typography variant="body2" color="text.secondary">Pending Vaccinations</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                <CalendarIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{studentManagementData.vaccinationStatus.upcoming}</Typography>
                <Typography variant="body2" color="text.secondary">Upcoming Appointments</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                <WarningIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{studentManagementData.vaccinationStatus.overdue}</Typography>
                <Typography variant="body2" color="text.secondary">Overdue Vaccinations</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Class Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Class-wise Vaccination Status
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell align="right">Total Students</TableCell>
                    <TableCell align="right">Vaccinated</TableCell>
                    <TableCell align="right">Pending</TableCell>
                    <TableCell align="right">Completion Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(studentManagementData.classDistribution).map(([className, data]) => (
                    <TableRow key={className}>
                      <TableCell>{className}</TableCell>
                      <TableCell align="right">{data.total}</TableCell>
                      <TableCell align="right">{data.vaccinated}</TableCell>
                      <TableCell align="right">{data.pending}</TableCell>
                      <TableCell align="right">
                        {((data.vaccinated / data.total) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Recent Registrations
            </Typography>
            <List>
              {studentManagementData.recentRegistrations.map((registration) => (
                <React.Fragment key={registration.id}>
                  <ListItem>
                    <ListItemText
                      primary={registration.name}
                      secondary={
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {registration.class}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Registered: {new Date(registration.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={registration.status}
                      color={
                        registration.status === 'Vaccination Complete'
                          ? 'success'
                          : registration.status === 'Pending Vaccination'
                          ? 'warning'
                          : 'info'
                      }
                      size="small"
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Add New Student Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!formErrors.class}>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={selectedClass}
                    label="Class"
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      setSelectedSection('');
                      if (formErrors.class) {
                        setFormErrors(prev => ({ ...prev, class: '' }));
                      }
                    }}
                  >
                    {studentManagementData.classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.name}>
                        {cls.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.class && (
                    <Typography color="error" variant="caption">
                      {formErrors.class}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!formErrors.section}>
                  <InputLabel>Section</InputLabel>
                  <Select
                    value={selectedSection}
                    label="Section"
                    onChange={(e) => {
                      setSelectedSection(e.target.value);
                      if (formErrors.section) {
                        setFormErrors(prev => ({ ...prev, section: '' }));
                      }
                    }}
                  >
                    {selectedClass &&
                      studentManagementData.classes
                        .find((cls) => cls.name === selectedClass)
                        ?.sections.map((section) => (
                          <MenuItem key={section} value={section}>
                            {section}
                          </MenuItem>
                        ))}
                  </Select>
                  {formErrors.section && (
                    <Typography color="error" variant="caption">
                      {formErrors.section}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.rollNumber}
              helperText={formErrors.rollNumber}
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.dateOfBirth}
              helperText={formErrors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.bloodGroup}
              helperText={formErrors.bloodGroup}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
              error={!!formErrors.address}
              helperText={formErrors.address}
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
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Dashboard() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome to your vaccination management dashboard
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Students" />
          <Tab label="Management" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {/* Existing dashboard content */}
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Students"
              value={dashboardData.totalStudents}
              icon={<PeopleIcon />}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Vaccination Rate"
              value={`${dashboardData.statistics.vaccinationRate}%`}
              icon={<AssessmentIcon />}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Vaccinations"
              value={dashboardData.statistics.pendingVaccinations}
              icon={<VaccinationIcon />}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Upcoming Appointments"
              value={dashboardData.statistics.upcomingAppointments}
              icon={<WarningIcon />}
              color="#9c27b0"
            />
          </Grid>
        </Grid>

        {/* Upcoming Drives and Recent Vaccinations */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                }}
              >
                Upcoming Vaccination Drives
              </Typography>
              <List>
                {dashboardData.upcomingDrives.map((drive, index) => (
                  <React.Fragment key={drive.id}>
                    <ListItem 
                      sx={{ 
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          borderRadius: 1,
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {drive.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(drive.date).toLocaleDateString()} - {drive.location}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < dashboardData.upcomingDrives.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 'bold',
                  color: theme.palette.secondary.main,
                }}
              >
                Recent Vaccinations
              </Typography>
              <List>
                {dashboardData.recentVaccinations.map((vaccination, index) => (
                  <React.Fragment key={vaccination.id}>
                    <ListItem 
                      sx={{ 
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                          borderRadius: 1,
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                              {vaccination.student.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {vaccination.student}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SchoolIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {vaccination.class} • Roll No: {vaccination.rollNumber}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <VaccinationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {vaccination.vaccine}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {new Date(vaccination.date).toLocaleDateString()}
                                {vaccination.nextDue !== 'N/A' && ` • Next due: ${new Date(vaccination.nextDue).toLocaleDateString()}`}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Chip 
                        label={vaccination.status}
                        color="success"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                    {index < dashboardData.recentVaccinations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {studentData.students.map((student) => (
            <Grid item xs={12} key={student.id}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {student.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {student.class} • Roll No: {student.rollNumber}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Tooltip title="View Details">
                      <IconButton color="primary">
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <StudentDetails student={student} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <StudentManagement />
      </TabPanel>
    </Container>
  );
}

export default Dashboard;