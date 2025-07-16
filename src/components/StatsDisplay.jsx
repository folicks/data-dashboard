import React from 'react';

function StatsDisplay({ breweries, filtered }) {
  // Total breweries
  const total = breweries.length;
  // Most common type
  const typeCounts = breweries.reduce((acc, b) => {
    acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
    return acc;
  }, {});
  const mostCommonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  // Number of states
  const states = new Set(breweries.map(b => b.state));
  const numStates = states.size;

  return (
    <div className="stats-display">
      <h2>Summary Statistics</h2>
      <ul>
        <li>Total Breweries: {total}</li>
        <li>Most Common Type: {mostCommonType}</li>
        <li>States Represented: {numStates}</li>
        <li>Filtered Results: {filtered.length}</li>
      </ul>
    </div>
  );
}

export default StatsDisplay;
