import React from 'react';

import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const colourOptions = [
    { value: 'Harvard - standard', label: 'Harvard - standard' },
    { value: 'Harvard - page numbers for all in-text citations', label: 'Harvard - page numbers for all in-text citations' },
    { value: 'Oxford Referencing', label: 'Oxford Referencing' },
  ]

export default function Sel() {
  return (
    <ReactSelect 
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  );
}