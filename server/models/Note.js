import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'peronal',
    validate: {
      isIn:[['personal', 'business']]
    }
  }
}, {
  timestamps: true,
});

export default Note;
