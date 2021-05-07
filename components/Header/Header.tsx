import styled from "@emotion/styled"
import { NavLink } from "./NavLink"

export const Header = () => {
    return (
      <_Header>
        <LogoTitle>ShipIt!</LogoTitle>
        <Nav>
          <List>
            {/* <Item> <NavLink>Home</NavLink> </Item> */}
            <NavLink>Home</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Drivers</NavLink>
            <NavLink>Stuff</NavLink>
          </List>
        </Nav>
      </_Header>
    );
}

const LogoTitle = styled.h2`
    margin-left: 1em;
    color: ${({theme}) => theme.color.orange};
`

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`


const List = styled.ul`
    list-style-type: none;
    width: 80%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
`;

const Item = styled.li`
    float: left;
    font-family: 'Montserrat';
`;


const _Header = styled.header`

  margin: 0 5%;
  background-color: white;
  height: 3em;
  width: 90%;

  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  grid-template-rows: 1fr;
  justify-content: space-around;
  align-content: center;

  -webkit-box-shadow: 0px 1px 22px 5px rgba(0, 0, 0, 0.36);
  box-shadow: 0px 1px 22px 5px rgba(0, 0, 0, 0.36);
`;