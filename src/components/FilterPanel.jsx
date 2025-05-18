import React from 'react';
import MerchantDropdownSelector from './MerchantDropdownSelector';
import DateRangeSelector from './DateRangeSelector';


export default function FilterPanel({ onDateRangeSelect, onMerchantSelect }) {
  return (
    <div className="filter-panel-v4">
      <MerchantDropdownSelector onSelect={onMerchantSelect} />
      <DateRangeSelector onSelectRange={onDateRangeSelect} />
    </div>
  );
}