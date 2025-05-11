const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'school_vaccination_tracker', // database name
  'root', // username
  'Za!2323Za!2323', // password
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {
  sequelize,
  Sequelize,
  User: require('./user.model')(sequelize, Sequelize),
  School: require('./school.model')(sequelize, Sequelize),
  Student: require('./student.model')(sequelize, Sequelize),
  Vaccination: require('./vaccination.model')(sequelize, Sequelize),
  VaccinationDrive: require('./vaccinationDrive.model')(sequelize, Sequelize)
};

// Define associations
db.User.belongsTo(db.School, { foreignKey: 'schoolId' });
db.School.hasMany(db.User, { foreignKey: 'schoolId' });

db.Student.belongsTo(db.School, { foreignKey: 'schoolId' });
db.School.hasMany(db.Student, { foreignKey: 'schoolId' });

db.Vaccination.belongsTo(db.Student, { foreignKey: 'studentId' });
db.Student.hasMany(db.Vaccination, { foreignKey: 'studentId' });

db.Vaccination.belongsTo(db.VaccinationDrive, { foreignKey: 'driveId' });
db.VaccinationDrive.hasMany(db.Vaccination, { foreignKey: 'driveId' });

db.VaccinationDrive.belongsTo(db.School, { foreignKey: 'schoolId' });
db.School.hasMany(db.VaccinationDrive, { foreignKey: 'schoolId' });

module.exports = db; 