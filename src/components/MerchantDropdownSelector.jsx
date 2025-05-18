// MerchantDropdownSelector(
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';

export default function MerchantDropdownSelector({ onSelect }) {
  const { axiosInstance, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(user?.merchantSerialCode || '');
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dropdownRef = useRef(null);

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page - 1); // backend is zero-based
      if (search) params.append('merchantSerialCode', search);

      const res = await axiosInstance.get(`http://localhost:9999/merchants/search?${params.toString()}`);

      console.log("Fetched merchants:   ====================>", res.data.content);

      setMerchants(res.data?.content || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch merchants:', err);
      setMerchants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchMerchants();
  }, [search, page, open]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (merchant) => {


    console.log("slected merchant " , merchant);
console.log("slected merchant.id     " , merchant.id);
console.log("slected merchant.merchantSerialCode    " , merchant.merchantSerialCode);


    setSelectedMerchant(merchant);
    onSelect && onSelect(merchant);
    setOpen(false);
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setOpen(!open)}>
        {selectedMerchant
          ? `${selectedMerchant.merchantSerialCode} (${selectedMerchant.id})`
          : 'Select Merchant'}
      </button>

      {open && (
        <div className="dropdown-menu">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by Merchant Serial Number"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset to first page on new search
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}>&times;</button>
            )}
          </div>

          <div className="merchant-list">
            {loading ? (
           <MainAppSpinner/>
            ) : merchants.length === 0 ? (
              <p>No merchants found</p>
            ) : (
              merchants.map((merchant) => (
                <div
                  key={merchant.id}
                  className="merchant-item"
                  onClick={() => handleSelect(merchant)}
                >
                  {merchant.merchantSerialCode} ({merchant.id})
                </div>
              ))
            )}
          </div>

          <div className="pagination_S">
          

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              ◀ Prev
            </button>

            <span style={{ margin: '0 10px' }}>
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next ▶
            </button>

         
          </div>



          
        </div>
      )}
    </div>
  );
}
