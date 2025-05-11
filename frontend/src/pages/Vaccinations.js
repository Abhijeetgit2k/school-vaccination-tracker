import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  CircularProgress,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  TableSortLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { vaccinationDrivesAPI } from '../services/api';
import { debounce } from 'lodash';

function Vaccinations() {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('dateAdministered');
  const [order, setOrder] = useState('desc');
  const navigate = useNavigate();

  const fetchVaccinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        sortBy: orderBy,
        sortOrder: order,
      };
      const response = await vaccinationDrivesAPI.getAll(params);
      setVaccinations(response.data.vaccinations);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      setError('Failed to load vaccinations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedFetch = debounce(fetchVaccinations, 300);

  useEffect(() => {
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [page, rowsPerPage, searchTerm, orderBy, order]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (loading && !vaccinations.length) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && !vaccinations.length) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, bgcolor: '#fff3f3' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Vaccination Records
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/vaccinations/add')}
        >
          Add Vaccination
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by student name, vaccine name, or administered by..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'student'}
                  direction={orderBy === 'student' ? order : 'asc'}
                  onClick={() => handleSort('student')}
                >
                  Student Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'vaccineName'}
                  direction={orderBy === 'vaccineName' ? order : 'asc'}
                  onClick={() => handleSort('vaccineName')}
                >
                  Vaccine Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Dose Number</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'dateAdministered'}
                  direction={orderBy === 'dateAdministered' ? order : 'asc'}
                  onClick={() => handleSort('dateAdministered')}
                >
                  Date Administered
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'administeredBy'}
                  direction={orderBy === 'administeredBy' ? order : 'asc'}
                  onClick={() => handleSort('administeredBy')}
                >
                  Administered By
                </TableSortLabel>
              </TableCell>
              <TableCell>Next Dose Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : vaccinations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No vaccination records found
                </TableCell>
              </TableRow>
            ) : (
              vaccinations.map((vaccination) => (
                <TableRow key={vaccination._id}>
                  <TableCell>
                    {`${vaccination.student.firstName} ${vaccination.student.lastName}`}
                  </TableCell>
                  <TableCell>{vaccination.vaccineName}</TableCell>
                  <TableCell>{vaccination.doseNumber}</TableCell>
                  <TableCell>
                    {new Date(vaccination.dateAdministered).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{vaccination.administeredBy}</TableCell>
                  <TableCell>
                    {vaccination.nextDoseDate
                      ? new Date(vaccination.nextDoseDate).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}

export default Vaccinations; 