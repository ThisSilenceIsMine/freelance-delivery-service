import { StylesConfig, OptionTypeBase } from "react-select";

interface OptionType { label: string; value: string };

const dark = '#1A202C';
const lighter = '#2D3748';
const textColor = '#EDEDEE';


export const customStyles: StylesConfig<OptionTypeBase, false> = {
  menu: (provided) => ({
    ...provided,
    // backgroundColor: dark,
    background: dark,
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? lighter : dark,
    // backgroundColor: state.isFocused ? lighter : dark,
  }),
  control: (provided) => ({ ...provided, background: dark, borderColor: '#3F444E' }),
  input: (provided) => ({ ...provided, color: textColor }),
  // container: (provided) => ({ ...provided, background: dark }),
  singleValue: (provided) => ({ ...provided, color: textColor }),
};