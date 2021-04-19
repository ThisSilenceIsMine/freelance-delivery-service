import styled from "@emotion/styled"

export interface Props extends React.ComponentPropsWithoutRef<'button'> {
  primary: boolean;
}

//Using React.FC since we need children there
 export const Button: React.FC<Props> = ({ children, ...rest }) => {
   return <StyledButton {...rest}>{children}</StyledButton>;
 };
 
const StyledButton = styled.button<Omit<Props, 'label'>>`
  border: none;
  border-radius: 50px;
  padding: 1em 1.75em;
  background-color: ${({ primary, theme }) => (primary ? theme.color.orange : theme.color.grey)};
  color: ${({ primary, theme }) => (primary ? theme.color.grey : 'black')};
  border: 2px solid ${({ primary, theme }) => (primary ? theme.color.orange : theme.color.grey)};

  cursor: pointer;
  transition-duration: 0.2s;

  &:hover {
    ${({ primary }) =>
      primary
        ? `
          background-color: white;
          color: orange;
          border: 2px solid orange;
        `
        : `
          box-shadow: 0px 10px 15px rgba(97, 90, 64, 0.801);
          color: #fff;
        `}
  }
`;