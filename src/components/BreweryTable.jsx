
import React from 'react';
import './BreweryTable.css';
import { Link } from 'react-router-dom';

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
            <td>
              <Link to={`/brewery/${b.id}`} style={{ color: '#646cff' }}>
                {b.name}
              </Link>
            </td>
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
