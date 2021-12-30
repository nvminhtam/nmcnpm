const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monthly_report', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    month: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    flight_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ticket_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    revenue: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Yearly_Report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'yearly_report',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'monthly_report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_Monthly_Report_Yearly_Report1_idx",
        using: "BTREE",
        fields: [
          { name: "Yearly_Report_id" },
        ]
      },
    ]
  });
};
