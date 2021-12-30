const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'flight',
        key: 'id'
      }
    },
    Customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    Monthly_Report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'monthly_report',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "Flight_id" },
          { name: "Customer_id" },
        ]
      },
      {
        name: "idBill_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_Bill_Flight1_idx",
        using: "BTREE",
        fields: [
          { name: "Flight_id" },
        ]
      },
      {
        name: "fk_Bill_Customer1_idx",
        using: "BTREE",
        fields: [
          { name: "Customer_id" },
        ]
      },
      {
        name: "fk_Bill_Monthly_Report1_idx",
        using: "BTREE",
        fields: [
          { name: "Monthly_Report_id" },
        ]
      },
    ]
  });
};
