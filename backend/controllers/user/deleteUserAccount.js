import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $--title Delete User Account
// $--path DELETE /api/v1/user/:id
// $--auth Private/Admin

const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    const result = await user.deleteOne();

    res.json({
      success: true,
      message: `User ${result.firstName} has been deleted`,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export default deleteUserAccount;
