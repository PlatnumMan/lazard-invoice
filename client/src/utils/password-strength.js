const hasNumber = (value) => new RegExp(/[0-9]/).test(value);
const hasMixed = (value) =>
  new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
const hasSpecial = (value) => new RegExp(/[!#@$%^&*)(+=._-]/).test(value);

export const strengthColor = (count) => {
  if (count < 2) return { label: 'Weak', color: '#ff1744' };
  if (count < 3) return { label: 'Fair', color: '#ff9100' };
  if (count < 4) return { label: 'Good', color: '#ffea00' };
  if (count < 5) return { label: 'Strong', color: '#76ff03' };
  if (count < 6) return { label: 'Very Strong', color: '#00e676' };
  return { label: 'Weak', color: '#ff1744' };
};

export const strengthIndicator = (value) => {
  let strengths = 0;
  if (value.length > 5) strengths += 1;
  if (value.length > 7) strengths += 1;
  if (hasNumber(value)) strengths += 1;
  if (hasSpecial(value)) strengths += 1;
  if (hasMixed(value)) strengths += 1;
  return strengths;
};
