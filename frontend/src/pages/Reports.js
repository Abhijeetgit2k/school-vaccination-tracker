import React from 'react';
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
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  LocalHospital as LocalHospitalIcon,
  EventAvailable as EventAvailableIcon,
} from '@mui/icons-material';

// Sample data
const reportsData = {
  classWiseStats: [
    {
      class: 'Class 10-A',
      total: 40,
      completed: 35,
      pending: 5,
      completionRate: '87.5%',
    },
    {
      class: 'Class 9-B',
      total: 38,
      completed: 32,
      pending: 6,
      completionRate: '84.2%',
    },
    {
      class: 'Class 11-C',
      total: 42,
      completed: 38,
      pending: 4,
      completionRate: '90.5%',
    },
  ],
  vaccineWiseStats: [
    {
      vaccine: 'COVID-19 Booster',
      total: 120,
      completed: 105,
      pending: 15,
      completionRate: '87.5%',
    },
    {
      vaccine: 'BCG',
      total: 45,
      completed: 40,
      pending: 5,
      completionRate: '88.9%',
    },
    {
      vaccine: 'DPT',
      total: 85,
      completed: 75,
      pending: 10,
      completionRate: '88.2%',
    },
  ],
  summary: {
    totalStudents: 120,
    vaccinatedStudents: 105,
    upcomingDrives: 3,
    pendingVaccinations: 15,
  },
};

function StatCard({ title, value, icon, color }) {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(45deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
        color: 'white',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              p: 1,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function Reports() {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Vaccination Reports
      </Typography>

      {/* Summary Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={reportsData.summary.totalStudents}
            icon={<SchoolIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Vaccinated Students"
            value={reportsData.summary.vaccinatedStudents}
            icon={<LocalHospitalIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Drives"
            value={reportsData.summary.upcomingDrives}
            icon={<EventAvailableIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Vaccinations"
            value={reportsData.summary.pendingVaccinations}
            icon={<TrendingUpIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Class-wise Statistics */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Class-wise Vaccination Statistics
      </Typography>
      <TableContainer sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Total Students</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Completion Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportsData.classWiseStats.map((stat) => (
              <TableRow key={stat.class}>
                <TableCell>{stat.class}</TableCell>
                <TableCell>{stat.total}</TableCell>
                <TableCell>{stat.completed}</TableCell>
                <TableCell>{stat.pending}</TableCell>
                <TableCell>{stat.completionRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Vaccine-wise Statistics */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Vaccine-wise Statistics
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vaccine</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Completion Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportsData.vaccineWiseStats.map((stat) => (
              <TableRow key={stat.vaccine}>
                <TableCell>{stat.vaccine}</TableCell>
                <TableCell>{stat.total}</TableCell>
                <TableCell>{stat.completed}</TableCell>
                <TableCell>{stat.pending}</TableCell>
                <TableCell>{stat.completionRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Reports; 