const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/student.model');
const VaccinationDrive = require('../models/vaccinationDrive.model');
const { auth, isCoordinator } = require('../middleware/auth.middleware');
const { Parser } = require('json2csv');

const router = express.Router();

/**
 * @swagger
 * /api/reports/vaccination-status:
 *   get:
 *     summary: Get vaccination status report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: vaccineName
 *         schema:
 *           type: string
 *       - in: query
 *         name: class
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 */
router.get(
  '/vaccination-status',
  auth,
  isCoordinator,
  async (req, res) => {
    try {
      const { vaccineName, class: studentClass, startDate, endDate, format } = req.query;
      const query = { isActive: true };

      if (studentClass) {
        query.class = studentClass;
      }

      const students = await Student.find(query)
        .sort({ firstName: 1, lastName: 1 })
        .select('-__v');

      let reportData = students.map((student) => {
        const vaccinations = student.vaccinations.filter((v) => {
          if (vaccineName && v.vaccineName !== vaccineName) {
            return false;
          }
          if (startDate && new Date(v.date) < new Date(startDate)) {
            return false;
          }
          if (endDate && new Date(v.date) > new Date(endDate)) {
            return false;
          }
          return true;
        });

        return {
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          class: student.class,
          section: student.section,
          vaccinationStatus: vaccinations.length > 0 ? 'Vaccinated' : 'Not Vaccinated',
          vaccinations: vaccinations.map((v) => ({
            vaccineName: v.vaccineName,
            date: v.date,
            doseNumber: v.doseNumber,
            administeredBy: v.administeredBy,
          })),
        };
      });

      // Filter out students with no vaccinations if vaccineName is specified
      if (vaccineName) {
        reportData = reportData.filter(
          (student) => student.vaccinations.length > 0
        );
      }

      if (format === 'csv') {
        const fields = [
          'studentId',
          'firstName',
          'lastName',
          'class',
          'section',
          'vaccinationStatus',
          'vaccineName',
          'date',
          'doseNumber',
          'administeredBy',
        ];

        const csvData = reportData.flatMap((student) =>
          student.vaccinations.map((vaccination) => ({
            studentId: student.studentId,
            firstName: student.firstName,
            lastName: student.lastName,
            class: student.class,
            section: student.section,
            vaccinationStatus: student.vaccinationStatus,
            ...vaccination,
          }))
        );

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(csvData);

        res.header('Content-Type', 'text/csv');
        res.attachment('vaccination-report.csv');
        return res.send(csv);
      }

      res.json({
        success: true,
        data: reportData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error generating vaccination report',
        error: error.message,
      });
    }
  }
);

/**
 * @swagger
 * /api/reports/drive-summary:
 *   get:
 *     summary: Get vaccination drive summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, in-progress, completed, cancelled]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 */
router.get(
  '/drive-summary',
  auth,
  isCoordinator,
  async (req, res) => {
    try {
      const { status, startDate, endDate, format } = req.query;
      const query = {};

      if (status) {
        query.status = status;
      }

      if (startDate || endDate) {
        query.startDate = {};
        if (startDate) {
          query.startDate.$gte = new Date(startDate);
        }
        if (endDate) {
          query.startDate.$lte = new Date(endDate);
        }
      }

      const drives = await VaccinationDrive.find(query)
        .sort({ startDate: 1 })
        .populate('coordinator', 'name email')
        .select('-__v');

      const reportData = drives.map((drive) => ({
        name: drive.name,
        vaccineName: drive.vaccineName,
        startDate: drive.startDate,
        endDate: drive.endDate,
        status: drive.status,
        targetClasses: drive.targetClasses,
        location: drive.location,
        coordinator: drive.coordinator.name,
        statistics: drive.statistics,
      }));

      if (format === 'csv') {
        const fields = [
          'name',
          'vaccineName',
          'startDate',
          'endDate',
          'status',
          'targetClasses',
          'location',
          'coordinator',
          'totalStudents',
          'vaccinatedStudents',
          'dosesAdministered',
        ];

        const csvData = reportData.map((drive) => ({
          ...drive,
          targetClasses: drive.targetClasses.join(', '),
          totalStudents: drive.statistics.totalStudents,
          vaccinatedStudents: drive.statistics.vaccinatedStudents,
          dosesAdministered: drive.statistics.dosesAdministered,
        }));

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(csvData);

        res.header('Content-Type', 'text/csv');
        res.attachment('drive-summary-report.csv');
        return res.send(csv);
      }

      res.json({
        success: true,
        data: reportData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error generating drive summary report',
        error: error.message,
      });
    }
  }
);

module.exports = router; 