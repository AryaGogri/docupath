import { useState } from 'react';

export default function UserInfoForm({ onChange, data }) {
  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div id="userInfoSection" style={{ marginTop: 24 }}>
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="userFullName">Your Full Name</label>
          <input
            id="userFullName"
            type="text"
            value={data.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g. Rahul Mehta"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userCurrentDate">Date of Today</label>
          <input
            id="userCurrentDate"
            type="date"
            value={data.date || ''}
            onChange={(e) => handleInputChange('date', e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="userShortAddress">Your Address (short)</label>
          <input
            id="userShortAddress"
            type="text"
            value={data.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="e.g. 12 MG Road, Pune"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="otherPartyName">Other Party Name</label>
          <input
            id="otherPartyName"
            type="text"
            value={data.other || ''}
            onChange={(e) => handleInputChange('other', e.target.value)}
            placeholder="e.g. Landlord / Authority"
            required
          />
        </div>
      </div>
    </div>
  );
}
