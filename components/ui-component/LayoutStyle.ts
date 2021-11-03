import styled from 'styled-components';

const LayoutStyle = styled.div`
  .appBar {
    background: #4c4c4a;

    a {
      color: #f3f4f6;
      text-decoration: none;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .container {
    min-height: 80vh;
  }
  .footer {
    padding: 1rem 0;
    background: rgb(76, 76, 72);
    text-align: center;
  }

  

`;

export default LayoutStyle;
