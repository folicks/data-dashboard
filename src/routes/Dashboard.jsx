import React from 'react';
import { useOutletContext } from 'react-router-dom';

import BreweryTable from '../components/BreweryTable';
import StatsDisplay from '../components/StatsDisplay';
import StateDistributionChart from '../components/StateDistributionChart';

const Dashboard = () => {
  const context = useOutletContext();
  
  if (!context) {
    return <div>Loading...</div>;
  }

  const { breweries, filtered, loading } = context;

  return (
    <div>
      <div className="charts-row">
        <div className="chart-container">
          <StatsDisplay breweries={breweries} filtered={filtered} />
        </div>
        <div className="chart-container">
          <StateDistributionChart breweries={breweries} />
        </div>
      </div>
      <div className="brewery-table-container">
        {loading ? <p style={{padding: '2rem', textAlign: 'center'}}>Loading...</p> : <BreweryTable breweries={filtered} />}
      </div>
    </div>
  );
};

export default Dashboard;
