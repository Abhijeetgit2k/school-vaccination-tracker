const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { Student } = require('../models');
const { auth, isCoordinator } = require('../middleware/auth.middleware');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students with optional filters
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: class
 *         schema:
 *           type: string
 *       - in: query
 *         name: vaccinationStatus
 *         schema:
 *           type: string
 *           enum: [vaccinated, not-vaccinated]
 */
router.get('/', auth, isCoordinator, async (req, res) => {
  try {
    const { search, class: studentClass, vaccinationStatus } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
      ];
    }

    if (studentClass) {
      query.class = studentClass;
    }

    if (vaccinationStatus === 'vaccinated') {
      query['vaccinations.0'] = { $exists: true };
    } else if (vaccinationStatus === 'not-vaccinated') {
      query['vaccinations.0'] = { $exists: false };
    }

    const students = await Student.findAll({
      where: query,
      order: [['firstName', 'ASC'], ['lastName', 'ASC']],
    });

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a specific student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', auth, isCoordinator, async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  auth,
  isCoordinator,
  [
    body('studentId').trim().notEmpty(),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('dateOfBirth').isISO8601(),
    body('gender').isIn(['male', 'female', 'other']),
    body('class').trim().notEmpty(),
    body('section').trim().notEmpty(),
    body('parentName').trim().notEmpty(),
    body('parentContact').trim().notEmpty(),
    body('address').trim().notEmpty(),
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

      const existingStudent = await Student.findOne({
        where: { studentId: req.body.studentId },
      });

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists',
        });
      }

      const student = await Student.create(req.body);

      res.status(201).json({
        success: true,
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating student',
        error: error.message,
      });
    }
  }
);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  '/:id',
  auth,
  isCoordinator,
  [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('dateOfBirth').optional().isISO8601(),
    body('gender').optional().isIn(['male', 'female', 'other']),
    body('class').optional().trim().notEmpty(),
    body('section').optional().trim().notEmpty(),
    body('parentName').optional().trim().notEmpty(),
    body('parentContact').optional().trim().notEmpty(),
    body('address').optional().trim().notEmpty(),
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

      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
        });
      }

      await student.update(req.body);

      res.json({
        success: true,
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating student',
        error: error.message,
      });
    }
  }
);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student (soft delete)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', auth, isCoordinator, async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    await student.update({ isActive: false });
    res.json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/students/bulk-upload:
 *   post:
 *     summary: Upload students via CSV
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/bulk-upload',
  auth,
  isCoordinator,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const results = [];
      const errors = [];

      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', async () => {
          // Clean up uploaded file
          fs.unlinkSync(req.file.path);

          // Process each student
          for (const studentData of results) {
            try {
              const existingStudent = await Student.findOne({
                where: { studentId: studentData.studentId },
              });

              if (existingStudent) {
                errors.push({
                  studentId: studentData.studentId,
                  error: 'Student ID already exists',
                });
                continue;
              }

              const student = await Student.create(studentData);
            } catch (error) {
              errors.push({
                studentId: studentData.studentId,
                error: error.message,
              });
            }
          }

          res.json({
            success: true,
            message: 'Bulk upload completed',
            data: {
              totalProcessed: results.length,
              successful: results.length - errors.length,
              failed: errors.length,
              errors,
            },
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error processing bulk upload',
        error: error.message,
      });
    }
  }
);

module.exports = router; 