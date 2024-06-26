import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DepartmentSelection from './components/DepartmentSelection/DepartmentSelection';
import ArtworkDetails from './components/ArtworkDetails/ArtworkDetails';
import Favorites from './components/Favorites/Favorites';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Departments</Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">Favorites</Link>
            </li>
          </ul>

        </nav>

        <Routes>
          <Route path="/" element={<DepartmentSelection />} />
          {/* <Route path="/department/:departmentId/:departmentName" element={<DepartmentArtworks />} /> */}
          <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
