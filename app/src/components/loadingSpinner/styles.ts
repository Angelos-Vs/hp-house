import styled from '@emotion/styled';
import { ClipLoader } from 'react-spinners';

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledClipLoader = styled(ClipLoader)`
  border-width: 4px;
  border-color: black;
  animation: fadeInOut 1s ease-in-out infinite;

  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;
