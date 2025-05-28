import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MainAppSpinner from '../components/MainAppSpinner';
import TableComponent from '../components/TableComponent';

export default function MerchantListPageView({ onSelect }) {
  const { axiosInstance } = useAuth();
  const [search, setSearch] = useState('');
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      if (search) params.append('merchantSerialCode', search);

      const res = await axiosInstance.get(
        `http://localhost:9999/merchants/search?${params.toString()}`
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
    fetchMerchants();
  }, [search, page]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Merchants</h2>

      {/* Search Box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '6px 10px',
          marginBottom: '20px',
          backgroundColor: '#fff'
        }}
      >
        <input
          type="text"
          placeholder="Search by Merchant Serial Number"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px'
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              fontSize: '20px',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
            title="Clear"
          >
            &times;
          </button>
        )}
      </div>

      {/* Table View */}
      {loading ? (
        <MainAppSpinner />
      ) : (
        <TableComponent
          visibleColumns ={ [ "merchantSerialCode","avatarUrl", "id", ]} 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          data={merchants}
          columnOrder={['avatarUrl', 'merchantSerialCode', 'appUserId']}
          columnNameOverrides={{
            avatarUrl: 'Avatar',
            merchantSerialCode: 'Merchant Code',
            appUserId: 'User ID'
          }}
          viewRoute="/view-merchant"
          updateRoute="/update-merchant"
          handleDelete={(id) => console.log('Delete merchant', id)}
          createRoute="/create-merchant"

 customCellRenderers={{
    avatarUrl: (value) => (
      <img
        src={value}
        alt="avatar"
        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
      />
    )
  }}




        />
      )}
    </div>
  );
}
