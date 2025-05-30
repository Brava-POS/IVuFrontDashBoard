import React, { useState, useRef, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { DateRange } from 'react-date-range';
import { format, parse, differenceInDays, addYears } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { showAlert } from './SweetAlertComponent';

export default function SelectedDurationDisplay({ range, onApply }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    const start = state[0].startDate;
    const end = state[0].endDate;

    const today = new Date();
    const maxStart = addYears(end, -2);

    if (start > end || start < maxStart || end > today) {
      showAlert('error','Invalid date range');
      return;
    }

    const formattedRange = `${format(start, 'yyyyMMdd')}-${format(end, 'yyyyMMdd')}`;
    onApply(formattedRange);
    setOpen(false);
  };

  const display = () => {

    if (!range) {
    return <span className="duration-placeholder"> Select a date range</span>;
  }




    const [startStr, endStr] = range.split('-');
    const start = parse(startStr, 'yyyyMMdd', new Date());
    const end = parse(endStr, 'yyyyMMdd', new Date());
    const durationDays = differenceInDays(end, start) + 1;

    return (
      <span className="duration-text">
        Selected Duration:{' '}
        <strong>
          {format(start, 'MMM dd, yyyy')} - {format(end, 'MMM dd, yyyy')}
        </strong>{' '}
        ({durationDays} {durationDays === 1 ? 'day' : 'days'})
      </span>
    );
  };

  return (
    <div className="selected-duration-v4" ref={wrapperRef}>
      <FiCalendar size={20} className="calendar-icon" onClick={() => setOpen(!open)} />
      {display()}

      {open && (
        <div className="date-range-v4-popup">
          <DateRange
            editableDateInputs
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            maxDate={new Date()}
            rangeColors={['#d32f2f']}
            months={1}
            direction="horizontal"
            showMonthAndYearPickers
          />
          <div className="date-range-apply-container">
            <button className="date-range-apply-button" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




























