
import { Outlet, useOutletContext } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';

function Layout() {
  // Get context from App (breweries, search, etc.)
  const context = useOutletContext();
  
  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <SearchBar search={context.search} setSearch={context.setSearch} />
        <TypeFilter breweries={context.breweries} type={context.type} setType={context.setType} />
      </div>
      <div className="main-content">
        <Outlet context={context} />
      </div>
    </div>
  );
}

export default Layout;
