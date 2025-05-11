const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vaccination = sequelize.define('Vaccination', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vaccineName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    doseNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    driveId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    administeredBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return Vaccination;
}; 