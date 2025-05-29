const { Workstation, Device, MaintenanceOperation } = require('../models');

// Create Workstation
exports.createWorkstation = async (req, res) => {
  try {
    const workstation = await Workstation.create(req.body);
    res.status(201).json(workstation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Workstations with their Devices and Devices' MaintenanceOperations
exports.getWorkstations = async (req, res) => {
  try {
    const workstations = await Workstation.findAll({
      include: {
        model: Device,
        as: 'Devices',
        include: {
          model: MaintenanceOperation,
          as: 'MaintenanceOperations'
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
    await Workstation.update(req.body, { where: { id: req.params.id } });
    const updatedWorkstation = await Workstation.findByPk(req.params.id);
    res.json(updatedWorkstation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Workstation
exports.deleteWorkstation = async (req, res) => {
  try {
    await Workstation.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Workstation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
