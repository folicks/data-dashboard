import { useEffect, useState } from 'react';
import './App.css';
import StatsDisplay from './components/StatsDisplay.jsx';
import SearchBar from './components/SearchBar.jsx';
import TypeFilter from './components/TypeFilter.jsx';
import BreweryTable from './components/BreweryTable.jsx';

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
    <div className="App">
      <h1>Brewery Dashboard</h1>
      <StatsDisplay breweries={breweries} filtered={filtered} />
      <SearchBar search={search} setSearch={setSearch} />
      <TypeFilter breweries={breweries} type={type} setType={setType} />
      {loading ? <p>Loading...</p> : <BreweryTable breweries={filtered} />}
    </div>
  );
}

export default App;
