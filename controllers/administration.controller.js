const { Administration, Device, MaintenanceOperation } = require('../models');

// Create Administration
exports.createAdministration = async (req, res) => {
  try {
    const administration = await Administration.create(req.body);
    res.status(201).json(administration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Administrations with related Devices and their maintenance operations
exports.getAdministrations = async (req, res) => {
  try {
     //=> add a validations for the device and miantenance before findAll 
    const administrations = await Administration.findAll({
      // include: [
      //   {
      //     model: Device,
      //     as: 'Devices',
      //     include: [
      //       {
      //         model: MaintenanceOperation,
      //         as: 'MaintenanceOperations'
      //       }
      //     ]
      //   }
      // ]
    });
    console.log(administrations)
    res.json(administrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Administration by ID
exports.updateAdministration = async (req, res) => {
  try {
    await Administration.update(req.body, {
      where: { id: req.params.id }
    });
    const updated = await Administration.findByPk(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Administration by ID
exports.deleteAdministration = async (req, res) => {
  try {
    await Administration.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Administration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
