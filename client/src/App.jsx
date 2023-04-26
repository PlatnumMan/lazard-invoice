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

const App = () => {
  useTitle('Lazard Invoice - Home');
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
};

export default App;
