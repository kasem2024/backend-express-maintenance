const { Sector } = require('../models');

// Create Sector
exports.createSector = async (req, res) => {
  try {
    const sector = await Sector.create(req.body);
    res.status(201).json(sector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Sectors (you can include Devices if needed)
exports.getSectors = async (req, res) => {
  try {
    // If you want to include related devices:
    // const sectors = await Sector.findAll({ include: [{ model: Device, as: 'devices' }] });
    
    // For now, just getting all sectors without maintenance or devices:
    const sectors = await Sector.findAll();
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Sector
exports.updateSector = async (req, res) => {
  try {
    await Sector.update(req.body, { where: { id: req.params.id } });
    const updatedSector = await Sector.findByPk(req.params.id);
    res.json(updatedSector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Sector
exports.deleteSector = async (req, res) => {
  try {
    await Sector.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Sector deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
