import React from 'react';

function TypeFilter({ breweries, type, setType }) {
  // Get unique types
  const types = Array.from(new Set(breweries.map(b => b.brewery_type))).filter(Boolean);
  return (
    <div className="type-filter">
      <label htmlFor="type">Filter by Type: </label>
      <select id="type" value={type} onChange={e => setType(e.target.value)}>
        <option value="">All</option>
        {types.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}

export default TypeFilter;
