import styled from '@emotion/styled';

export const NavLink = styled.a`
  position: relative;
  box-sizing: content-box;
  cursor: pointer;
  &::before {
    display: block;
    position: relative;
    left: 0;
    bottom: -1.5em;
    content: '';
    background: black;
    height: 2px;
    width: 0;
    color: black;
    transition: 0.25s;
  }
  &:hover::before {
    width: 100%;
  }
`;
