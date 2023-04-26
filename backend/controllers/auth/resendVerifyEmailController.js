import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import sendEmail from '../../utils/sendEmail.js';
import VerificationToken from '../../models/verifyResetTokenModel.js';

const domainURL = process.env.DOMAIN;
const { randomBytes } = await import('crypto');

// $--title Resend a user's verification email
// $--route POST /api/v1/auth/resend_email_token
// $--access Public

const resendVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  if (!user) {
    res.status(404);
    throw new Error('We were unable to find a user with that email.');
  }

  if (user.isEmailVerified) {
    res.status(400);
    throw new Error('This user has already been verified.');
  }

  let verificationToken = await VerificationToken.findOne({
    _userId: user._id,
  });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  const resendToken = randomBytes(32).toString('hex');

  let emailToken = await new VerificationToken({
    _userId: user._id,
    token: resendToken,
  }).save();

  const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

  const payload = {
    name: user.firstName,
    link: emailLink,
  };

  await sendEmail(
    user.email,
    'Email Verification',
    payload,
    './emails/template/accountVerification.handlebars'
  );

  res.json({
    success: true,
    message: `A verification email has been sent to ${user.email}.`,
  });
});

export default resendVerifyEmail;
