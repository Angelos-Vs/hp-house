import React from 'react';
import { SpinnerContainer, StyledClipLoader } from './styles';

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <StyledClipLoader color="#000000" loading={true} size={50} />
    </SpinnerContainer>
  );
};

export default Spinner;
