import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Footer from './components/Footer';
import { customTheme } from './customTheme';
import Layout from './components/Layout';
import useTitle from './hooks/useTitle';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import RegisterPage from './features/auth/pages/RegisterPage';
import VerifiedPage from './features/auth/pages/VerifiedPage';

const App = () => {
  useTitle('Lazard Invoice - Home');
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="auth/verify" element={<VerifiedPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
};

export default App;
