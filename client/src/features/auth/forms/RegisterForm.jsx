import { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
  strengthColor,
  strengthIndicator,
} from '../../../utils/password-strength';
import { useRegisterUserMutation } from '../authApiSlice';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import AuthButtonAnimations from '../../../animations/auhButtonAnimations';
import Spinner from '../../../components/Spinner';
import useTitle from '../../../hooks/useTitle';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const RegisterForm = () => {
  useTitle('Register - Lazard Invoice');
  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const [registerUser, { data, isLoading, isSuccess }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');

      const message = data?.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          passwordConfirm: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(255).required('First name is required'),
          lastName: Yup.string().max(255).required('Last name is required'),
          username: Yup.string()
            .matches(USERNAME_REGEX, 'Invalid username')
            .required('Username is required'),
          email: Yup.string()
            .email(' Must be a valid email ')
            .required('Email is required'),
          password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .max(255)
            .required('Password is required'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirm is required'),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            await registerUser(values).unwrap();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (error) {
            const message = error?.data?.message;
            toast.error(message);
            setStatus({ success: false });
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Grid container spacing={3}>
                {/* FIRST NAME */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <InputLabel htmlFor="firstName-signup">
                      First Name*
                    </InputLabel>
                    <OutlinedInput
                      id="firstName-signup"
                      type="firstName"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error id="helper-text-firstName-signup">
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* LAST NAME */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <InputLabel htmlFor="lastName-signup">
                      Last Name*
                    </InputLabel>
                    <OutlinedInput
                      id="lastName-signup"
                      type="lastName"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter your Last Name"
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error id="helper-text-lastName-signup">
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* USERNAME*/}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <InputLabel htmlFor="username-signup">Username*</InputLabel>
                    <OutlinedInput
                      id="username-signup"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      inputProps={{}}
                      fullWidth
                      error={Boolean(touched.username && errors.username)}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id="helper-text-username-signup">
                        {errors.username}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* EMAIL*/}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <InputLabel htmlFor="email-signup">
                      Email Address*
                    </InputLabel>
                    <OutlinedInput
                      id="email-signup"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      inputProps={{}}
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* PASSWORD*/}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <InputLabel htmlFor="password-signup">Password*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="password-signup"
                      error={Boolean(touched.password && errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibilty"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter your password"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                  {/* Password strength */}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 350,
                            height: 8,
                            borderRadius: '7px',
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="subtitle1"
                          fontSize="0.75rem"
                          sx={{ fontWeight: 700 }}
                        >
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>

                {/* PASSWORD CONFIRM*/}
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <InputLabel htmlFor="passwordConfirm-signup">
                      Confirm Password*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="passwordConfirm-signup"
                      error={Boolean(
                        touched.passwordConfirm && errors.passwordConfirm
                      )}
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={values.passwordConfirm}
                      name="passwordConfirm"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle passwordConfirm visibilty"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter your password"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {/* TERMS OF SERVICE */}
                <Grid item xs={12}>
                  <Typography variant="body2" fontSize="0.75rem">
                    By registering, you agree to our &nbsp;
                    <Link
                      variant="subtitle2"
                      component={RouterLink}
                      to="https://www.termsofservicegenerator.net/live.php?token=tsKTISEhRmZoABNOLd6m1zgic94hHnpY"
                    >
                      Terms of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#">
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>

                {/* SHOW ERROS */}
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                {/* Create button */}
                <Grid item xs={12}>
                  <AuthButtonAnimations>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Create account
                    </Button>
                  </AuthButtonAnimations>
                </Grid>
              </Grid>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
