import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface FormStyleProps {
  sticky?: boolean;
  fullWidth?: boolean;
}

export const Form = styled.form<FormStyleProps>`
  ${(props) =>
    props.sticky &&
    `
      position: -webkit-sticky;
      position: sticky;
      top: 0;
  `}

  ${(props) =>
    props.fullWidth ?
    `
      width: 100%;
    `
    :
    `
      @media only screen and (max-width: 62em) {
        width: 100%;
      }
    `
    }
`;
