import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      
      <Outlet />
    </>
  );
};

export default Header;