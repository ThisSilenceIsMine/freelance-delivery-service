import styled from '@emotion/styled';

export const NavLink = styled.a`
  position: relative;
  box-sizing: content-box;
  cursor: pointer;
  text-transform: uppercase;
  &::before {
    display: block;
    position: relative;
    left: 0;
    bottom: -1.23em;
    content: '';
    background: ${({ theme }) => theme.color.orange};
    height: 3px;
    width: 0;
    color: ${({ theme }) => theme.color.orange};
    transition: 0.1s;
  }
  &:hover::before {
    width: 100%;
  }
`;
