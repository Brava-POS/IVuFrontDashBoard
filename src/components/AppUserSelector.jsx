import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from './MainAppSpinner';
import logo from '../assets/images/brava.png';


export default function AppUserSelector({ onSelect }) {
  const { axiosInstance } = useAuth();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dropdownRef = useRef(null);
const params = new URLSearchParams();
  const fetcUsers= async () => {
    setLoading(true);
    try {
      
    
   params.append('page', page - 1);
    params.append('size', 10);
    params.append('deleted', 'false');
    params.append('active', 'true');
    params.append('blocked', 'false');
    params.append('accountExpired', 'false');
    params.append('credentialsExpired', 'false');
    params.append('accountLocked', 'false');

     if (search) {
      params.append('email', search);
    }










      const res = await axiosInstance.get(
        `http://localhost:9999/app-users/searchguests?${params.toString()}`
      );
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
    if (open) fetcUsers();
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
    setSelectedMerchant(merchant);
    setSearch('');
    onSelect && onSelect(merchant);
    setOpen(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setSelectedMerchant(null);
    setSearch('');
    onSelect && onSelect(null);
    setOpen(false);
  };

  return (





      <div className="merchantDropdownSelector-dropdown" ref={dropdownRef}>
      
          <div
            className="merchantDropdownSelector-trigger-2"
            onClick={() => setOpen(!open)}
          >
            {selectedMerchant ? (
              <>
               
                  <img
                    src={selectedMerchant.avatarUrl?selectedMerchant.avatarUrl:logo}
                    alt={selectedMerchant.username}
                    className="merchantDropdownSelector-avatar"
                  />
                
                    <span className="merchantDropdownSelector-name">
                      {selectedMerchant.username}
                    </span>
                    <span className="merchantDropdownSelector-code">
                      {selectedMerchant.merchantSerialCode}
                    </span>
                 
             


                <button
                  className="merchantDropdownSelector-resetBtn"
                  onClick={handleReset}
                  title="Reset to All Users"
                >
                  Reset
                </button>



              </>
            ) : (
              'Select a User'
            )}


       
        </div>

        

        {open && (
          <div className="merchantDropdownSelector-menu">
         <div className="merchantDropdownSelector-searchBox">
              <input
                type="text"
                placeholder="Search by Email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="merchantDropdownSelector-searchInput"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="merchantDropdownSelector-clearBtn"
                  title="Clear"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="merchantDropdownSelector-list">
              {loading ? (
                <MainAppSpinner />
              ) : merchants.length === 0 ? (
                <p>No Users found</p>
              ) : (
                merchants.map((merchant) => (
                  <div
                    key={merchant.id}
                    className="merchantDropdownSelector-item"
                    onClick={() => handleSelect(merchant)}
                  >
                    <div className="merchantDropdownSelector-itemLeft">
                      <img
                        src={merchant.avatarUrl}
                        alt={merchant.username}
                        className="merchantDropdownSelector-avatarLarge"
                      />
                      <span className="merchantDropdownSelector-name">
                        {merchant.username}
                      </span>
                    </div>
                    <span className="merchantDropdownSelector-code">
                      {merchant.merchantSerialCode}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="merchantDropdownSelector-pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                ◀ Prev
              </button>
              <span>
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



