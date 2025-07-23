import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function DetailView() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useOutletContext();

  useEffect(() => {
    async function fetchBrewery() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setBrewery(data);
      } catch (err) {
        setError("Brewery not found.");
      }
      setLoading(false);
    }
    fetchBrewery();
  }, [id]);

  if (loading) return <div style={{color:'white'}}>Loading...</div>;
  if (error) return <div style={{color:'white'}}>{error}</div>;
  if (!brewery) return null;

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h2>{brewery.name}</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', background: 'rgba(30,30,30,0.7)' }}>
        <tbody>
          {Object.entries(brewery).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 'bold', padding: '0.5rem 1rem', border: '1px solid #444', textTransform: 'capitalize', width: '200px' }}>{key.replace(/_/g, ' ')}</td>
              <td style={{ padding: '0.5rem 1rem', border: '1px solid #444' }}>
                {key === 'website_url' && value
                  ? <a href={value} target="_blank" rel="noopener noreferrer" style={{color:'#646cff'}}>{value}</a>
                  : value ? value.toString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetailView;
