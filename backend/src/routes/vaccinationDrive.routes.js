const express = require('express');
const { body, validationResult } = require('express-validator');
const { VaccinationDrive } = require('../models');
const Student = require('../models/student.model');
const { auth, isCoordinator } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/vaccination-drives:
 *   get:
 *     summary: Get all vaccination drives with optional filters
 *     tags: [Vaccination Drives]
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
 */
router.get('/', auth, isCoordinator, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
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

    const drives = await VaccinationDrive.findAll({
      where: query,
      order: [['startDate', 'ASC']],
      include: [{
        model: Student,
        attributes: ['name', 'email'],
        through: { attributes: [] },
      }],
      attributes: { exclude: ['__v'] },
    });

    res.json({
      success: true,
      data: drives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vaccination drives',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/vaccination-drives/{id}:
 *   get:
 *     summary: Get a specific vaccination drive
 *     tags: [Vaccination Drives]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', auth, isCoordinator, async (req, res) => {
  try {
    const drive = await VaccinationDrive.findByPk(req.params.id, {
      include: [{
        model: Student,
        attributes: ['name', 'email'],
        through: { attributes: [] },
      }],
      attributes: { exclude: ['__v'] },
    });

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: 'Vaccination drive not found',
      });
    }

    res.json({
      success: true,
      data: drive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vaccination drive',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/vaccination-drives:
 *   post:
 *     summary: Create a new vaccination drive
 *     tags: [Vaccination Drives]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  auth,
  isCoordinator,
  [
    body('name').trim().notEmpty(),
    body('vaccineName').trim().notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('targetClasses').isArray().notEmpty(),
    body('totalDoses').isInt({ min: 1 }),
    body('dosesPerStudent').isInt({ min: 1 }),
    body('location').trim().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const {
        name,
        vaccineName,
        startDate,
        endDate,
        targetClasses,
        totalDoses,
        dosesPerStudent,
        location,
        notes,
      } = req.body;

      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      const now = new Date();
      const minStartDate = new Date(now.setDate(now.getDate() + 15)); // 15 days from now

      if (start < minStartDate) {
        return res.status(400).json({
          success: false,
          message: 'Start date must be at least 15 days from now',
        });
      }

      if (end <= start) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date',
        });
      }

      // Check for overlapping drives
      const overlappingDrive = await VaccinationDrive.findOne({
        where: {
          [Op.or]: [
            {
              startDate: { [Op.lte]: end },
              endDate: { [Op.gte]: start },
            },
          ],
          status: { [Op.in]: ['scheduled', 'in-progress'] },
        },
      });

      if (overlappingDrive) {
        return res.status(400).json({
          success: false,
          message: 'Overlapping vaccination drive exists',
        });
      }

      const drive = await VaccinationDrive.create({
        name,
        vaccineName,
        startDate,
        endDate,
        targetClasses,
        totalDoses,
        dosesPerStudent,
        location,
        notes,
        coordinator: req.user._id,
      });

      await drive.updateStatistics();

      res.status(201).json({
        success: true,
        data: drive,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating vaccination drive',
        error: error.message,
      });
    }
  }
);

