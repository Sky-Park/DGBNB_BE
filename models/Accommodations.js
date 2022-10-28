'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accommodations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accommodations.belongsTo(models.Members, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
      Accommodations.hasMany(models.Reservations, {
        foreignKey: "accId",
        // onDelete: "CASCADE",
      });
      Accommodations.hasMany(models.Reviews, {
        foreignKey: "accId",
        // onDelete: "CASCADE",
      });
    }
  }
  Accommodations.init({
    accId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Members',
      //   key: 'userId',
      // }
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false
    },
    accName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accAddr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    maxPerson: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    room: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathroom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    facilities: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.Now
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Now
    },
    deletedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Accommodations',
  });
  return Accommodations;
};
