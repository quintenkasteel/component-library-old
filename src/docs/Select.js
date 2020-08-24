import React, { useState } from 'react';
import Select from '../library/components/form/inputs/Select';
import data from '../library/components/form/inputs/phone/countries.json';
//form
const SelectPage = () => {
  const [form, setForm] = useState({});
  console.log(form);
  return (
    <div>
      <Select
        data={data}
        select={'countryName'}
        labelSort={['icon', 'dialCode', 'countryName']}
        searchable
        title="Phone Select"
        onSelect={data => setForm(data)}
      />
    </div>
  );
};

export default SelectPage;
