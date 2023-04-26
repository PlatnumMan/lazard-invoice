import { Divider, styled } from '@mui/material';

const DividerStyle = styled(Divider)(({ theme }) => ({
  width: '50%',
  marginTop: '10px',
  marginBottom: '15px',
  marginLeft: 'auto',
  height: '3px',
  backgroundImage: 'linear-gradient(to right, #07f011, #ffffff, #07f011)',
}));

const StyledDivider = () => {
  return <DividerStyle />;
};

export default StyledDivider;
