import React from 'react';
import { NavBar } from 'react-vant';
import UniversityTable from './UniversityTable';

export default function Home() {
  return (
    <div>
      <NavBar safeAreaInsetTop title="主页" leftArrow={false} />
      <UniversityTable />
    </div>
  );
}
