import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button, Typography, Stack } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';

const VerifiedPage = () => {
  useTitle('Lazard | Verified');
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      height="94vh"
    >
      <FaCheckCircle className="verified" />
      <Typography variant="h2" gutterBottom>
        You are verified!
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        Your account has been verified and is ready to use.
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        Please login to continue.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/login"
        startIcon={<LockOpenIcon />}
        endIcon={<LockOpenIcon />}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/login"
          sx={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Login
        </Typography>
      </Button>
    </Stack>
  );
};

export default VerifiedPage;
