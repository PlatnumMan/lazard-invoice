import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Grid,
} from '@mui/material';
import { FaUserCheck } from 'react-icons/fa';
import GoogleLogin from '../../../components/GoogleLogin';
import StyledDivider from '../../../components/StyledDivider';
import AuthWrapper from '../forms/AuthWrapper';
import RegisterForm from '../forms/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <AuthWrapper>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          border: '1px solid #e4e5e7',
          borderRadius: '25px',
          mt: 0,
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
              <FaUserCheck className="auth-svg" />
              <Typography variant="h1">Sign Up</Typography>
            </Box>
            <StyledDivider />
          </Grid>

          <RegisterForm />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: '#ccff996b',
              },
              mt: 2,
              mb: 2,
            }}
          >
            <Button startIcon={<LockOpenIcon />} endIcon={<LockOpenIcon />}>
              <Typography
                component={Link}
                to="/login"
                variant="h6"
                sx={{ textDecoration: 'none' }}
                color="primary"
              >
                Already have an account? Sign In
              </Typography>
            </Button>
          </Box>
          {/* Or Sign Up with Google */}
          <Grid item xs={12}>
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
                }}
                variant="outlined"
                disableRipple
                disabled
              >
                Or Sign Up with Google
              </Button>
              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
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
        </Grid>
      </Container>
    </AuthWrapper>
  );
};

export default RegisterPage;
