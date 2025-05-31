const { WorkStation, Device, MaintenanceOperation } = require('../models');

// Create Workstation
exports.createWorkstation = async (req, res) => {
  try {
    const Workstation = await WorkStation.create(req.body);
    res.status(201).json(Workstation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Workstations with their Devices and Devices' MaintenanceOperations
exports.getWorkstations = async (req, res) => {
  try {

    const workstations = await WorkStation.findAll({
      include: {
        model: Device,
        as: 'Devices',
        include: {
          model: MaintenanceOperation,
          as: 'maintenanceoperation'
        }
      }
    });
    res.json(workstations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Workstation
exports.updateWorkstation = async (req, res) => {
  try {
    await WorkStation.update(req.body, { where: { id: req.params.id } });
    const updatedWorkstation = await WorkStation.findByPk(req.params.id);
    res.json(updatedWorkstation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Workstation
exports.deleteWorkstation = async (req, res) => {
  try {
    await WorkStation.destroy({ where: { id: req.params.id } });
    res.json({ message: 'تم حذف المكتب بنجاح' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
