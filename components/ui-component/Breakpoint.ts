import styled from 'styled-components';

const BreakPoint = styled.div`
  @media only screen and (min-width: 900px) {
    .md-center {
      margin: 2rem auto;
    }
  }

  @media only screen and (max-width: 899px) {
    fieldset {
      margin: 0 !important;
      padding: 0 !important;
    }
    .list-full {
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 410px) {
    .button-signIn {
      font-size: 0.7rem;
      margin-top: 0.3rem;
      margin-left: 0.75rem !important;
    }
  }
`;

export default BreakPoint;
