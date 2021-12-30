const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('extend_flight_has_seat_class', {
    extend_flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'extend_flight',
        key: 'id'
      }
    },
    seat_class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'seat_class',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seat_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'extend_flight_has_seat_class',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "extend_flight_id" },
          { name: "seat_class_id" },
        ]
      },
      {
        name: "fk_extend_flight_has_Seat_Class_Seat_Class1_idx",
        using: "BTREE",
        fields: [
          { name: "seat_class_id" },
        ]
      },
      {
        name: "fk_extend_flight_has_Seat_Class_extend_flight1_idx",
        using: "BTREE",
        fields: [
          { name: "extend_flight_id" },
        ]
      },
    ]
  });
};
