import React from 'react';
import Header from './Header';
import Auth from './Auth';
import UniversityTable from './UniversityTable';

function App() {
  return (
    <div className="app">
      <Header />
      <Auth>
        <UniversityTable />
      </Auth>
    </div>
  );
}

export default App;
