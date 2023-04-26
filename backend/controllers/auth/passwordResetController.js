import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import sendEmail from '../../utils/sendEmail.js';
import VerificationToken from '../../models/verifyResetTokenModel.js';

const domainURL = process.env.DOMAIN;
const { randomBytes } = await import('crypto');

// $--title Send password reset email
// $--route POST /api/v1/auth/reset_password_request
// $--access Public

const sendPasswordResetEmailRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const existingUser = await User.findOne({ email }).select('-passwordConfirm');

  if (!existingUser) {
    res.status(400);
    throw new Error('We were unable to find a user with that email.');
  }

  let verificationToken = await VerificationToken.findOne({
    _userId: existingUser._id,
  });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  const resetToken = randomBytes(32).toString('hex');

  let newVerificationToken = await new VerificationToken({
    _userId: existingUser._id,
    token: resetToken,
    createdAt: Date.now(),
  }).save();

  if (existingUser && existingUser.isEmailVerified) {
    const emailLink = `${domainURL}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;

    const payload = {
      name: existingUser.firstName,
      link: emailLink,
    };

    await sendEmail(
      existingUser.email,
      'Password Reset',
      payload,
      './emails/template/requestResetPassword.handlebars'
    );

    res.status(200).json({
      success: true,
      message: `A reset email has been sent to ${existingUser.email}.`,
    });
  }
});

// $--title Reset password
// $--route POST /api/v1/auth/reset_password
// $--access Public

const resetPassword = asyncHandler(async (req, res) => {
  const { password, passwordConfirm, userId, emailToken } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Password is required');
  }

  if (!passwordConfirm) {
    res.status(400);
    throw new Error('Password confirm is required');
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters');
  }

  const passwordResetToken = await VerificationToken.findOne({
    userId,
  });

  if (!passwordResetToken) {
    res.status(400);
    throw new Error('Invalid or expired password reset token');
  }

  const user = await User.findById({ _id: passwordResetToken._userId }).select(
    '-passwordConfirm'
  );

  if (user && passwordResetToken) {
    user.password = password;
    await user.save();

    const payload = {
      name: user.firstName,
    };

    await sendEmail(
      user.email,
      'Password Reset Successfully',
      './emails/template/resetPassword.handlebars'
    );

    res.json({
      success: true,
      message: `Hey ${user.firstName}, your password has been reset successfully.`,
    });
  }
});

export { sendPasswordResetEmailRequest, resetPassword };
