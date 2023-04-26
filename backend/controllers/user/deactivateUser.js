import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $--title Deactivate User Account
// $--path DELETE /api/v1/user/:id/deactivate
// $--auth Private/Admin

const deactivateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    user.active = false;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export default deactivateUser;
