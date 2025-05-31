const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// User Model
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' }
}, { timestamps: true });

// Sector Model
const Sector = sequelize.define('Sector', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { timestamps: false });

// Administration Model
const Administration = sequelize.define('Administration', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { timestamps: false });

// Workstation Model
const WorkStation = sequelize.define('WorkStation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

// Gate Model
const Gate = sequelize.define('Gate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

// Device Model
const Device = sequelize.define('Device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  ownerName: { type: DataTypes.STRING, allowNull: false },
  ownerContact: { type: DataTypes.STRING },
  specs: { type: DataTypes.JSON, allowNull: false }  // { cpu, mac, gpu, ram, deviceType }
}, { timestamps: true });

// Maintenance Operation Model
const MaintenanceOperation = sequelize.define('MaintenanceOperation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deviceId:{type:DataTypes.INTEGER ,allowNull:false},
  technicalReceiver: { type: DataTypes.STRING, allowNull: false },
  problemDescription: { type: DataTypes.TEXT, allowNull: false },
  ownerName: { type: DataTypes.STRING, allowNull: false },
  ownerContact: { type: DataTypes.STRING },
  senderName: { type: DataTypes.STRING },
  senderContact: { type: DataTypes.STRING },
  arrivalDate: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  location: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
  technicalResolver: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'), defaultValue: 'pending' },
  isDelivered: { type: DataTypes.BOOLEAN, defaultValue: false },
  // new foreign keys for user associations
  maintainedBy: { type: DataTypes.INTEGER, allowNull: true },
  approvedBy: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: true });

// Associations
// A User can maintain many operations, and approve many operations
User.hasMany(MaintenanceOperation, { as: 'maintainedoperation', foreignKey: 'maintainedBy' });
MaintenanceOperation.belongsTo(User, { as: 'maintainer', foreignKey: 'maintainedBy' });

User.hasMany(MaintenanceOperation, { as: 'ApprovedOperations', foreignKey: 'approvedBy' });
MaintenanceOperation.belongsTo(User, { as: 'approver', foreignKey: 'approvedBy' });

// Device to lookups
Sector.hasMany(Device, { foreignKey: 'sectorId' });
Device.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sector' });

Administration.hasMany(Device, { foreignKey: 'administrationId' });
Device.belongsTo(Administration, { foreignKey: 'administrationId', as: 'administration' });

WorkStation.hasMany(Device, { foreignKey: 'workstationId' });
Device.belongsTo(WorkStation, { foreignKey: 'workstationId', as: 'workstation' });

Gate.hasMany(Device, { foreignKey: 'gateId' });
Device.belongsTo(Gate, { foreignKey: 'gateId', as: 'gate' });

Device.hasMany(MaintenanceOperation, { foreignKey: 'deviceId', onDelete: 'CASCADE' , as:"maintenanceoperation" });
MaintenanceOperation.belongsTo(Device, { foreignKey: 'deviceId', onDelete: 'CASCADE',as:"device"});

module.exports = {
  sequelize,
  User,
  Sector,
  Administration,
  WorkStation,
  Gate,
  Device,
  MaintenanceOperation
};



