const express = require('express');
const router = express.Router();
const { Vaccination, Student, VaccinationDrive } = require('../models');

// Get all vaccinations
router.get('/', async (req, res) => {
  try {
    const vaccinations = await Vaccination.findAll({
      include: [
        { model: Student, attributes: ['firstName', 'lastName', 'studentId'] },
        { model: VaccinationDrive, attributes: ['name', 'vaccineName'] }
      ]
    });
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single vaccination
router.get('/:id', async (req, res) => {
  try {
    const vaccination = await Vaccination.findByPk(req.params.id, {
      include: [
        { model: Student, attributes: ['firstName', 'lastName', 'studentId'] },
        { model: VaccinationDrive, attributes: ['name', 'vaccineName'] }
      ]
    });
    if (!vaccination) {
      return res.status(404).json({ message: 'Vaccination record not found' });
    }
    res.json(vaccination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new vaccination record
router.post('/', async (req, res) => {
  try {
    const vaccination = await Vaccination.create(req.body);
    res.status(201).json(vaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a vaccination record
router.put('/:id', async (req, res) => {
  try {
    const vaccination = await Vaccination.findByPk(req.params.id);
    if (!vaccination) {
      return res.status(404).json({ message: 'Vaccination record not found' });
    }
    await vaccination.update(req.body);
    res.json(vaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a vaccination record
router.delete('/:id', async (req, res) => {
  try {
    const vaccination = await Vaccination.findByPk(req.params.id);
    if (!vaccination) {
      return res.status(404).json({ message: 'Vaccination record not found' });
    }
    await vaccination.destroy();
    res.json({ message: 'Vaccination record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 