const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const deviceRoutes = require('./routes/device.routes');
const sectorRoutes = require('./routes/sector.routes');
const administrationRoutes = require('./routes/administration.routes');
const gateRoutes = require('./routes/gate.routes');
const maintenanceRoutes = require('./routes/maintenanceOperation.routes');
const userRoutes = require('./routes/user.routes');
const loginRoutes = require('./routes/login.routes');
const registerRoutes = require('./routes/register.routes');
const workstationRoutes = require('./routes/workstation.routes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.send('Server is healthy ✅');
});
app.use('/api/registerauth',registerRoutes)
app.use('/api/loginauth',loginRoutes)
app.use('/api/device', deviceRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/sector', sectorRoutes);
app.use('/api/administration', administrationRoutes);
app.use('/api/workstation', workstationRoutes);
app.use('/api/gate', gateRoutes);
app.use('/api/user', userRoutes);

// Sync models
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced.');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

module.exports = app;
