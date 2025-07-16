import React from 'react';
import './BreweryTable.css';

function BreweryTable({ breweries }) {
  return (
    <table className="brewery-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>City</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {breweries.map(b => (
          <tr key={b.id}>
            <td>{b.name}</td>
            <td>{b.brewery_type}</td>
            <td>{b.city}</td>
            <td>{b.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BreweryTable;
