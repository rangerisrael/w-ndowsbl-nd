import styled from 'styled-components';

const LoadingBarStyle = styled.div`
  .loading-box {
    position: relative;
    background: transparent;
  }

  .loading-circle {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .loading-text {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export default LoadingBarStyle;
