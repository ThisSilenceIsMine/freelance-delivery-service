import React, { HTMLAttributes } from 'react';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

import uk from 'date-fns/locale/uk';
registerLocale('uk', uk);

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
}: Props) => {
  return (
    <ReactDatePicker
      locale="uk"
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
    />
  );
};

export default DatePicker;
