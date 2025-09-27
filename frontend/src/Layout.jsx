import React from 'react';
import Header from './component/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './component/Footer';

export default function Layout() {
  const location = useLocation();

  // Define which paths should show header/footer
  const pathsWithLayout = ["/", "/list"];
  const showLayout = pathsWithLayout.includes(location.pathname);

  return (
    <div>
      {showLayout && <Header />}
      <Outlet />
      {showLayout && <Footer />}
    </div>
  );
}
