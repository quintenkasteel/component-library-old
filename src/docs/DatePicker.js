import React from 'react';
import DatePicker from '../library/components/form/inputs/DatePicker';

const DatePickerPage = () => {
  return (
    <div>
      <DatePicker onChange={(e) => console.log("changed", e)}/>
    </div>
  );
};

export default DatePickerPage;
