import { Box, CssBaseline, Link, Typography } from '@mui/material';
import { FaMoneyBillWave } from 'react-icons/fa';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ color: '#ffffff' }}
    >
      {'CopyRight © '}
      <Link color="inherit" href="https://github.com/PlatnumMan">
        Lazard Invoice
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#000000',
        }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          component="p"
          sx={{
            color: '#07f011',
          }}
        >
          <FaMoneyBillWave /> Because we care about your money!{' '}
          <FaMoneyBillWave />
        </Typography>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
