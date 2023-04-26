import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { FaSignInAlt, FaUserCheck } from 'react-icons/fa';
import GoogleLogin from '../../../components/GoogleLogin';
import StyledDivider from '../../../components/StyledDivider';
import AuthWrapper from '../forms/AuthWrapper';
import LoginForm from '../forms/LoginForm';
import { Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
  return (
    <AuthWrapper>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          border: '2px solid #e4e5e7',
          borderRadius: '25px',
          py: 2,
        }}
      >
        <Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FaSignInAlt className="auth-svg" />
              <Typography variant="h1">Login</Typography>
            </Box>
            <StyledDivider />
          </Grid>
          {/* Login form */}
          <LoginForm />
          {/* with google */}
          <Grid item xs={12}>
            <Box sx={{ alignItems: 'center', display: 'flex', mt: 2 }}>
              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              <Button
                sx={{
                  cursor: 'unset',
                  m: 1,
                  py: 0.5,
                  px: 7,
                  borderColor: 'gray !important',
                  color: 'gray !important',
                  fontWeight: 500,
                  borderRadius: '25px',
                }}
                disableRipple
                disabled
              >
                Or Sign In with Google
              </Button>
              <Divider
                sx={{ flexGrow: 1, mb: 1, mt: 1 }}
                orientation="horizontal"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GoogleLogin />
            </Box>
          </Grid>
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          {/* pdont have account */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="h6">
                Don't have an account?{' '}
                <Link
                  variant="h6"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  Sign Up here
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Divider
            sx={{ flexGrow: 1, mb: 1, mt: 1 }}
            orientation="horizontal"
          />
          {/* resend email */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                Didn't receive confirmation email?{' '}
                <Link
                  variant="h6"
                  component={RouterLink}
                  to="/resend"
                  sx={{ textDecoration: 'none' }}
                >
                  Resend here
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  );
};

export default LoginPage;
