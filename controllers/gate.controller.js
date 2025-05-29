const { Gate, Device, MaintenanceOperation } = require('../models');

//  Create Gate
exports.createGate = async (req, res) => {
  try {
    const gate = await Gate.create(req.body);
    res.status(201).json(gate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all Gates with associated Devices and their MaintenanceOperations
exports.getGates = async (req, res) => {
  try {
    const gates = await Gate.findAll({
      include: [
        {
          model: Device,
          as: 'Devices',
          include: [
            {
              model: MaintenanceOperation,
              as: 'MaintenanceOperations'
            }
          ]
        }
      ]
    });
    res.json(gates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Update Gate
exports.updateGate = async (req, res) => {
  try {
    await Gate.update(req.body, { where: { id: req.params.id } });
    const updatedGate = await Gate.findByPk(req.params.id);
    res.json(updatedGate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete Gate
exports.deleteGate = async (req, res) => {
  try {
    await Gate.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Gate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
