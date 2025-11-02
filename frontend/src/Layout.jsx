import React from 'react';
import Header from './component/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './component/Footer';

export default function Layout() {
  const location = useLocation();

  const pathsWithLayout = ["/", "/list"];
  const showLayout = pathsWithLayout.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      {showLayout && <Header />}
      <Outlet />
      {showLayout && <Footer />}
    </div>
  );
}
