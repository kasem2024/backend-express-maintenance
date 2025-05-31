const { Device, Sector, Administration, WorkStation, Gate, MaintenanceOperation } = require('../models');
const axios = require('axios');

//  Create device
exports.createDevice = async (req, res) => {
  try {
    const [sectorCount, adminCount, workstationCount, gateCount] = await Promise.all([
      Sector.count(),
      Administration.count(),
      WorkStation.count(),
      Gate.count()
    ]);

    if (sectorCount < 1 || adminCount < 1 || workstationCount < 1 || gateCount < 1) {
      return res.status(400).json({
        error: 'غير قادر علي انشاء جهاز لابد من وجود ادراة و بوابة وقطاع و مكتب  واحد علي الاقل '
      });
    }

    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all devices with full associations
exports.getDevices = async (req, res) => {
  try {
    const [sectorCount, adminCount, workstationCount, gateCount] = await Promise.all([
      Sector.count(),
      Administration.count(),
      WorkStation.count(),
      Gate.count()
    ]);

    if (sectorCount < 1 || adminCount < 1 || workstationCount < 1 || gateCount < 1) {
      return res.status(400).json({
        error: 'غير قادر علي استرجاع بيانات الاجهاز لابد من وجود ادراة و بوابة و قطاع و مكتب واحد علي الاقل'
      });
    }

    const devices = await Device.findAll({
      include: [
        { model: Sector, as: 'sector', required: false },
        { model: Administration, as: 'administration', required: false },
        { model: WorkStation, as: 'workstation', required: false },
        { model: Gate, as: 'gate', required: false },
        {
          model: MaintenanceOperation,
          as: 'maintenanceoperation',
          required: false
        }
      ]
    });

    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Update device
exports.updateDevice = async (req, res) => {
  try {
    await Device.update(req.body, { where: { id: req.params.id } });
    const updatedDevice = await Device.findByPk(req.params.id);
    res.json(updatedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete device
exports.deleteDevice = async (req, res) => {
  try {
    await Device.destroy({ where: { id: req.params.id } });
    res.json({ message: 'الجهاز تم خذفه بنجاح' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Fetch device info from local network by IP
exports.getDeviceInfo = async (req, res) => {
  const deviceIp = req.params.ip || 'localhost';
  const targetUrl = `http://${deviceIp}:6000/device-info`;

  try {
    const response = await axios.get(targetUrl);
    res.json({
      message: 'تم جلب بيانات الجهاز بنجاح',
      deviceIp,
      deviceInfo: response.data
    });
  } catch (err) {
    console.error(` Failed to fetch from ${targetUrl}:`, err.message);
    res.status(500).json({
      message: 'فشل في جلب معلومات الجهاز',
      error: err.message
    });
  }
};
