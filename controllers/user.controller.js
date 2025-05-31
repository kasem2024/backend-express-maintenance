const { User,Device, MaintenanceOperation } = require('../models');



// Get all Users 
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(
     );
    //  {
    //   include:[
    //     {model: MaintenanceOperation, as: 'maintainer',},
    //     { model: MaintenanceOperation, as: 'approver'}
    //   ]

    //   }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
