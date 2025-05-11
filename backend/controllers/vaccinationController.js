const Vaccination = require('../models/Vaccination');

// Get all vaccinations
exports.getAllVaccinations = async (req, res) => {
    try {
        const vaccinations = await Vaccination.find().populate('student');
        res.json(vaccinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get vaccinations by student
exports.getVaccinationsByStudent = async (req, res) => {
    try {
        const vaccinations = await Vaccination.find({ student: req.params.studentId })
            .populate('student');
        res.json(vaccinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create vaccination record
exports.createVaccination = async (req, res) => {
    const vaccination = new Vaccination(req.body);
    try {
        const newVaccination = await vaccination.save();
        res.status(201).json(newVaccination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update vaccination record
exports.updateVaccination = async (req, res) => {
    try {
        const vaccination = await Vaccination.findById(req.params.id);
        if (!vaccination) {
            return res.status(404).json({ message: 'Vaccination record not found' });
        }
        Object.assign(vaccination, req.body);
        const updatedVaccination = await vaccination.save();
        res.json(updatedVaccination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete vaccination record
exports.deleteVaccination = async (req, res) => {
    try {
        const vaccination = await Vaccination.findById(req.params.id);
        if (!vaccination) {
            return res.status(404).json({ message: 'Vaccination record not found' });
        }
        await vaccination.remove();
        res.json({ message: 'Vaccination record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 