import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $--title Update User Profile
// $--path PATCH /api/v1/user/Profile
// $--auth Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const {
    password,
    passwordConfirm,
    email,
    isEmailVerified,
    provider,
    roles,
    googleId,
    username,
  } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (password || passwordConfirm) {
    res.status(400);
    throw new Error('Password cannot be updated from this route');
  }

  if (email || isEmailVerified || provider || roles || googleId) {
    res.status(400);
    throw new Error(
      'You are not allowed to update email, isEmailVerified, provider, roles, googleId from this route'
    );
  }

  const fieldsToUpdate = req.body;

  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { ...fieldsToUpdate },
    { new: true, runValidators: true }
  ).select('-refreshToken');

  res.status(200).json({
    success: true,
    message: `${user.firstName}'s profile updated successfully`,
    updatedProfile,
  });
});

export default updateUserProfile;
