import React from 'react';
import DatePicker from '../Library/components/Form/Inputs/DatePicker';

const DatePickerPage = () => {
  return (
    <div>
      <DatePicker onChange={(e) => console.log("changed", e)}/>
    </div>
  );
};

export default DatePickerPage;
