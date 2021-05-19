import styled from "@emotion/styled"

export const StickyForm = styled.form`
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  @media only screen and (max-width: 62em) {
    width: 100%;
  }
`;