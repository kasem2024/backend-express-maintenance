const { MaintenanceOperation, Device, User } = require('../models');

// Create MaintenanceOperation
exports.createMaintenanceOperation = async (req, res) => {
  try {
    const maintenanceOperation = await MaintenanceOperation.create(req.body);
    res.status(201).json(maintenanceOperation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all MaintenanceOperations with associated Device, Maintainer and Approver Users
exports.getMaintenanceOperations = async (req, res) => {
  try {
    const maintenanceOperations = await MaintenanceOperation.findAll({
      include: [
        { model: Device, as: 'device' },
        { model: User, as: 'maintainer', attributes: ['id', 'name', 'email', 'role'] },
        { model: User, as: 'approver', attributes: ['id', 'name', 'email', 'role'] }
      ]
    });
    res.json(maintenanceOperations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update MaintenanceOperation
exports.updateMaintenanceOperation = async (req, res) => {
  try {
    await MaintenanceOperation.update(req.body, { where: { id: req.params.id } });
    const updatedMaintenanceOperation = await MaintenanceOperation.findByPk(req.params.id, {
      include: [
        { model: Device, as: 'device' },
        { model: User, as: 'maintainer', attributes: ['id', 'name', 'email', 'role'] },
        { model: User, as: 'approver', attributes: ['id', 'name', 'email', 'role'] }
      ]
    });
    res.json(updatedMaintenanceOperation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete MaintenanceOperation
exports.deleteMaintenanceOperation = async (req, res) => {
  try {
    await MaintenanceOperation.destroy({ where: { id: req.params.id } });
    res.json({ message: 'MaintenanceOperation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
