import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = ({ visible }) => {
  return (
    <LoaderContainer>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="3"
        animationDuration="0.8"
        width="72"
        visible={visible}
      />
    </LoaderContainer>
  );
};