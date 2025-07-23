import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBreweries() {
      setLoading(true);
      try {
        const res = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        const data = await res.json();
        setBreweries(data);
      } catch (err) {
        setBreweries([]);
      }
      setLoading(false);
    }
    fetchBreweries();
  }, []);

  // Filter breweries by search and type
  const filtered = breweries.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) &&
    (type ? b.brewery_type === type : true)
  );

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '1rem 0', background: '#f9f9f9', marginBottom: '2rem' }}>
        <h1>Brewery Dashboard</h1>
      </div>
      <Outlet context={{ breweries, filtered, search, setSearch, type, setType, loading }} />
    </div>
  );
}

export default App;
