const router = require('express').Router();
let Student = require('../models/student.model');

// Get all students
router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new student
router.route('/add').post((req, res) => {
    const { name, grade, dateOfBirth, parentContact } = req.body;

    const newStudent = new Student({
        name,
        grade,
        dateOfBirth,
        parentContact
    });

    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get student by id
router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete student
router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update student
router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.name = req.body.name;
            student.grade = req.body.grade;
            student.dateOfBirth = req.body.dateOfBirth;
            student.parentContact = req.body.parentContact;

            student.save()
                .then(() => res.json('Student updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 