/**
 * @swagger
 * /api/vaccination-drives/{id}:
 *   put:
 *     summary: Update a vaccination drive
 *     tags: [Vaccination Drives]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  '/:id',
  auth,
  isCoordinator,
  [
    body('name').optional().trim().notEmpty(),
    body('vaccineName').optional().trim().notEmpty(),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601(),
    body('targetClasses').optional().isArray().notEmpty(),
    body('totalDoses').optional().isInt({ min: 1 }),
    body('dosesPerStudent').optional().isInt({ min: 1 }),
    body('location').optional().trim().notEmpty(),
    body('status').optional().isIn(['scheduled', 'in-progress', 'completed', 'cancelled']),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const drive = await VaccinationDrive.findByPk(req.params.id);

      if (!drive) {
        return res.status(404).json({
          success: false,
          message: 'Vaccination drive not found',
        });
      }

      // Prevent editing past drives
      if (drive.endDate < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Cannot edit past vaccination drives',
        });
      }

      // Validate dates if being updated
      if (req.body.startDate || req.body.endDate) {
        const start = new Date(req.body.startDate || drive.startDate);
        const end = new Date(req.body.endDate || drive.endDate);
        const now = new Date();
        const minStartDate = new Date(now.setDate(now.getDate() + 15));

        if (start < minStartDate) {
          return res.status(400).json({
            success: false,
            message: 'Start date must be at least 15 days from now',
          });
        }

        if (end <= start) {
          return res.status(400).json({
            success: false,
            message: 'End date must be after start date',
          });
        }

        // Check for overlapping drives
        const overlappingDrive = await VaccinationDrive.findOne({
          where: {
            id: { [Op.ne]: drive.id },
            [Op.or]: [
              {
                startDate: { [Op.lte]: end },
                endDate: { [Op.gte]: start },
              },
            ],
            status: { [Op.in]: ['scheduled', 'in-progress'] },
          },
        });

        if (overlappingDrive) {
          return res.status(400).json({
            success: false,
            message: 'Overlapping vaccination drive exists',
          });
        }
      }

      await drive.update(req.body);
      await drive.updateStatistics();

      res.json({
        success: true,
        data: drive,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating vaccination drive',
        error: error.message,
      });
    }
  }
);

/**
 * @swagger
 * /api/vaccination-drives/{id}/mark-vaccinated:
 *   post:
 *     summary: Mark students as vaccinated in a drive
 *     tags: [Vaccination Drives]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/:id/mark-vaccinated',
  auth,
  isCoordinator,
  [
    body('studentIds').isArray().notEmpty(),
    body('doseNumber').isInt({ min: 1 }),
    body('administeredBy').trim().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const drive = await VaccinationDrive.findByPk(req.params.id);

      if (!drive) {
        return res.status(404).json({
          success: false,
          message: 'Vaccination drive not found',
        });
      }

      if (drive.status === 'completed' || drive.status === 'cancelled') {
        return res.status(400).json({
          success: false,
          message: 'Cannot mark vaccinations for completed or cancelled drives',
        });
      }

      const { studentIds, doseNumber, administeredBy, notes } = req.body;

      // Validate dose number
      if (doseNumber > drive.dosesPerStudent) {
        return res.status(400).json({
          success: false,
          message: `Maximum ${drive.dosesPerStudent} doses per student allowed`,
        });
      }

      const results = {
        successful: [],
        failed: [],
      };

      for (const studentId of studentIds) {
        try {
          const student = await Student.findOne({
            where: {
              id: studentId,
              isActive: true,
              class: { [Op.in]: drive.targetClasses },
            },
          });

          if (!student) {
            results.failed.push({
              studentId,
              error: 'Student not found or not in target classes',
            });
            continue;
          }

          // Check if student already received this dose
          const existingDose = student.vaccinations.find(
            (v) =>
              v.driveId.toString() === drive.id.toString() &&
              v.doseNumber === doseNumber
          );

          if (existingDose) {
            results.failed.push({
              studentId,
              error: `Student already received dose ${doseNumber}`,
            });
            continue;
          }

          // Add vaccination record
          student.vaccinations.push({
            vaccineName: drive.vaccineName,
            date: new Date(),
            doseNumber,
            driveId: drive.id,
            administeredBy,
            notes,
          });

          await student.save();
          results.successful.push(studentId);
        } catch (error) {
          results.failed.push({
            studentId,
            error: error.message,
          });
        }
      }

      // Update drive statistics
      await drive.updateStatistics();

      res.json({
        success: true,
        data: {
          totalProcessed: studentIds.length,
          successful: results.successful.length,
          failed: results.failed.length,
          results,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error marking students as vaccinated',
        error: error.message,
      });
    }
  }
);

// Delete a vaccination drive
router.delete('/:id', auth, isCoordinator, async (req, res) => {
  try {
    const drive = await VaccinationDrive.findByPk(req.params.id);
    if (!drive) {
      return res.status(404).json({ message: 'Vaccination drive not found' });
    }
    await drive.destroy();
    res.json({ message: 'Vaccination drive deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 