import bcrypt from 'bcryptjs';
import 'dotenv/config';
import mongoose from 'mongoose';
import validator from 'validator';
import { USER } from '../constants/index.js';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, 'Invalid email'],
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
        },
        message: 'Invalid username',
      },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: [
        validator.isAlphanumeric,
        'First name can only contain letters and numbers',
      ],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: [
        validator.isAlphanumeric,
        'Last name can only contain letters and numbers',
      ],
    },
    password: {
      type: String,
      select: false,
      validate: [
        validator.isStrongPassword,
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      ],
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    provider: {
      type: String,
      required: true,
      default: 'email',
    },
    googleId: String,
    avatar: String,
    bussinessName: String,
    phoneNumber: {
      type: String,
      default: '+10000000000',
    },
    address: String,
    city: String,
    country: String,
    passwordChangedAt: Date,

    roles: {
      type: [String],
      default: [USER],
    },
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.roles.length === 0) {
    this.roles.push(USER);
    next();
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
