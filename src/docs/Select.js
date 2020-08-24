import React from 'react';
import Select from '../library/components/form/inputs/Select';
import data from '../library/components/form/inputs/phone/countries.json';

const SelectPage = () => {
  return (
    <div>
      <Select
        data={data}
        select={'dialCode'}
        labelSort={['icon', 'dialCode', 'countryName']}
        searchable
        title="Phone Select"
        onSelect={(e) => console.log(e)}
      />
    </div>
  );
};

export default SelectPage;
