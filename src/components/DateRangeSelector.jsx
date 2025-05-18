import React, { useState, useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import { addYears, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateRangeSelector({ onApply }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
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
      alert('Invalid date range');
      return;
    }

    const formattedRange = `${format(start, 'yyyyMMdd')}-${format(end, 'yyyyMMdd')}`;
    onApply(formattedRange);
    setOpen(false);
  };

  return (
    <div className="date-range-v4-wrapper" ref={wrapperRef}>
      <button
        className="date-range-v4-button"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close Date Range' : 'Select Date Range'}
      </button>

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































// import React, { useState, useEffect, useRef } from 'react';
// import { DateRange } from 'react-date-range';
// import { addYears, format } from 'date-fns';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';

// export default function DateRangeSelector({ onSelectRange }) {
//   const [open, setOpen] = useState(false);
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection',
//     },
//   ]);

//   const wrapperRef = useRef(null);

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [wrapperRef]);

//   // Call onSelectRange whenever range changes with validation
//   useEffect(() => {
//     const start = state[0].startDate;
//     const end = state[0].endDate;

//     const today = new Date();
//     const maxStart = addYears(end, -2);

//     if (start > end) return;
//     if (start < maxStart) return;
//     if (end > today) return;

//     const formattedRange = `${format(start, 'yyyyMMdd')}-${format(end, 'yyyyMMdd')}`;
//     onSelectRange(formattedRange);
//   }, [state, onSelectRange]);

//   return (
//     <div className="date-range-v4-wrapper" ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="date-range-v4-button"
//         style={{
//           padding: '8px 16px',
//           backgroundColor: '#d32f2f',
//           color: 'white',
//           border: 'none',
//           borderRadius: '6px',
//           cursor: 'pointer',
//           fontWeight: 'bold',
//         }}
//       >
//         {open ? 'Close Date Range' : 'Select Date Range'}
//       </button>

//       {open && (
//         <div
//           style={{
//             position: 'absolute',
//             zIndex: 9999,
//             background: 'white',
//             boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
//             borderRadius: '8px',
//             marginTop: '8px',
//           }}
//         >
//           <DateRange
//             editableDateInputs={true}
//             onChange={(item) => setState([item.selection])}
//             moveRangeOnFirstSelection={false}
//             ranges={state}
//             maxDate={new Date()}
//             rangeColors={['#d32f2f']}
//             months={1}
//             direction="horizontal"
//             showMonthAndYearPickers={true}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
