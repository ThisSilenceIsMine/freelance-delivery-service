import styled from '@emotion/styled';

interface Props {
  dark?: boolean;
}

export const NavLink = styled.a<Props>`
  position: relative;
  box-sizing: content-box;
  cursor: pointer;
  &::before {
    display: block;
    position: relative;
    left: 0;
    bottom: -1.5em;
    content: '';
    background: ${(props) => (props.dark ? 'orange' : 'black')};
    height: 2px;
    width: 0;
    color: ${(props) => (props.dark ? 'orange' : 'black')};
    transition: 0.25s;
  }
  &:hover::before {
    width: 100%;
  }
`;
